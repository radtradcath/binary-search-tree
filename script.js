class aNode {
  constructor() {
    this.right = null;
    this.value = null;
    this.left = null;
  }
}

class Tree {
  constructor(array) {
    this.array = sort(array);
    this.root = Tree.buildTree(this.array);
  }

  static buildTree(arr) {
    if (arr.length === 0) {
      return null;
    }
    let node = new aNode();
    node.value = arr[Math.ceil((arr.length - 1) / 2)];
    node.left = Tree.buildTree(arr.slice(0, arr.indexOf(node.value)));
    node.right = Tree.buildTree(arr.slice(arr.indexOf(node.value) + 1));

    return node;
  }

  rebalance(tree) {
    let traversedTree = this.inorder();
    this.root = Tree.buildTree(traversedTree);
    return this.root;
  }

  insert(value, node = this.root) {
    if (value > node.value) {
      if (node.right === null) {
        let nodeInsert = new aNode();
        nodeInsert.value = value;
        node.right = nodeInsert;
        return;
      }

      this.insert(value, node.right);
    }

    if (value < node.value) {
      if (node.left === null) {
        let nodeInsert = new aNode();
        nodeInsert.value = value;
        node.left = nodeInsert;
        return;
      }

      this.insert(value, node.left);
    }
  }

  find(value, node = this.root) {
    if (node.value === value) {
      return node;
    }

    if (node.left === null && node.right === null) {
      return null;
    }

    if (node.value < value) {
      return this.find(value, node.right);
    }

    if (node.value > value) {
      return this.find(value, node.left);
    }
  }

  height(node) {
    if (node === null) {
      return 0;
    }

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }

  depth(node, root = this.root) {
    if (node === this.root) {
      return 1;
    }
    let nodeHeight = this.height(node);
    let treeHeight = this.height(root);
    console.log(nodeHeight);
    console.log(treeHeight);

    let nodeDepth = treeHeight - nodeHeight;
    return nodeDepth;
  }

  isBalanced(tree = this.root) {
    if (tree === null) {
      return true;
    }

    let leftHeight = this.height(tree.left);
    let rightHeight = this.height(tree.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(tree.left) &&
      this.isBalanced(tree.right)
    ) {
      return true;
    }

    return false;
  }

  delete(value, node = this.root) {
    if (node.value === value) {
      if (!node.right) {
        node.value = node.left.value;
        node.left = null;
        return;
      }
      let next = node.right;
      let successor = next.left;
      if (!successor) {
        node.value = next.value;
        node.right = node.right.right;
        return;
      }
      while (!!successor.left) {
        next = successor;
        successor = successor.left;
      }
      node.value = successor.value;

      next.left = null;
      return;
    } else if (value !== node.value && node.value > value) {
      //if it's leaf
      if (node.left.value === value && !!node.left.left && !node.left.right) {
        let deleted = node.left;
        node.left = null;
        return deleted;
      }

      //if it has only 1 left child
      if (node.left.value === value && !node.left.left && !!node.left.right) {
        let deleted = node.left;
        node.left = node.left.right;
        return deleted;
      }

      //if it has only 1 right child
      if (node.left.value === value && !!node.left.left && !node.left.right) {
        let deleted = node.left;
        node.left = node.left.left;
        return deleted;
      }

      //if it has both right and left childs
      if (node.left.value === value && !!node.left.left && !!node.left.right) {
        let next = node.left.right;
        let successor = next.left;
        if (!successor) {
          node.left.value = next.value;
          node.left.right = null;
          return;
        }

        while (!!successor.left) {
          next = successor;
          successor = successor.left;
        }
        node.left.value = successor.value;
        next.left = null;
        return;
      }
      return this.delete(value, node.left);
    } else if (value !== node.value && node.value < value) {
      //if it has not child
      if (node.right.value === value && !node.right.right && !node.right.left) {
        let deleted = node.right;
        node.right = null;
        return deleted;
      }

      //if it has only 1 right child
      if (
        node.right.value === value &&
        !node.right.right &&
        !!node.right.left
      ) {
        let deleted = node.right;
        node.right = node.right.left;
        return deleted;
      }

      //if it has only 1 left child
      if (
        node.right.value === value &&
        !!node.right.right &&
        !node.right.left
      ) {
        let deleted = node.right;
        node.right = node.right.right;
        return deleted;
      }
      // if it has both children
      if (
        node.right.value === value &&
        !!node.right.left &&
        !!node.right.right
      ) {
        let next = node.right.right;
        let successor = next.left;
        if (!successor) {
          node.right.value = next.value;
          node.right.right = null;
          return;
        }

        while (!!successor.left) {
          next = successor;
          successor = successor.left;
        }
        node.right.value = successor.value;
        console.log(node.right.value);
        next.left = null;
        return;
      }

      return this.delete(value, node.right);
    }
  }

