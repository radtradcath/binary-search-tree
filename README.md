# binary-search-tree

A project to pratice methods for Binary Search Tree, using linked lists.

```
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
```
