function generateMatrixOfWeight(numOfVertex) {
    let matrixDirect = [];
    let matrixUnd = [];
    let matrixB = [];
    let matrixC = [];
    let matrixD = [];
    let matrixH = [];
    let matrixTr = [];
    let matrixW = [];
    const variant = '3318';
    const n1 = Number(variant[0]);
    const n2 = Number(variant[1]);
    const n3 = Number(variant[2]);
    const n4 = Number(variant[3]);
    
    const kof = 1 - n3 * 0.02 - n4 * 0.005 - 0.25;
    
    
    
    function matrixGeneratorDirect() {
        for (let i = 0; i < numOfVertex; i++) {
            matrixDirect[i] = [];
            for (let j = 0; j < numOfVertex; j++) {
                let elem = Math.floor(Math.random() * 2 * kof);
                matrixDirect[i][j] = elem;
            }
        }
    }
    
    function matrixBGenerator() {
        for (let i = 0; i < numOfVertex; i++) {
            matrixB[i] = [];
            for (let j = 0; j < numOfVertex; j++) {
                let elem = Math.random() * 2.0;
                matrixB[i][j] = elem;
            }
        }
    }
    
    function matrixCGenerator() {
        for (let i = 0; i < numOfVertex; i++) {
            matrixC[i] = [];
            for (let j = 0; j < numOfVertex; j++) {
                let elem = Math.ceil(matrixB[i][j] * 100 * matrixDirect[i][j]);
                matrixC[i][j] = elem;
            }
        }
    }
    
    matrixGeneratorDirect();
    matrixBGenerator();
    matrixCGenerator();
    
    for (let i = 0; i < numOfVertex; i++) {
        matrixC[i][i] = 0;
    }

    for (let i = 0; i < numOfVertex; i++) {
        for(let j = 0; j < numOfVertex; j++){
            matrixC[i][j] = matrixC[j][i];
        }
    }

    return matrixC;
}

export default generateMatrixOfWeight;