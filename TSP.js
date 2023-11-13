const fs = require('fs');
const prompt = require('prompt-sync')();
const PriorityQueue = require('js-priority-queue'); 

const fileContents = fs.readFileSync('input.txt', 'utf8');

const fileLines = fileContents.split('\n');

const nodeCount = parseInt(fileLines[0]);

// Initialize empty map 
var map = Array.from({ length: nodeCount }, () => Array(nodeCount).fill(0));

// Construct map
for (var l = 1; l < fileLines.length; l++) {
    const line = fileLines[l].split(' ')
    const from = parseInt(line[0]);
    const to = parseInt(line[1]);
    const weight = parseInt(line[2]);

    map[from][to] = weight;
    map[to][from] = weight;
}

const start = prompt('Start: ');
const end = prompt('End: ');
const nodeDistances = new Array(nodeCount).fill({from: Infinity, weight: Infinity});
const visited = new Array(nodeCount).fill(false);

const runDijkstra = (startNode) => {
    nodeDistances[startNode] = { from: null, weight: 0 };

    var queue = new PriorityQueue({ comparator: (a, b) => a.weight - b.weight });
    queue.queue({ nodeNum: startNode, weight: 0 });

    while (queue.length > 0) {
        var currentNode = queue.dequeue().nodeNum;

        if (visited[currentNode]) {
            continue;
        }

        visited[currentNode] = true;

        map[currentNode].forEach((weight, neighbor) => {
            if (weight !== 0 && (!nodeDistances[neighbor] || nodeDistances[neighbor].weight > nodeDistances[currentNode].weight + weight)) {
                nodeDistances[neighbor] = { from: currentNode, weight: nodeDistances[currentNode].weight + weight };
                queue.queue({ nodeNum: neighbor, weight: nodeDistances[neighbor].weight });
            }
        });
    }
}

runDijkstra(start);

console.log("The shortest path from " + start + " to " + end + " is the following:");

var from = end;
var path = [];
while (from !== null){
    path.push(from);
    from = nodeDistances[from].from;
}

for(var i = path.length - 1; i >= 0; i--){
    process.stdout.write(`${path[i]}`);
    if(i !== 0)
        process.stdout.write(' --> ');
}

console.log(" with a weight of " + nodeDistances[end].weight);
