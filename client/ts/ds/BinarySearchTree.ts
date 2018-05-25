export class BSTNode {
  public data: number;
  public height: number;
  public leftWidth: number;
  public rightWidth: number;
  public left: BSTNode;
  public right: BSTNode;

  constructor(data: number) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 0;
    this.leftWidth = 0;
    this.rightWidth = 0;
  }
}

export class BinarySearchTree {
  public root: BSTNode;
  private BSTsize: number;

  constructor() {
    this.root = null;
    this.BSTsize = 0;
  }

  private _setHeight(cur: BSTNode): number {
    let lh = 0;
    let rh = 0;

    if (cur.left) {
      lh = this._setHeight(cur.left) + 1;
    } 
    if (cur.right) {
      rh = this._setHeight(cur.right) + 1;
    }

    return Math.max(lh, rh);
  }

  private _getMaxLeftWidth(cur: BSTNode): number {
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

  private _getMaxRightWidth(cur: BSTNode): number {
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

  private _add(current: BSTNode, val: number): BSTNode {
    if (current === null) {
      current = new BSTNode(val);
    } else {
      if (current.data > val) {
        current.left = this._add(current.left, val);
      } else {
        current.right = this._add(current.right, val);
      }
    }
    current.height = this._setHeight(current);
    current.leftWidth = this._getMaxLeftWidth(current);
    current.rightWidth = this._getMaxRightWidth(current);
    return current;
  }

  private _leftmost(current: BSTNode): number {
    while (current.left !== null) {
      current = current.left;
    }

    return current.data;
  }

  private _removeLeftmost(current: BSTNode | null): BSTNode | null {
    if (current.left === null) {
      return current.right;
    } else {
      current.left = this._removeLeftmost(current.left);
    }

    return current;
  }

  private _removeBSTNode(current: BSTNode | null, val: number): BSTNode | null {
    if (current.data === val) {
      if (current.right === null)  {
        current = current.left ? current.left : null;
      } else {
        current.data = this._leftmost(current.right);
        current.right = this._removeLeftmost(current.right);
      } 
    } else {
      if (current.data > val) {
         current.left = this._removeBSTNode(current.left, val);
      } else {
        current.right = this._removeBSTNode(current.right, val);
      }
    }
    if (current !== null) {
      current.height = this._setHeight(current);
      current.leftWidth = this._getMaxLeftWidth(current);
      current.rightWidth = this._getMaxRightWidth(current);
    }

    return current;
  }


  public add(data: number): void {
    if (!this.contains(data)) {
      this.root = this._add(this.root, data);
      this.BSTsize++;
    }
  }
  public remove(data:number): void {
    if (this.contains(data)) {
      this.root = this._removeBSTNode(this.root, data);
      this.BSTsize--;
    }
  }

  public contains(data:number): boolean {
    let current: BSTNode = this.root;

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
    return this.BSTsize === 0;
  }

  public size(): number{
    return this.BSTsize;
  }

  public clear(): void {
    this.BSTsize = 0;
    this.root = null;
  }

}