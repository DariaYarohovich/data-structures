function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// Approaches to traverse a tree: top-down and bottom-up

// Preorder traversal (root => left => right)

// Inorder traversal (left => root => right)

// Postorder traversal (left => right => root)
function postorderTraversal1(root) {
  if (!root) {
    return [];
  }

  return [
    ...postorderTraversal1(root.left),
    ...postorderTraversal1(root.right),
    root.val,
  ];
}

function postorderTraversal2(root) {
  const stack = [];
  const result = [];
  let current = root;

  while (true) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else if (stack.length) {
      const node = stack.pop();

      if (node.right) {
        stack.push(node.val);
        current = node.right;
      } else {
        result.push(node.val || node);
      }
    } else {
      break;
    }
  }

  return result;
}

// Breadth-first search (level by level)
function levelOrder(root) {
  const res = [];

  levelOrderTraversal(root, res, 0);

  return res;
}

function levelOrderTraversal(root, res, level) {
  if (!root) {
    return;
  }

  if (!res[level]) {
    res[level] = [];
  }

  res[level].push(root.val);

  levelOrderTraversal(root.left, res, level + 1);
  levelOrderTraversal(root.right, res, level + 1);
}

// max BST depth
function maxDepth(root) {
  if (!root) {
    return 0;
  }

  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// check is binary tree is symmetric
function isSymmetric(root) {
  return isMirror(root, root);
}

function isMirror(node1, node2) {
  if (node1 === null && node2 === null) {
    return true;
  }

  if (node1 !== null && node2 !== null && node1.val === node2.val) {
    return (
      isMirror(node1.left, node2.right) && isMirror(node1.right, node2.left)
    );
  }

  return false;
}

// construct binary tree given inorder and postorder traversals results
function buildTree(inorder, postorder) {
  const hash = {};

  for (let i = 0; i < inorder.length; i++) {
    hash[inorder[i]] = i;
  }

  function construct(start, end) {
    if (start > end) {
      return null;
    }

    const rootVal = postorder.pop();

    const root = new TreeNode(rootVal);
    root.right = construct(hash[rootVal] + 1, end);
    root.left = construct(start, hash[rootVal] - 1);

    return root;
  }

  return construct(0, inorder.length - 1);
}

// find lowest common ancestor
function findLCA(root, p, q) {
  if (!root) {
    return null;
  }

  if (root.val == p || root.val == q) {
    return root;
  }

  let leftLCA = findLCA(root.left, p, q);
  let rightLCA = findLCA(root.right, p, q);

  if (leftLCA && rightLCA) {
    return root;
  }

  return leftLCA || rightLCA;
}
