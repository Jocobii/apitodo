const express = require('express');
const morgan = require('morgan');

// inicializaciones

const app = express();

// configuracion
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev')); //muestra toda las peticiones al servidor
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// variables globales
app.use((req, res, next) => {
    next();
});
// rutasß
app.use('/todos', require('./routes/todos.js'));

// empezar el servidor
app.listen(app.get('port'), () => {
    console.log('Server en el puerto:', app.get('port'), '🤖');
    console.log('Server iniciado 😎');
})