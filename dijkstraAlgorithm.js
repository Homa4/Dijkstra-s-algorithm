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

const dijkstra = (numberOfVertex, radiusValue, matrixOfWeight) => {
    console.log('all right');
}

export { createVertex, dijkstra };
