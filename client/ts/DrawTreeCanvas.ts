import { BSTNode } from './ds/BinarySearchTree';
import { AVLNode } from './ds/AVLTree';
import DrawCanvas from './DrawCanvas';
import { constants } from './constants';

export default abstract class DrawTreeCanvas extends DrawCanvas {

  public r: number = constants.radius;
  public topOffset: number = constants.topOffset;
  protected c: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  public heightSpread: number = constants.heightFactor;

  constructor() {
    super();

    this.c = <HTMLCanvasElement>document.getElementById('draw');
    this.ctx = this.c.getContext('2d');
  }

  protected drawNode(data: number, x: number, y: number): void {
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
  protected drawLine(x1: number, y1: number, x2: number, y2: number): void {
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
  
  protected _childCoord(x: number, y: number, isLeft: boolean, leftH: number, rightH: number): number[] {
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
  
  protected _widthOfInnerTree(cur: AVLNode | BSTNode, isLeft: boolean) {
    let childTreeInnerWidth = 1;
  
    if (isLeft) {
      if (cur.left.right) {
        childTreeInnerWidth = cur.left.right.rightWidth + cur.left.right.leftWidth + cur.left.right.height;
      }
      return (cur.left.rightWidth + 1) * 1.5 * this.heightSpread + childTreeInnerWidth * this.heightSpread * cur.height * .4;
    } else {
      if (cur.right.left) {
        childTreeInnerWidth = cur.right.left.leftWidth + cur.right.left.rightWidth + cur.right.left.height;
      }
      return (cur.right.leftWidth + 1) * 1.5 * this.heightSpread + childTreeInnerWidth * this.heightSpread * cur.height* .4;
    }
  
  }
  
  protected _drawChildNode(cur: AVLNode | BSTNode, curStartX: number, curStartY: number, isLeftSubTree: boolean) {
  
    this.drawNode(cur.data, curStartX, curStartY);
  
    if (cur.left) {
      let hLeft: number = this._widthOfInnerTree(cur, true);
      let hRight: number = 1;
  
      let pts: number[] = this._childCoord(curStartX, curStartY, true, hLeft, hRight);
  
      this.drawLine(pts[0], pts[1], pts[2], pts[3]);
      this._drawChildNode(cur.left, pts[4], pts[5], true);
    }
  
    if (cur.right) {
      let hLeft: number = 1;
      let hRight: number = this._widthOfInnerTree(cur, false);
  
      let pts: number[] = this._childCoord(curStartX, curStartY, false, hLeft, hRight);
  
      this.drawLine(pts[0], pts[1], pts[2], pts[3]);
      this._drawChildNode(cur.right, pts[4], pts[5], false);
    }
  }
}
