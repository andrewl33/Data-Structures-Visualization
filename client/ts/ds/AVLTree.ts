export class AVLNode {
  public data: number;
  public height: number;
  public leftWidth: number;
  public rightWidth: number;
  public left: AVLNode;
  public right: AVLNode;

  constructor(data: number) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 0;
    this.leftWidth = 0;
    this.rightWidth = 0;
  }
}

/**
 * Got AVL methods:
 * https://www.geeksforgeeks.org/avl-tree-set-1-insertion/
 **/


export class AVLTree {
  public root: AVLNode;
  private count: number;
  
  constructor() {
    this.root = null;
    this.count = 0;
  }

  private _setHeight(cur: AVLNode) {
    let height = 0;

    if (cur.left) {
      height = cur.left.height + 1;
    } 
    if (cur.right) {
      height = cur.right.height >= height ? cur.right.height + 1 : height;
    }

    cur.height = height;
  }

  private _getMaxLeftWidth(cur: AVLNode): number {
    let left: number = 0;
    let right: number = 0;

    if (cur.left) {
      left+= this._getMaxLeftWidth(cur.left) + 1;
    }
    if (cur.right) {
      right+= this._getMaxLeftWidth(cur.right) - 1;
    }

    return left > right ? left : right;
  }

  private _getMaxRightWidth(cur: AVLNode): number {
    let left: number = 0;
    let right: number = 0;

    if (cur.left) {
      left+= this._getMaxRightWidth(cur.left) - 1;
    }
    if (cur.right) {
      right+= this._getMaxRightWidth(cur.right) + 1;
    }

    return left > right ? left : right;
  }

  private _addAVL(cur: AVLNode, val: number): AVLNode {
    if (cur === null) {
      return new AVLNode(val);
    }
    
    if (cur.data > val) {
      cur.left = this._addAVL(cur.left, val);
    } else if (cur.data < val) {
      cur.right = this._addAVL(cur.right, val);
    }
    
    // set height
    this._setHeight(cur);

    // rebalance the nodes if need be
    this._rebalance(cur, val);

    return cur;
  }

  private _leftmost(current: AVLNode): number {
    while (current.left !== null) {
      current = current.left;
    }

    return current.data;
  }

  private _removeLeftmost(current: AVLNode | null): AVLNode | null {
    if (current.left === null) {
      return current.right;
    } else {
      current.left = this._removeLeftmost(current.left);
    }

    return current;
  }

  private _removeAVLNode(current: AVLNode | null, val: number): AVLNode | null {
    if (current.data === val) {
      if (current.right === null)  {
        return current.left;
      } else {
        current.data = this._leftmost(current.right);
        current.right = this._removeLeftmost(current.right);
      } 
    } else {
      if (current.data > val) {
         current.left = this._removeAVLNode(current.left, val);
      } else {
        current.right = this._removeAVLNode(current.right, val);
      }
    }

    this._setHeight(current);
    this._rebalance(current);
    current.leftWidth = this._getMaxLeftWidth(current);
    current.rightWidth = this._getMaxRightWidth(current);

    return current;
  }

  private _rebalance(cur: AVLNode, val: number) {
    const bal: number = this._getBalance(cur);

    console.log("balance for " + cur.data + " " + bal);
    // left left
    if (bal > 1 && cur.left && val < cur.left.data) {
      return this.rightRotate(cur);
    }

    // right right
    if (bal < -1 && cur.right && val > cur.right.data) {
      console.log("called");
      return this.leftRotate(cur);
    }

    // left right
    if (bal > 1 && cur.left && val > cur.left.data) {
      cur.left = this.leftRotate(cur.right);
      return this.rightRotate(cur);
    }
    
    // right left
    if (bal < -1 && cur.right && val < cur.right.data) {
      cur.right = this.rightRotate(cur.right);
      return this.leftRotate(cur);
    }
  }

  private _getBalance(cur: AVLNode): number {
    if (cur === null) {
      return 0;
    }
    
    let rh = cur.right ? cur.right.height : 0;
    let lh = cur.left ? cur.left.height : 0;
    return lh - rh;
  }

  private rightRotate(cur: AVLNode): AVLNode {
    // assign new root
    console.log(cur);
    const newRoot = cur.left ? cur.left : null;
    console.log(newRoot);
    const newLeft = newRoot.right ? newRoot.right : null;



    // rotate, cur becone the new 
    newRoot.right = cur;
    cur.left = newLeft;

    // update heights
    this._setHeight(newRoot);
    this._setHeight(cur);

    return newRoot;
  }

  private leftRotate(cur: AVLNode): AVLNode {
    const newRoot = cur.right ? cur.right : null;
    const newRight = newRoot.left ? newRoot.left : null;

    // rotate, cur becomes new left
    newRoot.left = cur;
    cur.right = newRight;

    // update heights
    this._setHeight(newRoot);
    this._setHeight(cur);

    return newRoot;
  }

  public addAVL(val: number):void {
    this.root = this._addAVL(this.root, val);
    this.count++;
  }

  public removeAVL(val: number):void {
    if (this.contains(val)) {
      this.root = this._removeAVLNode(this.root, val);
      this.count--;
    }
  }

  public contains(data:number): boolean {
    let current: AVLNode = this.root;

    while(current !== null) {
      if (current.data === data) {
        return true;
      } else {
        if (current.data > data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
    }

   return false;
  }

  public isEmpty():boolean{
    return this.count === 0;
  }

  public size(): number{
    return this.count;
  }

  public clear(): void {
    this.count = 0;
    this.root = null;
  }
}