  levelOrder(callback = null, node = this.root) {
    if (!!callback) {
      let queue = [node];
      while (queue.length > 0) {
        callback(queue[0]);
        if (queue[0].left) queue.push(queue[0].left);
        if (queue[0].right) queue.push(queue[0].right);
        queue.shift();
      }
    } else {
      let queue = [node];
      let result = [];
      while (queue.length > 0) {
        if (queue[0].left) queue.push(queue[0].left);
        if (queue[0].right) queue.push(queue[0].right);
        result.push(queue[0].value);
        queue.shift();
      }
      return result;
    }
  }

  inorder(callback = null, node = this.root, arr = []) {
    if (!!callback) {
      if (!node) {
        return;
      }
      this.inorder(callback, node.left);
      callback(node);
      this.inorder(callback, node.right);
    } else {
      if (!node) {
        return;
      }
      let array = arr;
      this.inorder(null, node.left, array);
      array.push(node.value);
      this.inorder(null, node.right, array);
      return array;
    }
  }

  preorder(callback = null, node = this.root, arr = []) {
    if (!!callback) {
      if (!node) {
        return;
      }
      callback(node);
      this.preorder(callback, node.left);
      this.preorder(callback, node.right);
    } else {
      if (!node) {
        return;
      }
      let array = arr;
      array.push(node.value);
      this.preorder(null, node.left, array);
      this.preorder(null, node.right, array);
      return array;
    }
  }

  postorder(callback = null, node = this.root, arr = []) {
    if (!!callback) {
      if (!node) {
        return;
      }
      this.postorder(callback, node.left);
      this.postorder(callback, node.right);
      callback(node);
    } else {
      if (!node) {
        return;
      }
      let array = arr;
      this.postorder(null, node.left, array);
      this.postorder(null, node.right, array);
      array.push(node.value);

      return array;
    }
  }
}

const sort = (arr) => {
  arr.sort((a, b) => (a < b ? -1 : 1));
  arr.map((element) => {
    if (
      arr[arr.indexOf(element)] === arr[arr.indexOf(element) - 1] ||
      arr[arr.indexOf(element)] === arr[arr.indexOf(element) + 1]
    ) {
      arr.splice(arr.indexOf(element), 1);
    }
  });
  return arr;
};

function logNode(item) {
  console.log(item);
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let myTree = new Tree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 15, 21, 33, 55, 69, 88,
]);
prettyPrint(myTree.root); // Print Balanced Tree

console.log(`Is Tree balanced: ${myTree.isBalanced(myTree.root)}`); // Is Tree balanced: true
console.log(`Level Order: ${myTree.levelOrder()}`); // Level Order: 15,5,55,3,8,23,69,1,4,7,9,21,33,67,88
console.log(`Preorder: ${myTree.preorder()}`); // Preorder: 15,5,3,1,4,8,7,9,55,23,21,33,69,67,88
console.log(`Inorder: ${myTree.inorder()}`); // Inorder: 1,3,4,5,7,8,9,15,21,23,33,55,67,69,88
console.log(`Postorder: ${myTree.postorder()}`); // Postorder: 1,4,3,7,9,8,5,21,33,23,67,88,69,55,15
myTree.insert(100);
myTree.insert(110);
myTree.insert(105);
myTree.insert(135);
myTree.insert(121);
myTree.insert(123);
myTree.insert(130);
prettyPrint(myTree.root); // Print unbalanced tree
console.log(`Is Tree balanced: ${myTree.isBalanced(myTree.root)}`); // Is Tree balanced: false
myTree.rebalance(myTree.root);
prettyPrint(myTree.root); // Print rebalanced tree
console.log(`Is Tree balanced: ${myTree.isBalanced(myTree.root)}`); // Is Tree balanced: true
console.log(`Level Order: ${myTree.levelOrder()}`); // Level Order: 55,8,110,4,21,88,130,3,7,15,33,69,105,123,135,1,5,9,23,67,100,121
console.log(`Preorder: ${myTree.preorder()}`); // Preorder: 55,8,4,3,1,7,5,21,15,9,33,23,110,88,69,67,105,100,130,123,121,135
console.log(`Inorder: ${myTree.inorder()}`); // Inorder: 1,3,4,5,7,8,9,15,21,23,33,55,67,69,88,100,105,110,121,123,130,135
console.log(`Postorder: ${myTree.postorder()}`); // Postorder: 1,3,5,7,4,9,15,23,33,21,8,67,69,100,105,88,121,123,135,130,110,55
