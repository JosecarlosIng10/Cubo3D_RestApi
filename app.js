const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var request = require('request');
const letras = require('./letras');
const app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));


app.listen(port, () => console.log('Server is running dude!! ' + port));


/**
 * Conexion a la base de datos que se encuentra en un cluster en Mongo Atlas.
 */
mongoose.connect('mongodb+srv://admin:admin@cluster0-i9nzs.mongodb.net/Cubo?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Se conecto"))
    .catch((err) => console.log("Error en conexion ", err));

/**
 * Modelo del objeto cadena.
 */
const CadenaModel = new mongoose.Schema({
    texto: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false,
    }
})

const cadena = mongoose.model('Texto', CadenaModel);


/**
 * Se crea una nueva cadena en el server y se envia a graficar al cubo.
 */
app.post('/cadena', (req, res) => {
    /*cadena.create(req.body)
        .then((data) => res.send(data))
        .catch((error) => res.send(error));*/

    let cadenaLetras = letras.graficar(req.body.texto);
    var interval = 10 * 70;
    for (let i = 0; i < cadenaLetras.length; i++) {
        setTimeout((i) => {
            console.log(cadenaLetras[i]);
            request.post('http://192.168.43.13/', {
                form: {
                    user_input: cadenaLetras[i]
                }
            });
        }, interval * i, i);

    }

    res.send("GRAFICANDO");


});

/**
 * Se obtienen las cadenas guardadas en la base de datos.
 */
app.get('/cadena', (req, res) => {
    cadena.find({}, (err, text) => {
        var data = [];
        text.forEach((texto) => {
            data.push(texto);
        });
        res.send(data);

    });


});

/**
 * Se obtiene una cadena especifica.
 */
app.get('/cadena/:code', (req, res) => {
    const code = req.params.code;
    cadena.findById(code).then((data) => res.send(data))
        .catch((error) => res.send(error));
})

/**
 * Se elimina una cadena especifica.
 */
app.delete('/cadena/:code', (req, res) => {
    const code = req.params.code;

    cadena.deleteOne({
            _id: code
        })
        .then((data) => res.send(data))
        .catch((error) => res.send(error));
})

/**
 * Se obtiene el html de la pagina de inicio de la api.
 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

});

/*app.get('/casa', (req, res) => {
    console.log(letras.graficar("A"));
    res.sendFile(__dirname + '/index.html');

});*/
