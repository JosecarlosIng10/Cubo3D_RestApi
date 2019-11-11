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


mongoose.connect('mongodb+srv://admin:admin@cluster0-i9nzs.mongodb.net/Cubo?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Se conecto"))
    .catch((err) => console.log("Error en conexion ", err));


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

app.post('/cadena', (req, res) => {
    cadena.create(req.body)
        .then((data) => res.send(data))
        .catch((error) => res.send(error));

    let cadenaLetras = letras.graficar(req.body.texto);
    var interval = 10 * 70;
    for (let i = 0; i < cadenaLetras.length; i++) {
        setTimeout((i) => {
            console.log(cadenaLetras[i]);
            request.post('http://192.168.1.22/', {
                form: {
                    user_input: cadenaLetras[i]
                }
            });
        }, interval * i, i);

    }



});

app.get('/cadena', (req, res) => {
    cadena.find({}, (err, text) => {
        var data = [];
        text.forEach((texto) => {
            data.push(texto);
        });
        res.send(data);

    });


});

app.get('/cadena/:code', (req, res) => {
    const code = req.params.code;
    cadena.findById(code).then((data) => res.send(data))
        .catch((error) => res.send(error));
})

app.delete('/cadena/:code', (req, res) => {
    const code = req.params.code;

    cadena.deleteOne({
            _id: code
        })
        .then((data) => res.send(data))
        .catch((error) => res.send(error));
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

});
