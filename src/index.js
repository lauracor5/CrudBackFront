const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

require('./databse')

//Asignado puerto para nuestro servidor
app.set('Port', 4000)

//El morgan nos sirve para saber que tipo de peticiones esta recibiendo nuestro servidor 
app.use(morgan("dev"));


//EXPRESS json nos sirve para convertir los datos a formato json y leerlos adecuadamente
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//El cors nos sirve para permitir conexioens desde cualquier cliente
app.use(cors({ origin: '*' }));


//rutas
app.use('/',require('./routes/user.route'))

//Inciiadno nuestro servidor 
app.listen(app.get('Port'), () => {
    console.log('servidor corriendo en el puerto', app.get('Port'));
})