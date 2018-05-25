import { constants } from "./constants";

export default abstract class DrawCanvas {
  private prevOpDOM: HTMLElement;

  constructor() {
    this.updateOnResize = this.updateOnResize.bind(this);
    this.prevOpDOM = document.getElementById('output-list');
  }
  public bindResizeListener(): void {
    window.addEventListener('resize', this.updateOnResize);
  }

  public updateOnResize(): void {
    this.draw();
  }

  public appendPreviousOutputs(name: string, value: number): void {
    const newli = document.createElement('li');
    const newTextNode = document.createTextNode(name + ": " + value);
    newli.appendChild(newTextNode);

    this.prevOpDOM.appendChild(newli);
  }

  public removeAllOutputs(): void {
    while(this.prevOpDOM.firstChild) {
      this.prevOpDOM.removeChild(this.prevOpDOM.firstChild);
    }
  }

  public setContainerSize(canvasElem: HTMLCanvasElement): void {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // has to mirrior scss grid
    (<HTMLElement>canvasElem.parentNode).style.width = (w - (w * constants.leftSidebarWidth)).toString();
    (<HTMLElement>canvasElem.parentNode).style.height = (h - 60).toString();

    canvasElem.width = w - (w * constants.leftSidebarWidth);
    canvasElem.height = h - 60 - ((h-60)*.05); // LOL
  }

  public containerSize(canvasElem: HTMLCanvasElement): {x: number; y: number;} {
    return {
      x: (<HTMLElement>canvasElem.parentNode).offsetWidth,
      y: (<HTMLElement>canvasElem.parentNode).offsetHeight
    };
  }

  abstract draw(): void;
}