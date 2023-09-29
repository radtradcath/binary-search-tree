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

let myTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
console.log(myTree)
prettyPrint(myTree.root);

