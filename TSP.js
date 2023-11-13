const fs = require('fs');
const prompt = require('prompt-sync')();

const runDijkstra = (start, end, map) => {
    
}

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
console.log(map);

const start = prompt('Start?');
const end = prompt('End?');

