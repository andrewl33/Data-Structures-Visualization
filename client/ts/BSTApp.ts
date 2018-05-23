import  DrawCanvas  from './DrawCanvas';
import FormInput  from './FormInput';
import {BSTNode, BinarySearchTree} from './ds/BinarySearchTree';

class BSTDraw extends DrawCanvas {
  private bst: BinarySearchTree;
  private r: number = 20;
  private topOffset: number = 50;
  private c: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private heightSpread: number = 2;

  constructor() {
    super();

    this.c = <HTMLCanvasElement>document.getElementById('draw');
    this.ctx = this.c.getContext('2d');

    this.bst = new BinarySearchTree();
    this.bstAdd = this.bstAdd.bind(this);
    this.bstRemove = this.bstRemove.bind(this);
    this.bstContains = this.bstContains.bind(this);
    this.bstClear = this.bstClear.bind(this);
  }

  
  private drawNode(data: number, x: number, y: number): void {
    // draw circle
    const ctx: CanvasRenderingContext2D = this.ctx;

    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'white';
    ctx.arc(x, y, this.r, 0*Math.PI, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
    // draw text
    ctx.fillStyle = "white";
    ctx.font = 'bold 16px Arial';
    const width = ctx.measureText(data.toString()).width;
    const height = ctx.measureText("1").width;
    ctx.fillText(data.toString(), x - (width/2), y + (height/2));
    ctx.closePath();
  }

  // EVENTUALLY DRAW ARROW
  private drawLine(x1: number, y1: number, x2: number, y2: number): void {

    const ctx: CanvasRenderingContext2D = this.ctx;

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 10;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  private _drawEach(cur: BSTNode, curStartX: number, curStartY: number, h: number) {
    let curAttachPoint: number[] = [];
    let nextAttachPoint: number[] = [];
    let nextNodePoint: number[] = [];
    const heightOffset = h * this.heightSpread;

    // draw this root node
    this.drawNode(cur.data, curStartX, curStartY);

    if (cur.left) {
      // do math
      curAttachPoint[0] = curStartX - this.r * Math.sin(Math.PI / 4);
      curAttachPoint[1] = curStartY + (this.r - this.r * Math.cos(Math.PI / 4));
      nextAttachPoint[0] = nextNodePoint[0] =  curAttachPoint[0] - this.r * heightOffset * Math.sin(Math.PI / 4);
      nextAttachPoint[1] = curAttachPoint[1] + (4 * this.r * Math.cos(Math.PI / 4));
      // nextNodePoint[0] = nextAttachPoint[0] + this.r * Math.sin(Math.PI / 4);
      nextNodePoint[1] = nextAttachPoint[1] + (this.r * Math.cos(Math.PI / 4)) - this.r;


      // draw line
      this.drawLine(curAttachPoint[0], curAttachPoint[1], nextAttachPoint[0], nextAttachPoint[1]);
      
      // go down
      this._drawEach(cur.left, nextNodePoint[0], nextNodePoint[1], h - 1);
    }
    if (cur.right) {
      // do math
      curAttachPoint[0] = curStartX + this.r * Math.sin(Math.PI / 4);
      curAttachPoint[1] = curStartY + (this.r - this.r * Math.cos(Math.PI / 4));
      nextAttachPoint[0] = nextNodePoint[0] =  curAttachPoint[0] + this.r * heightOffset * Math.sin(Math.PI / 4);
      nextAttachPoint[1] = curAttachPoint[1] + (4 * this.r * Math.cos(Math.PI / 4));
      // nextNodePoint[0] = nextAttachPoint[0] + this.r * Math.sin(Math.PI / 4);
      nextNodePoint[1] = nextAttachPoint[1] + (this.r * Math.cos(Math.PI / 4)) - this.r;


      // draw line
      this.drawLine(curAttachPoint[0], curAttachPoint[1], nextAttachPoint[0], nextAttachPoint[1]);
      
      // go down
      this._drawEach(cur.right, nextNodePoint[0], nextNodePoint[1], h - 1);
    }
  }

  public draw(): void {
    // constant top

    let dimensions;     // resonsive width
    this.setContainerSize(this.c);
    dimensions = this.containerSize(this.c);  
  
    // draw canvas if there are nodes
    if (!this.bst.isEmpty()) {
      this._drawEach(this.bst.root, dimensions.x / 2, this.topOffset, this.bst.height());
    }
  }

  public bstAdd(data: number): void {
    if (this.bst.contains(data)) {
      this.appendPreviousOutputs('add failed, already contains value', data);
    } else {
      this.bst.add(data);
      this.appendPreviousOutputs('add', data);
      this.draw();
    }
  }

  public bstRemove(data: number): void {
    if (!this.bst.contains(data)) {
      this.appendPreviousOutputs('remove failed, does not contain value', data);
    } else {
      this.bst.remove(data);
      this.appendPreviousOutputs('remove', data);
      this.draw();
    }
  }

  public bstClear(): void {
    this.bst.clear();
    this.removeAllOutputs();
    this.draw();
  }

  public bstContains(data: number) {
    if (this.bst.contains(data)) {
      this.appendPreviousOutputs('contains', data);
    } else {
      this.appendPreviousOutputs('does not contain', data);
    }
  }
}


window.onload = () => {
  const bstDraw = new BSTDraw();
  const addInput = new FormInput('add', bstDraw.bstAdd, 'enter-form');
  const removeInput = new FormInput('remove', bstDraw.bstRemove, 'enter-form');
  const clearInput = new FormInput('clear', bstDraw.bstClear, 'enter-form');
  const containsInput  = new FormInput('contains', bstDraw.bstContains, 'enter-form');
  bstDraw.bindResizeListener();
  bstDraw.draw();
  addInput.renderNumIn();
  removeInput.renderNumIn();
  containsInput.renderNumIn();
  clearInput.renderBtn();
}