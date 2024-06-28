const arrOfVertex = [];
const arrOfVertexDx2 = [];

const createVertex = (numberOfVertex, radius) => {
    const canvas = document.querySelector("canvas#canvas-Dijkstra");
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 600;
    const width = canvas.width;
    const height = canvas.height;

    function fillLinesWithVertex(firstLineCount, thirdLineCount) {
        const secondLineCount = 3;
        const dx1 = Math.floor(width / firstLineCount) - radius;
        const dx2 = Math.floor(width / secondLineCount);
        const dx3 = Math.floor(width / thirdLineCount) - radius;
        const dy = Math.floor(width / (2 * firstLineCount)) + 100;
        let x = dx1;
        let y = 50;
        let circleNumber = 1;

        for (let line = 0; line < 3; line++) {
            let currentLineCount = line === 0 ? firstLineCount : (line === 1 ? secondLineCount : thirdLineCount);

            for (let i = 0; i < currentLineCount; i++) {
                arrOfVertex.push({ x, y });
                drawCircle(x, y, circleNumber++, radius);
                if (line === 0) {
                    x += dx1;
                } else if (line === 1) {
                    x += dx2;
                    arrOfVertexDx2.push({ x, y });
                } else {
                    x += dx3;
                }
            }

            y += dy;
            x = dx1;
        }
    }

    function generateMisRange(cord, radius) {
        const resArr = [];
        let temp = cord;
        for (let i = 0; i < radius; i++) {
            temp--;
            resArr.push(temp);
        }

        resArr.reverse();
        resArr.push(cord);
        temp = cord;

        for (let i = 0; i < radius; i++) {
            temp++;
            resArr.push(temp);
        }
        return resArr;
    }

    function checkingIfHasMis(cordX, radius) {
        const arr = generateMisRange(cordX, radius);
        return arrOfVertexDx2.some(elem => arr.includes(elem.x));
    }

    function drawCircle(x, y, num, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#EE7674';
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(num, x, y);
    }

    function drawGraph(numberOfVertex) {
        let remainingVertices = numberOfVertex - 3;
        if (remainingVertices % 2 === 0) {
            let half = remainingVertices / 2;
            fillLinesWithVertex(half, half);
        } else {
            let second = Math.floor(remainingVertices / 2);
            let first = remainingVertices - second;
            fillLinesWithVertex(first, second);
        }
    }

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    drawGraph(numberOfVertex);

    return { arrOfVertex, drawLine };
}

