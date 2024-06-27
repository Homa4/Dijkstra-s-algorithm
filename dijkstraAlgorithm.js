const createVertex = (numberOfVertex, radius, matrix) => {
    const canvas = document.querySelector("canvas#canvas-Dijkstra");
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 600;
    const width = canvas.width;
    const height = canvas.height;
    const arrOfVertex = [];
    const arrOfVertexDx2 = [];

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

    function generateMisRange(cord) {
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

    function checkingIfHasMis(cordX) {
        const arr = generateMisRange(cordX);
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
    drawGraph(numberOfVertex);
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

const dijkstra = (numberOfVertex, radiusValue, matrixOfWeight) => {
    console.log('all right');
}


export { createVertex, initializeDijkstra, iterateDijkstra };