import generateMatrixOfWeight from './matrixGenerator.js';
import graphOfWeight from './GraphOfWeight.js';
import dijkstra from './dijkstraAlgorithm.js';

const radius = document.querySelector(".radius");
const numOfVertex = document.querySelector(".numberOfVertex");
const button = document.querySelector(".buttonDef");
const buttonDijkstra = document.querySelector(".buttonDijkstra");

const numberOfVertex = Number(numOfVertex.value);
const radiusValue = Number(radius.value);

button.addEventListener("click", () => {
    const matrixOfWeight = generateMatrixOfWeight(numberOfVertex);

    graphOfWeight(radiusValue, numberOfVertex, matrixOfWeight);
});

buttonDijkstra.addEventListener("click", () => {

    dijkstra(numOfVertex, radiusValue, matrixOfWeight);
})
