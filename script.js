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

  insert(value, node = this.root) {
    console.log(node);
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

  // find(value, node = this.root) {
  //   if (node.value === value) {
  //     return node;
  //   }

  //   if (node.left === null && node.right === null) {
  //     return null;
  //   }

  //   if (node.value < value) {
  //     return this.find(value, node.right);
  //   }

  //   if (node.value > value) {
  //     return this.find(value, node.left);
  //   }
  // }

  //delete(4)
  delete(value, node = this.root) {
    if (node.value === value) {
      if (node.right === null) {
        node.value = node.left.value;
        node.left = null;
        return;
      }
      let next = node.right;
      let successor = next.left;
      if (successor === null) {
        node.value = next.value;
        node.right = null;
        return;
      }
      while (successor.left !== null) {
        next = successor;
        successor = successor.left;
      }
      node.value = successor.value;
      console.log(node.right.value);
      next.left = null;
      return;
    } else if (value !== node.value && node.value > value) {
      //if it's leaf
      if (
        node.left.value === value &&
        node.left.left === null &&
        node.left.right === null
      ) {
        let deleted = node.left;
        node.left = null;
        return deleted;
      }

      //if it has only 1 left child
      if (
        node.left.value === value &&
        node.left.left === null &&
        node.left.right !== null
      ) {
        let deleted = node.left;
        node.left = node.left.right;
        return deleted;
      }

      //if it has only 1 right child
      if (
        node.left.value === value &&
        node.left.left !== null &&
        node.left.right === null
      ) {
        let deleted = node.left;
        node.left = node.left.left;
        return deleted;
      }

      //if it has both right and left childs
      if (
        node.left.value === value &&
        node.left.left !== null &&
        node.left.right !== null
      ) {
        let next = node.left.right;
        let successor = next.left;
        if (successor === null) {
          node.left.value = next.value;
          node.left.right = null;
          return;
        }

        while (successor.left !== null) {
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
      if (
        node.right.value === value &&
        node.right.right === null &&
        node.right.left === null
      ) {
        let deleted = node.right;
        node.right = null;
        return deleted;
      }

      //if it has only 1 right child
      if (
        node.right.value === value &&
        node.right.right === null &&
        node.right.left !== null
      ) {
        let deleted = node.right;
        node.right = node.right.left;
        return deleted;
      }

      //if it has only 1 left child
      if (
        node.right.value === value &&
        node.right.right !== null &&
        node.right.left === null
      ) {
        let deleted = node.right;
        node.right = node.right.right;
        return deleted;
      }
      // if it has both children
      if (
        node.right.value === value &&
        node.right.left !== null &&
        node.right.right !== null
      ) {
        let next = node.right.right;
        let successor = next.left;
        if (successor === null) {
          node.right.value = next.value;
          node.right.right = null;
          return;
        }

        while (successor.left !== null) {
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
  1, 7, 4, 23, 8, 9, 4, 3, 20, 700, 200, 12, 5, 7, 9, 67, 6345, 324,
]);
prettyPrint(myTree.root);
myTree.delete(23);
prettyPrint(myTree.root);
myTree.delete(200);
prettyPrint(myTree.root);
