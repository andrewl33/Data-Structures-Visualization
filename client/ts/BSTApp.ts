import  DrawCanvas  from './DrawCanvas';
import FormInput  from './FormInput';
import BinarySearchTree from './ds/BinarySearchTree';

class BSTDraw extends DrawCanvas {
  private bst: BinarySearchTree;

  constructor() {
    super();
    this.bst = new BinarySearchTree();
    this.bstAdd = this.bstAdd.bind(this);
    this.bstRemove = this.bstRemove.bind(this);
    this.bstContains = this.bstContains.bind(this);
    this.bstClear = this.bstClear.bind(this);
  }

  
  private drawNode(ctx: CanvasRenderingContext2D, data: number, x: number, y: number, r: number): void {
    // draw circle
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'white';
    ctx.arc(x, y, r, 0*Math.PI, 2*Math.PI);
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
  private drawLine(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, isRight: boolean): void {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 10;
    ctx.moveTo(x, y+r);

    if (isRight) {
      ctx.lineTo(x, y+r*3);
    } else {
      ctx.lineTo(x, y+r*3);
    }

    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  public draw(): void {
    // constant top
    const topOffset = 50;
    const radius = 20;
    const c = <HTMLCanvasElement>document.getElementById('draw');
    const ctx = c.getContext('2d');
    let dimensions;     // resonsive width

    this.setContainerSize(c);
    dimensions = this.containerSize(c);  

    // draw canvas if there are nodes
    if (!this.bst.isEmpty()) {

      
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
      this.draw;
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