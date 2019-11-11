


const letras = {
    A: [126,9,9,126],
    B: [127,73,73,54],
    C: [62,65,65,65],
    D: [127,65,65,62],
    E:[127,73,73,73],
    F:[127,9,9,9],
    G: [127,73,73,121],
    H: [127,8,8,127],
    I:[65,127,65],
    J:[64,65,127,1],
    K: [127,4,10,113],
    L:[127,64,64,64],
    M:[127,1,6,6,1,127],
    N: [127,4,8,16,127], 
    Ñ: [125,9,17,33,125],
    O: [127,65,65,65,127],
    P: [127,9,9,15],
    Q: [127,17,25,45],
    R: [127,5,13,54],
    S: [39,37,37,61],
    T: [1,1,127,1,1],
    U: [127,32,32,127],
    V: [31,32,32],
    W: [31,32,24,32,31],
    X:[51,12,51],
    Y: [7,56,7],
    Z: [49,41,45,35],


};


var cadenaImprimir = [];
var cadenaLoop = [];

module.exports.getLetra = (letra) => {
    return letras[letra];
   
}


module.exports.getCadenaImprimir = (cadena) =>{
    var linea = "";
    cadenaImprimir=[];
    for (const letra in cadena) {
        if (cadena.hasOwnProperty(letra)) 
        {
            let cadenaLetra =this.getLetra(cadena[letra]);
            
            for(let i=0; i< cadenaLetra.length;i++){
                cadenaImprimir.push(cadenaLetra[i])
            }
            cadenaImprimir.push(0);
            cadenaImprimir.push(0);
           
        }

    }

    cadenaImprimir.push(0);
    cadenaImprimir.push(0);
    cadenaImprimir.push(0);
    cadenaImprimir.push(0);
    cadenaImprimir.push(0);
    cadenaImprimir.push(0);

}
module.exports.getCadena = (cadena) => {
    for (const letra in cadena) {
        if (cadena.hasOwnProperty(letra)) {
            let linea0 = cadenaImprimir[0];
            linea0 ? cadenaImprimir[0] = linea0 + this.getLetra(cadena[letra])[0] : cadenaImprimir[0] = this.getLetra(cadena[letra])[0];

            let linea1 = cadenaImprimir[1];
            linea1 ? cadenaImprimir[1] = linea1 + this.getLetra(cadena[letra])[1] : cadenaImprimir[1] = this.getLetra(cadena[letra])[1];

            let linea2 = cadenaImprimir[2];
            linea2 ? cadenaImprimir[2] = linea2 + this.getLetra(cadena[letra])[2] : cadenaImprimir[2] = this.getLetra(cadena[letra])[2];

            let linea3 = cadenaImprimir[3];
            linea3 ? cadenaImprimir[3] = linea3 + this.getLetra(cadena[letra])[3] : cadenaImprimir[3] = this.getLetra(cadena[letra])[3];

            let linea4 = cadenaImprimir[4];
            linea4 ? cadenaImprimir[4] = linea4 + this.getLetra(cadena[letra])[4] : cadenaImprimir[4] = this.getLetra(cadena[letra])[4];

            let linea5 = cadenaImprimir[5];
            linea5 ? cadenaImprimir[5] = linea5 + this.getLetra(cadena[letra])[5] : cadenaImprimir[5] = this.getLetra(cadena[letra])[5];

            let linea6 = cadenaImprimir[6];
            linea6 ? cadenaImprimir[6] = linea6 + this.getLetra(cadena[letra])[6] : cadenaImprimir[6] = this.getLetra(cadena[letra])[6];

            let linea7 = cadenaImprimir[7];
            linea7 ? cadenaImprimir[7] = linea7 + this.getLetra(cadena[letra])[7] : cadenaImprimir[7] = this.getLetra(cadena[letra])[7];

        }


    }
    
}

module.exports.graficar = (cadena) => {
    this.getCadenaImprimir(cadena);
    console.log(cadenaImprimir);
    let inicio =0;
    let fin = 8;
    
    let bucle = true;
    let cadenaEnviar = "";

    while (fin<=cadenaImprimir.length) {
        let cont = 0;

        for (inicio; cont+inicio < fin; cont++) {
            if (cont + inicio +1 < fin) {
                cadenaEnviar += cadenaImprimir[inicio+cont] + '-';
            } else {
                cadenaEnviar += cadenaImprimir[inicio+cont] + '*';
            }

        }
        cadenaLoop.push(cadenaEnviar);
        inicio++;
        fin++
        cadenaEnviar = "";



    }
    
  return cadenaLoop;


}