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

  delete(value, node = this.root) {
    
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

let myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(myTree);
myTree.insert(16);
myTree.insert(2)
console.log(myTree.root);
prettyPrint(myTree.root);
