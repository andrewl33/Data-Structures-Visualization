/**
 * Stack
 * Stack implementation using a singly-linked list
 */
class SNode {
  public data: number;
  public next: SNode; 

  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export default class Stack {
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

  public clear(): void {
    while (!this.isEmpty()) {
      this.pop();
    }
  }
}