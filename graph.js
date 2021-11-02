// find path in an undirected graph
const undirectedPath = (edges, start, end) => {
  if (start === end) {
    return true;
  }
  // convert list of edges into an adjacency list
  const adjacencyList = {};

  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];

    if (!(a in adjacencyList)) adjacencyList[a] = [];
    if (!(b in adjacencyList)) adjacencyList[b] = [];

    adjacencyList[a].push(b);
    adjacencyList[b].push(a);
  }

  // use either BFS or DFS to find a path
  const visitedVertices = new Set();
  const stack = [start];

  while (stack.length) {
    const vertex = stack.pop();

    if (vertex === end) {
      return true;
    }

    if (visitedVertices.has(vertex)) {
      continue;
    }

    visitedVertices.add(vertex);
    for (let el of adjacencyList[vertex]) {
      stack.push(el);
    }
  }

  return false;
};

// TODO
// find and count connected components in a graph
const connectedComponentsCount = () => {};

//Write a function, largestComponent, that takes in the adjacency list of an undirected graph. The function should return the size of the largest connected component in the graph.
const largestComponent = (graph) => {
  const visitedVertices = {};
  let maxSize = 0;

  const exploreSize = (vertex, graph, visitedVertices) => {
    if (visitedVertices[vertex]) {
      return 0;
    }

    visitedVertices[vertex] = true;

    let size = 1;

    for (let neighbor of graph[vertex]) {
      size += exploreSize(neighbor, graph, visitedVertices);
    }

    return size;
  };

  for (let vertex in graph) {
    const componentSize = exploreSize(vertex, graph, visitedVertices);

    maxSize = Math.max(componentSize, maxSize);
  }

  return maxSize;
};

//takes in an array of edges for an undirected graph and two nodes (nodeA, nodeB). The function should return the length of the shortest path between A and B. Consider the length as the number of edges in the path, not the number of nodes. If there is no path between A and B, then return -1.
const shortestPath = (edges, nodeA, nodeB) => {};

const minimumIsland = (grid) => {
  const visited = new Set();
  let smallestIsland = Infinity;

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      const island = exploreIsland(grid, row, column, visited);

      if (isIsland.isIsland) {
        smallestIsland = Math.min(smallestIsland, island.count);
      }
    }
  }

  return smallestIsland;
};

const exploreIsland = (grid, row, column, visited) => {
  if (!grid[row] || !grid[row][column]) {
    return { isIsland: false, count: 0 };
  }

  const key = `${row},${column}`;

  if (visited.has(key)) {
    return { isIsland: false, count: 0 };
  }

  if (grid[row][column] === "W") {
    return { isIsland: false, count: 0 };
  }

  visited.add(key);

  return {
    isIsland: true,
    count:
      1 +
      exploreIsland(grid, row - 1, column, visited).count +
      exploreIsland(grid, row + 1, column, visited).count +
      exploreIsland(grid, row, column - 1, visited).count +
      exploreIsland(grid, row, column + 1, visited).count,
  };
};
