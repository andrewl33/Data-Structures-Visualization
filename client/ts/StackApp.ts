/**
 * Stack App
 * 
 * Extends Draw canvas to draw a stack to screen
 */

import  DrawCanvas  from './DrawCanvas';
import FormInput  from './FormInput';
import Stack from './ds/Stack';
import { constants } from './constants';

class StackDraw extends DrawCanvas {
  private stack: Stack;
  private stackList: number[] = [];

  constructor() {
    super();
    this.stack = new Stack();
    this.stackPush = this.stackPush.bind(this);
    this.stackPop = this.stackPop.bind(this);
    this.stackClear = this.stackClear.bind(this);
  }

  
  private drawNode(ctx: CanvasRenderingContext2D, data: number, x: number, y: number, r: number): void {
    // draw circle
    ctx.beginPath();
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'white';
    ctx.arc(x, y, r, 0*Math.PI, 2*Math.PI);
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
  private drawLine(ctx: CanvasRenderingContext2D, x: number, y: number, r: number): void {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 7;
    ctx.moveTo(x, y+r);
    ctx.lineTo(x, y+r*3);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  public draw(): void {
    // constant top
    const topOffset = constants.topOffset;
    const radius = constants.radius;
    const c = <HTMLCanvasElement>document.getElementById('draw');
    const ctx = c.getContext('2d');
    let dimensions;     // resonsive width

    this.setContainerSize(c);
    dimensions = this.containerSize(c);  

    // draw canvas if there are nodes
    if (this.stackList.length !== 0) {

      // draw all circles
      if (this.stackList.length === 1) {
        this.drawNode(ctx, this.stackList[0], dimensions.x / 2, topOffset + radius, radius);
      } else {
        // there are more than 1
        for (let i = 0; i < this.stackList.length - 1; i++) {
          this.drawNode(ctx, this.stackList[i], dimensions.x / 2, topOffset + radius + radius * 4 * i, radius);
          this.drawLine(ctx, dimensions.x / 2, topOffset + radius + radius * 4 * i, radius);
        }
        
        // finish it off
        this.drawNode(ctx, this.stackList[this.stackList.length-1], dimensions.x / 2, radius * 4 * this.stackList.length - radius, radius)
      }
    }
  }

  // creates a list to print
  private constructStackList(): void {

    // clear list
    this.stackList.length = 0;

    while (!this.stack.isEmpty()) {
      this.stackList.push(this.stack.top());
      this.stack.pop();
    }
    
    // add back to stack
    for (let i = this.stackList.length - 1; i > -1; i--) {
      this.stack.push(this.stackList[i]);
    }
  }

  // bind methods
  public stackPush(data: number): void {
    this.stack.push(data);
    this.constructStackList();
    this.appendPreviousOutputs('push', data);
    this.draw();
  }

  public stackPop(): void {
    if (!this.stack.isEmpty()) {
      this.appendPreviousOutputs('pop', this.stack.top());
    } else {
      this.appendPreviousOutputs('pop: failed. nothing in stack', -1);
    }
    
    this.stack.pop();
    this.constructStackList();
    this.draw();
  }
  public stackClear(): void {
    this.stack.clear();
    this.removeAllOutputs();
    this.constructStackList();
    this.draw();

  }
}


window.onload = () => {
  // bind dom objects
  const stackDraw = new StackDraw();
  const pushInput = new FormInput('push', stackDraw.stackPush, 'enter-form');
  const popInput = new FormInput('pop', stackDraw.stackPop, 'enter-form');
  const clearInput  = new FormInput('clear', stackDraw.stackClear, 'enter-form');
  stackDraw.bindResizeListener();
  stackDraw.draw();
  pushInput.renderNumIn();
  popInput.renderBtn();
  clearInput.renderBtn();


  // fill initially
  for (let i = 0; i < 21; i++) {
    stackDraw.stackPush(i);
  }
  
}