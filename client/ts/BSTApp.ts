import  DrawCanvas  from './DrawCanvas';
import FormInput  from './FormInput';
import {BSTNode, BinarySearchTree} from './ds/BinarySearchTree';

class BSTDraw extends DrawCanvas {
  private bst: BinarySearchTree;
  private r: number = 15;
  private topOffset: number = 50;
  private c: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private heightSpread: number = 4;

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
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'white';
    ctx.arc(x, y, this.r, 0*Math.PI, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
    // draw text
    ctx.fillStyle = "white";
    ctx.font = '14px Arial';
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
    ctx.lineWidth = 7;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  private _childCoord(x: number, y: number, isLeft: boolean, leftH: number, rightH: number): number[] {
    let xLineStart;
    let xLineEnd;
    let yLineStart: number = y + (this.r - this.r * Math.cos(Math.PI / 4));
    let yLineEnd: number = yLineStart + 5 * this.r * Math.cos(Math.PI / 4);
    let xNodePt: number;
    let yNodePt: number = yLineEnd + (this.r * Math.cos(Math.PI / 4)) - this.r;
    if (isLeft) {
      xLineStart = x - this.r * Math.sin(Math.PI / 4);
      xLineEnd = xNodePt = xLineStart - this.r * leftH * Math.sin(Math.PI / 4);
    } else {
      xLineStart = x + this.r * Math.sin(Math.PI / 4);
      xLineEnd = xNodePt = xLineStart + this.r * rightH *  Math.sin(Math.PI / 4);
    }

    return [xLineStart, yLineStart, xLineEnd, yLineEnd, xNodePt, yNodePt];
  }

  private _heightOfInnerTree(cur: BSTNode, isLeft: boolean) {
    // if (isLeft && cur.left !== null && cur.left.right !== null) {
    //   return (cur.left.right.height + 1) * this.heightSpread;
    // } else if (cur.right !== null && cur.right.left !== null) {
    //   return (cur.right.left.height + 1) * this.heightSpread;
    // }

    // return 1;

    if (isLeft) {
      if (cur.rightWidth > 0) {
        return cur.rightWidth * this.heightSpread;
      }
    } else {
      if (cur.leftWidth > 0) {
        return cur.leftWidth * this.heightSpread;
      }
    }

    return 1;
  }

  private _drawChildNode(cur: BSTNode, curStartX: number, curStartY: number, isLeftSubTree: boolean) {
    // handle height
    let hLeft: number =  this._heightOfInnerTree(cur, isLeftSubTree);
    let hRight: number =  this._heightOfInnerTree(cur, isLeftSubTree);

    this.drawNode(cur.data, curStartX, curStartY);

    if (cur.left) {
      // do math
      let pts: number[] = this._childCoord(curStartX, curStartY, true, hLeft, hRight);

      this.drawLine(pts[0], pts[1], pts[2], pts[3]);
      this._drawChildNode(cur.left, pts[4], pts[5], isLeftSubTree);
    }

    if (cur.right) {
      // do math
      let pts: number[] = this._childCoord(curStartX, curStartY, false, hLeft, hRight);

      this.drawLine(pts[0], pts[1], pts[2], pts[3]);
      this._drawChildNode(cur.right, pts[4], pts[5], isLeftSubTree);
    }
  }

  public draw(): void {
    // constant top
    let dimensions;     // resonsive width
    this.setContainerSize(this.c);
    dimensions = this.containerSize(this.c);  
  
    // draw canvas if there are nodes
    if (!this.bst.isEmpty()) {
      // draw the node
      this.drawNode(this.bst.root.data, dimensions.x / 2, this.topOffset);

      // handle both subtrees
      if (this.bst.root.left) {
        // draw line
        let height = this._heightOfInnerTree(this.bst.root, true);
        let pts = this._childCoord(dimensions.x / 2, this.topOffset, true, height, 1);
        this.drawLine(pts[0], pts[1], pts[2], pts[3]);

        // draw rest
        this._drawChildNode(this.bst.root.left, pts[4], pts[5], true);
      }
      if (this.bst.root.right) {
        // draw line
        let height = this._heightOfInnerTree(this.bst.root, false);
        let pts = this._childCoord(dimensions.x / 2, this.topOffset, false, 1, height);
        this.drawLine(pts[0], pts[1], pts[2], pts[3]);

        // draw rest
        this._drawChildNode(this.bst.root.right, pts[4], pts[5], false);
      }
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


  const list: number[] = [50, 17,76,9,23,54,12,19,72,12,67];

  list.forEach((item) => {
    bstDraw.bstAdd(item);
  });
    

}