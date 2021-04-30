function TreeNode(data) {
  this.data = data;
  this.left = null;
  this.right = null;
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    this.insertNode(this.root, new TreeNode(data));
  }

  insertNode(curr, node) {
    if (this.root === null) {
      this.root = node;
    } else if (curr === null) {
      curr = node;
    } else if (node.data > curr.data) {
      if (curr.right) {
        this.insertNode(curr.right, node);
      } else {
        curr.right = node;
      }
    } else {
      if (curr.left) {
        this.insertNode(curr.left, node);
      } else {
        curr.left = node;
      }
    }
  }

  preorder(fn, curr = this.root) {
    if (curr === null) return;
    fn(curr.data);
    this.preorder(fn, curr.left);
    this.preorder(fn, curr.right);
  }

  depthFirst(fn) {
    const queue = [];
    if (this.root) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      const curr = queue.shift();
      fn(curr);

      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }

  toArray() {
    const structure = [];
    this.depthFirst((node) => {
      structure.push({
        data: node.data,
        children: [].concat(
          node.left ? node.left.data : [],
          node.right ? node.right.data : []
        ),
      });
    });
    return structure;
  }
}

export default BinarySearchTree;
