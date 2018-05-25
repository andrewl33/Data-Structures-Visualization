import DrawTreeCanvas from './DrawTreeCanvas';
import FormInput  from './FormInput';
import { AVLNode, AVLTree } from './ds/AVLTree';
import { constants }  from './constants';

class AVLDraw extends DrawTreeCanvas {
  private avl: AVLTree;

  constructor() {
    super();

    this.avl = new AVLTree();
    this.avlAdd = this.avlAdd.bind(this);
    this.avlRemove = this.avlRemove.bind(this);
    this.avlContains = this.avlContains.bind(this);
    this.avlClear = this.avlClear.bind(this);
  }

  public draw(): void {
    // constant top
    let dimensions;     // resonsive width
    this.setContainerSize(this.c);
    dimensions = this.containerSize(this.c);  
  
    // draw canvas if there are nodes
    if (!this.avl.isEmpty()) {
      // draw the node
      this.drawNode(this.avl.root.data, dimensions.x / 2, this.topOffset);

      // handle both subtrees
      if (this.avl.root.left) {
        // draw line
        let height = this._widthOfInnerTree(this.avl.root, true);
        let pts = this._childCoord(dimensions.x / 2, this.topOffset, true, height, 1);
        this.drawLine(pts[0], pts[1], pts[2], pts[3]);

        // draw rest
        this._drawChildNode(this.avl.root.left, pts[4], pts[5], true);
      }
      if (this.avl.root.right) {
        // draw line
        let height = this._widthOfInnerTree(this.avl.root, false);
        let pts = this._childCoord(dimensions.x / 2, this.topOffset, false, 1, height);
        this.drawLine(pts[0], pts[1], pts[2], pts[3]);
   
        // draw rest
        this._drawChildNode(this.avl.root.right, pts[4], pts[5], false);
      }
    }
  }

  public avlAdd(data: number): void {
    if (this.avl.contains(data)) {
      this.appendPreviousOutputs('add failed, already contains value', data);
    } else {
      this.avl.addAVL(data);
      this.appendPreviousOutputs('add', data);
      this.draw();
    }
  }

  public avlRemove(data: number): void {
    if (!this.avl.contains(data)) {
      this.appendPreviousOutputs('remove failed, does not contain value', data);
    } else {
      this.avl.removeAVL(data);
      this.appendPreviousOutputs('remove', data);
      this.draw();
    }
  }

  public avlClear(): void {
    this.avl.clear();
    this.removeAllOutputs();
    this.draw();
  }

  public avlContains(data: number) {
    if (this.avl.contains(data)) {
      this.appendPreviousOutputs('contains', data);
    } else {
      this.appendPreviousOutputs('does not contain', data);
    }
  }
}


window.onload = () => {
  const avlDraw = new AVLDraw();
  const addInput = new FormInput('add', avlDraw.avlAdd, 'enter-form');
  const removeInput = new FormInput('remove', avlDraw.avlRemove, 'enter-form');
  const clearInput = new FormInput('clear', avlDraw.avlClear, 'enter-form');
  const containsInput  = new FormInput('contains', avlDraw.avlContains, 'enter-form');
  avlDraw.bindResizeListener();
  avlDraw.draw();
  addInput.renderNumIn();
  removeInput.renderNumIn();
  containsInput.renderNumIn();
  clearInput.renderBtn();

  const list: number[] = [52,87,55,46,31,91,2,10,34,1,15,45,30,90,9,48,36,32,14,43,28,79,22,74];
  list.forEach((item) => {
    avlDraw.avlAdd(item);
  });
    

}