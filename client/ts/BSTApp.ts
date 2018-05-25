/**
 *\ BSTree app
 * 
 * Uses draw() that draws the tree to canvas
 * Entry point for binary-tree.html
 */

import DrawTreeCanvas from './DrawTreeCanvas';
import FormInput  from './FormInput';
import {BSTNode, BinarySearchTree} from './ds/BinarySearchTree';

class BSTDraw extends DrawTreeCanvas {
  private bst: BinarySearchTree;

  constructor() {
    super();

    this.bst = new BinarySearchTree();
    this.bstAdd = this.bstAdd.bind(this);
    this.bstRemove = this.bstRemove.bind(this);
    this.bstContains = this.bstContains.bind(this);
    this.bstClear = this.bstClear.bind(this);
  }

  public draw(): void {
    // resonsive width
    let dimensions;     
    this.setContainerSize(this.c);
    dimensions = this.containerSize(this.c);  
  
    // draw canvas if there are nodes
    if (!this.bst.isEmpty()) {
      // draw the node
      this.drawNode(this.bst.root.data, dimensions.x / 2, this.topOffset);

      // handle both subtrees
      if (this.bst.root.left) {
        // draw line
        let height = this._widthOfInnerTree(this.bst.root, true);
        let pts = this._childCoord(dimensions.x / 2, this.topOffset, true, height, 1);
        this.drawLine(pts[0], pts[1], pts[2], pts[3]);

        // draw rest
        this._drawChildNode(this.bst.root.left, pts[4], pts[5], true);
      }
      if (this.bst.root.right) {
        // draw line
        let height = this._widthOfInnerTree(this.bst.root, false);
        let pts = this._childCoord(dimensions.x / 2, this.topOffset, false, 1, height);
        this.drawLine(pts[0], pts[1], pts[2], pts[3]);

        // draw rest
        this._drawChildNode(this.bst.root.right, pts[4], pts[5], false);
      }
    }
  }

  // button handlers
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
  // loads content in
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


  // default fill
  const list: number[] = [50,25,61,78,84,56,22,55,66,20,40,81,31,68,87,19,85,76,60,2,45,57,23];

  list.forEach((item) => {
    bstDraw.bstAdd(item);
  });
}