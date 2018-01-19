// https://msdn.microsoft.com/en-us/library/aa289150(v=vs.71).aspx
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
const Queue = require('./queue-helper');

class BinarySearchTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // Wraps the input value in a new BinarySearchTree and
  // assigns it to either the left or right subtree,
  // depending on its value
  insert(value) {
    if (value <= this.value) {
      if (!this.left) this.left = new BinarySearchTree(value);
      else this.left.insert(value);
    }
    if (value > this.value) {
      if (!this.right) this.right = new BinarySearchTree(value);
      else this.right.insert(value);
    }
  }

  // Checks the binary search tree for the input target
  // Can be written recursively or iteratively
  contains(target) {
    if (this.value === target) return true;
    if (target < this.value) {
      if (!this.left) return false;
      return this.left.contains(target);
    }
    if (target > this.value) {
      if (!this.right) return false;
      return this.right.contains(target);
    }
  }

  // Traverses the tree in a depth-first manner, i.e. from top to bottom
  // Applies the given callback to each tree node in the process
  depthFirstForEach(cb) {
    // depth first is a stack
    // const stack = [this];
    // let tree;

    // while (stack.length) {
    //   tree = stack.pop();
    //   cb(tree.value);
    //   if (tree.right) { stack.push(tree.right); }
    //   if (tree.left) { stack.push(tree.left); }
    cb(this.value);
    if (this.left) {
      this.left.depthFirstForEach(cb);
    }
    if (this.right) {
      this.right.depthFirstForEach(cb);
    }
  }

  // Traverses the tree in a breadth-first manner, i.e. in layers, starting 
  // at the root node, going down to the root node's children, and iterating
  // through all those nodes first before moving on to the next layer of nodes
  // Applies the given callback to each tree node in the process
  // You'll need the queue-helper file for this. Or could you roll your own queue
  // again. Whatever floats your boat.

  breadthFirstForEach(cb) {
    // breadth first is a queue
    // const queue = [this];
    // let tree;

    // while (queue.length) {
    //   tree = queue.shift();
    //   cb(tree.value);
    //   if (tree.left) { queue.push(tree.left); }
    //   if (tree.right) { queue.push(tree.right); }
    // }
    const q = new Queue();
    q.enqueue(this);
    while (!q.isEmpty()) {
      const node = q.dequeue();
      if (node.left) {
        q.enqueue(node.left);
      }
      if (node.right) {
        q.enqueue(node.right);
      }
      cb(node.value);
    }
  }
}

module.exports = BinarySearchTree;
