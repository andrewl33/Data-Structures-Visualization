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
  }
}

export class BinarySearchTree {
  public root: BSTNode;
  private BSTsize: number;

  constructor() {
    this.root = null;
    this.BSTsize = 0;
  }


  // TODO: SET WIDTH CORRECTLY
  private _setHeight(cur: BSTNode) {
    let height = 0;
    let leftWidth = 0;
    let rightWidth = 0;

    if (cur.left !== null) {
      height = cur.left.height + 1;
      leftWidth = cur.leftWidth + 1;
      rightWidth--;
    } 
    if (cur.right !== null) {
      height = cur.right.height >= height ? cur.right.height + 1 : height;
      rightWidth += cur.leftWidth + 1;
      leftWidth--;

    }

    cur.height = height;
    cur.leftWidth = cur.leftWidth > leftWidth ? cur.leftWidth : leftWidth;
    cur.rightWidth = cur.rightWidth > cur.rightWidth ? cur.rightWidth : rightWidth;
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
    this._setHeight(current);
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
  }

  private _removeBSTNode(current: BSTNode | null, val: number): BSTNode | null {
    if (current.data === val) {
      if (current.right === null)  {
        return current.left;
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
    this._setHeight(current);
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

  // private _h(n: BSTNode): number {
  //   let size = 0;
  //   let left = 0;
  //   let right = 0;

  //   if (n.left === null && n.right === null) {
  //     return size;
  //   }
  //   if (n.left) {
  //     left = this._h(n.left);
  //   }
  //   if (n.right) {
  //     right = this._h(n.right);
  //   }

  //   size = left > right ? left : right;

  //   return size+1;
  // }

  public height(): number {
    return this._h(this.root);
  }
}