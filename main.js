import generateMatrixOfWeight from './matrixGenerator.js';
import graphOfWeight from './GraphOfWeight.js';
import { createVertex, initializeDijkstra, iterateDijkstra } from './dijkstraAlgorithm.js';
import { radius, numOfVertex, button, buttonDijkstra } from './elementsFromHTML.js';

button.addEventListener("click", () => {
    const numberOfVertex = Number(numOfVertex.value);
    const radiusValue = Number(radius.value);
    const matrixOfWeight = generateMatrixOfWeight(numberOfVertex);
    graphOfWeight(radiusValue, numberOfVertex, matrixOfWeight);
    createVertex(numberOfVertex, radiusValue, matrixOfWeight);

    const startVertex = 0; // Задайте стартову вершину
    const endVertex = numberOfVertex - 1; // Задайте кінцеву вершину

    initializeDijkstra(numberOfVertex, radiusValue, matrixOfWeight, startVertex);

    buttonDijkstra.addEventListener("click", () => {
        const result = iterateDijkstra(startVertex, endVertex);
        if (result) {
            console.log("Shortest Path: ", result);
        } else {
            console.log("Iterating...");
        }
    });
});