class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }

    toString() {
        return `${this.value}`;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value) {
        const newNode = new LinkedListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }

        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    find(value) {
        if (!this.head) return null;

        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    delete(value) {
        if (!this.head) return null;

        let deletedNode = null;
        while (this.head && this.head.value === value) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            while (currentNode.next) {
                if (currentNode.next.value === value) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        if (this.tail?.value === value) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    toArray() {
        const nodes = [];
        let currentNode = this.head;

        while (currentNode) {
            nodes.push(currentNode.value);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    sort() {
        if (!this.head || !this.head.next) return this;

        const mergeSort = (head) => {
            if (!head || !head.next) return head;

            const getMiddle = (head) => {
                if (!head) return head;
                let slow = head, fast = head;
                while (fast.next && fast.next.next) {
                    slow = slow.next;
                    fast = fast.next.next;
                }
                return slow;
            };

            const sortedMerge = (a, b) => {
                let result = null;
                if (!a) return b;
                if (!b) return a;

                if (a.value.weight <= b.value.weight) {
                    result = a;
                    result.next = sortedMerge(a.next, b);
                } else {
                    result = b;
                    result.next = sortedMerge(a, b.next);
                }

                return result;
            };

            let middle = getMiddle(head);
            let nextToMiddle = middle.next;

            middle.next = null;

            let left = mergeSort(head);
            let right = mergeSort(nextToMiddle);

            let sortedList = sortedMerge(left, right);
            return sortedList;
        };

        this.head = mergeSort(this.head);
        let currentNode = this.head;
        while (currentNode.next) {
            currentNode = currentNode.next;
        }
        this.tail = currentNode;
        return this;
    }
}

function neighborsDetector(matrix, numberOfVertex) {
    const neighborsHip = new Set();
    for (let i = 0; i < numberOfVertex; i++) {
        const temp = [];
        for (let j = 0; j < numberOfVertex; j++) {
            if (matrix[i][j] > 0) {
                temp.push(j);
            }
        }
        neighborsHip.add(temp);
    }

    return neighborsHip;
}

function generateMisRange(cord, radius) {
    const resArr = [];
    let temp = cord;
    for (let i = 0; i < radius; i++) {
        temp--;
        resArr.push(temp);
    }

    resArr.reverse();
    resArr.push(cord);
    temp = cord;

    for (let i = 0; i < radius; i++) {
        temp++;
        resArr.push(temp);
    }
    return resArr;
}

function checkingIfHasMis(cordX, radius) {
    const arr = generateMisRange(cordX, radius);
    return arrOfVertexDx2.some(elem => arr.includes(elem.x));
}

function drawWeight(cords, weight, angle, radius) {
    const ctx = document.querySelector("canvas#canvas-Dijkstra").getContext('2d');
    ctx.save();
    ctx.translate(cords.x, cords.y);

    ctx.beginPath();
    ctx.ellipse(0, 0, radius - 10, (radius - 10) / 2, angle, 0, Math.PI * 2);
    ctx.fillStyle = '#9DBF9E';
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = 'black';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(weight, 0, 0);

    ctx.restore();
}

function calculatingMidOfArc(start, middle, end) {
    const arcTopMidX = (start.x / 4) + (middle.x / 2) + (end.x / 4);
    const arcTopMidY = (start.y / 4) + (middle.y / 2) + (end.y / 4);

    return { x: arcTopMidX, y: arcTopMidY };
}

function drawArc(start, end, bendAngle = Math.PI / 8, weight, radius) {
    const ctx = document.querySelector("canvas#canvas-Dijkstra").getContext('2d');
    let midX = (start.x + end.x) / 2;
    let midY = (start.y + end.y) / 2;

    let distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

    let newEndX = end.x - (end.x - start.x) / distance;
    let newEndY = end.y - (end.y - start.y) / distance;

    let controlX;
    let controlY;
    if (start.x !== end.x && start.y !== end.y) {
        controlX = midX + Math.cos(bendAngle) * (midY - start.y);
        controlY = midY + Math.sin(bendAngle) * (midX - start.x);
    } else if (start.x === end.x) {
        controlX = midX + 100;
        controlY = midY;
    } else {
        controlX = midX;
        controlY = midY + 100;
    }

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.quadraticCurveTo(controlX, controlY, newEndX, newEndY);
    ctx.stroke();

    const objWithCordsForWeight = calculatingMidOfArc(start, { x: controlX, y: controlY }, end);
    drawWeight(objWithCordsForWeight, weight, bendAngle, radius);

    return { newEndX, newEndY, controlX, controlY };
}

function drawArcArrow(start, end, bendAngle = Math.PI / 1, weight, radius) {
    drawArc(start, end, bendAngle, weight, radius);
}

function drawStraitLine(start, end, angle, weight, radius) {
    const ctx = document.querySelector("canvas#canvas-Dijkstra").getContext('2d');
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();

    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    drawWeight({ x: midX, y: midY }, weight, angle, radius);
}

function drawEdgeLine(start, end, angle, weight, radius) {
    const { x: x1, y: y1 } = start;
    const { x: x2, y: y2 } = end;

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    const hasMis = checkingIfHasMis(midX, radius);

    let drawArc = false;

    arrOfVertex.forEach((elem) => {
        if (elem.x === midX && elem.y === midY) {
            drawArc = true;
        } else if (hasMis && elem.y === midY) {
            drawArc = true;
        }
    });

    if (drawArc) {
        drawArcArrow({ x: x1, y: y1 }, { x: x2, y: y2 }, angle, weight, radius);
    } else {
        drawStraitLine({ x: x1, y: y1 }, { x: x2, y: y2 }, angle, weight, radius);
    }
}


const dijkstra = (numberOfVertex, radiusValue, matrixOfWeight) => {
    const distances = new Array(numberOfVertex).fill(Infinity);
    const visited = new Array(numberOfVertex).fill(false);
    const previous = new Array(numberOfVertex).fill(null);
    distances[0] = 0;

    const neighbors = [...neighborsDetector(matrixOfWeight, numberOfVertex)];
    const edges = new LinkedList();

    for (let i = 0; i < numberOfVertex; i++) {
        for (let j = 0; j < numberOfVertex; j++) {
            if (matrixOfWeight[i][j] > 0) {
                edges.append({ start: i, end: j, weight: matrixOfWeight[i][j] });
            }
        }
    }

    while (true) {
        let shortestDistance = Infinity;
        let shortestIndex = -1;

        for (let i = 0; i < distances.length; i++) {
            if (!visited[i] && distances[i] < shortestDistance) {
                shortestDistance = distances[i];
                shortestIndex = i;
            }
        }

        if (shortestIndex === -1) {
            break;
        }

        visited[shortestIndex] = true;
        const currentNeighbors = neighbors[shortestIndex];

        for (const neighbor of currentNeighbors) {
            const newDist = distances[shortestIndex] + matrixOfWeight[shortestIndex][neighbor];
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                previous[neighbor] = shortestIndex;
            }
        }
    }

    // Reconstruct the shortest path from the first vertex to the last vertex
    const shortestPath = [];
    let path = [];
    for (let at = numberOfVertex - 1; at != null; at = previous[at]) {
        path.push(at);
    }
    path.reverse();

    for (let j = 0; j < path.length - 1; j++) {
        shortestPath.push({
            start: path[j],
            end: path[j + 1],
            weight: matrixOfWeight[path[j]][path[j + 1]]
        });
    }

    console.log('Shortest Path:', shortestPath);
    drawShortestPathOnCanvas(shortestPath, arrOfVertex, radiusValue);
}


function drawShortestPathOnCanvas(shortestPath, vertexPositions, radius) {
    shortestPath.forEach(edge => {
        const { start, end, weight } = edge;
        const startPos = vertexPositions[start];
        const endPos = vertexPositions[end];
        const angle = Math.atan2(endPos.y - startPos.y, endPos.x - startPos.x);
        drawEdgeLine(startPos, endPos, angle, weight, radius);
    });

    console.log(vertexPositions);
}


export { createVertex, dijkstra };
