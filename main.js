import generateMatrixOfWeight from './matrixGenerator.js';
import graphOfWeight from './GraphOfWeight.js';
import { createVertex, dijkstra } from './dijkstraAlgorithm.js';
import { radius, numOfVertex, button, buttonDijkstra } from './elementsFromHTML.js';

button.addEventListener("click", () => {
    const numberOfVertex = Number(numOfVertex.value);
    const radiusValue = Number(radius.value);
    const matrixOfWeight = generateMatrixOfWeight(numberOfVertex);
    graphOfWeight(radiusValue, numberOfVertex, matrixOfWeight);
    createVertex(numberOfVertex, radiusValue, matrixOfWeight);
    
    buttonDijkstra.addEventListener("click", () => {
        dijkstra(numberOfVertex, radiusValue, matrixOfWeight);
    });
});
