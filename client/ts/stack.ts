// using numbers only to keep it simple
class SNode {
  public data: number;
  public next: Node; 

  constructor(data) {
    this.data = data;
    this.next = null;
  }
}


class Stack {
  private head: SNode;
  private length: number;
  
  constructor() {
    this.head = null;
    this.length = 0;
  }


  public top(): number {
    return this.head.data;
  }

  public push(data: number): void {
    const temp: SNode = this.head;
    this.head = new SNode(data);
    this.head.next = temp;
    this.length++;
  }

  public pop(): void {
    if (this.isEmpty()) {
      return;
    } 
    this.head = this.head.next;
    this.length--;
  }

  public isEmpty(): boolean {
    return this.length === 0;
  }

  public size(): number {
    return this.length;
  }
}

class FormInput {
  private name: string;
  private method: Function;
  private id: string;
  private textInput: string;

  constructor(name: string, method: Function, id: string) {
    this.name = name;
    this.method = method;
    this.id = id;
    this.textInput = null;
  }

  public methodWrapper(e: Event): void {
    e.preventDefault();
    // handle text value
    const inputLocation: HTMLElement = document.getElementById('form-' + this.name));
    if (inputLocation != null) {
      const value: string = (<HTMLInputElement>inputLocation).value;
      // check if number 
      if (isNaN(<any>value) || value === null || value === '') {
        (<HTMLInputElement>inputLocation).value = 'Enter a number';
      } else {
        const validValue: number = parseInt(value); 
        (<HTMLInputElement>inputLocation).value = '';
        this.method(validValue);
      }
    } else {
      // handle button only
      this.method();
    }

  }
  public renderBtn(): void {
    // get dom
    const form = document.getElementById('enter-form');

    // create html elements
    const button = document.createElement('button');
    const text = document.createTextNode(this.name);

    // add button values
    button.classList.add('form-button');
    button.value = this.name;
    button.addEventListener('click', (e)=>this.methodWrapper(e));
    button.appendChild(text);

    // bind to dom
    form.appendChild(button);
  }
  public renderNumIn(): void {
    // get dom
    const form = document.getElementById('enter-form');

    // create html elements
    const input = document.createElement('input');
    const button = document.createElement('button');
    const text = document.createTextNode(this.name);

    // add input values
    input.classList.add('form-input');
    input.type = 'text';
    input.name = this.name;
    input.id =  'form-' + this.name;

    // add button values
    button.classList.add('form-button');
    button.value = this.name;
    button.addEventListener('click', (e)=>this.methodWrapper(e));
    button.appendChild(text);

    // bind to dom
    form.appendChild(input);
    form.appendChild(button);
  }
}

abstract class DrawCanvas {

  constructor() {
    this.updateOnResize = this.updateOnResize.bind(this);
  }
  public bindResizeListener(): void {
    window.addEventListener('resize', this.updateOnResize);
  }

  public updateOnResize(): void {
    this.draw();
  }

  public containerSize(canvasElem: HTMLCanvasElement): {x: number; y: number;} {
    return {
      x: (<HTMLElement>canvasElem.parentNode).offsetWidth,
      y: (<HTMLElement>canvasElem.parentNode).offsetHeight
    };
  }

  abstract draw(): void;
}

class StackDraw extends DrawCanvas {
  private stack;

  constructor() {
    super();
    this.stack = new Stack();
    this.stackPush = this.stackPush.bind(this);
    this.stackPop = this.stackPop.bind(this);
  }

  private stackChangeListener():void {
    this.draw();
  }
  
  private drawNode(ctx: CanvasRenderingContext2D, data: number, x: number, y: number, r: number): void {
    // draw circle
    ctx.beginPath();
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
  private drawLine(ctx: CanvasRenderingContext2D, x: number, y: number, r: number): void {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(x, y+r);
    ctx.lineTo(x, y+r*3);
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
    let list = [];
    let dimensions = this.containerSize(c);       // resonsive width

    // set container size
    c.width = dimensions.x;
    c.height = dimensions.y;

    while (!this.stack.isEmpty()) {
      list.push(this.stack.top());
      this.stack.pop();
    }
    
    // add back to stack
    for (let i = list.length - 1; i > -1; i--) {
      this.stack.push(list[i]);
    }

    // draw canvas if there are nodes
    if (list.length !== 0) {
  
      // draw all circles
      if (list.length === 1) {
        this.drawNode(ctx, list[0], dimensions.x / 2, topOffset + radius, radius);
      } else {
        // there are more than 1
        for (let i = 0; i < list.length - 1; i++) {
          this.drawNode(ctx, list[i], dimensions.x / 2, topOffset + radius + radius * 4 * i, radius);
          this.drawLine(ctx, dimensions.x / 2, topOffset + radius + radius * 4 * i, radius);
        }
        
        // finish it off
        this.drawNode(ctx, list[list.length-1], dimensions.x / 2, radius * 4 * list.length - radius, radius)
      }
    }
 
  }

  public stackPush(data: number) {
    this.stack.push(data);
    this.stackChangeListener();
  }

  public stackPop() {
    this.stack.pop();
    this.stackChangeListener();
  }

}

window.onload = () => {
  const stackDraw = new StackDraw();
  stackDraw.bindResizeListener();
  stackDraw.draw();
  const pushInput = new FormInput('push', stackDraw.stackPush, 'enter-form');
  const popInput = new FormInput('pop', stackDraw.stackPop, 'enter-form');
  pushInput.renderNumIn();
  popInput.renderBtn();
}