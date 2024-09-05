class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    let newNode = new Node(val);
    if (this.root === null) {
        this.root = newNode;
        return this;
    }

    let current = this.root;
    while (true) {
        if (val < current.val) {
            if (current.left === null) {
                current.left = newNode;
                return this;
            } else {
                current = current.left;
            }
        } else if (val > current.val) {
            if (current.right === null) {
                current.right = newNode;
                return this;
            } else {
                current = current.right;
            }
        }
    }
  }


  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
  insertRecursively(val, current = this.root) {
    if (this.root === null) {
        this.root = new Node(val);
        return this;
    }

    if (val < current.val) {
        if (current.left === null) {
            current.left = new Node(val);
            return this;
        } else {
            return this.insertRecursively(val, current.left);
        }
    } else if (val > current.val) {
        if (current.right === null) {
            current.right = new Node(val);
            return this;
        } else {
            return this.insertRecursively(val, current.right);
        }
    }
}


  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    let current = this.root;
    while (current) {
        if (val === current.val) {
            return current;
        } else if (val < current.val) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    return undefined;
}


  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val, current = this.root) {
    if (!current) return undefined;
    if (val === current.val) return current;
    if (val < current.val) return this.findRecursively(val, current.left);
    if (val > current.val) return this.findRecursively(val, current.right);
}


  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder() {
    let result = [];

    function traverse(node) {
        result.push(node.val);
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
    }

    traverse(this.root);
    return result;
}


  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    let result = [];

    function traverse(node) {
        if (node.left) traverse(node.left);
        result.push(node.val);
        if (node.right) traverse(node.right);
    }

    traverse(this.root);
    return result;
}


  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder() {
    let result = [];

    function traverse(node) {
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
        result.push(node.val);
    }

    traverse(this.root);
    return result;
}


  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
  bfs() {
    let result = [];
    let queue = [];
    if (this.root) queue.push(this.root);

    while (queue.length) {
        let current = queue.shift();
        result.push(current.val);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
    }

    return result;
}


  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */
  remove(val, node = this.root, parent = null) {
    if (!node) return undefined;

    if (val < node.val) {
        return this.remove(val, node.left, node);
    } else if (val > node.val) {
        return this.remove(val, node.right, node);
    } else {
        if (!node.left && !node.right) {
            if (parent.left === node) parent.left = null;
            else parent.right = null;
        } else if (!node.left) {
            if (parent.left === node) parent.left = node.right;
            else parent.right = node.right;
        } else if (!node.right) {
            if (parent.left === node) parent.left = node.left;
            else parent.right = node.left;
        } else {
            let minNode = this.findMin(node.right);
            node.val = minNode.val;
            this.remove(minNode.val, node.right, node);
        }
        return node;
    }
  }

  findMin(node) {
    let current = node;
    while (current.left !== null) {
        current = current.left;
    }
    return current;
  }



  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced() {
    function getHeight(node) {
        if (!node) return -1;
        let leftHeight = getHeight(node.left);
        let rightHeight = getHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    function checkBalanced(node) {
        if (!node) return true;
        let leftHeight = getHeight(node.left);
        let rightHeight = getHeight(node.right);
        return Math.abs(leftHeight - rightHeight) <= 1 &&
               checkBalanced(node.left) &&
               checkBalanced(node.right);
    }

    return checkBalanced(this.root);
}

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    let current = this.root;
    while (current.right && current.right.right) {
        current = current.right;
    }

    if (!current.right.left && current.right) return current.val;

    current = current.right.left;
    while (current.right) {
        current = current.right;
    }

    return current.val;
}

}

module.exports = BinarySearchTree;
