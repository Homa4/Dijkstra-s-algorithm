import generateMatrixOfWeight from './matrixGenerator.js';
import graphOfWeight from './GraphOfWeight.js';

const radius = document.querySelector(".radius");
const numOfVertex = document.querySelector(".numberOfVertex");
const button = document.querySelector(".buttonUndef");

button.addEventListener("click", () => {
    const numberOfVertex = Number(numOfVertex.value);
    const radiusValue = Number(radius.value);
    const matrixOfWeight = generateMatrixOfWeight(numberOfVertex);

    graphOfWeight(radiusValue, numberOfVertex, matrixOfWeight);
});
