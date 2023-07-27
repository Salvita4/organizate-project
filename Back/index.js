//importar express
const express = require('express');
const cors = require('cors');

//crear un servidor express
const app = express();
require("./bases-orm/sqlite-init.js")//iniciar la bd
app.use(express.json());//para que express pueda leer json
app.use(cors());//para que express pueda recibir peticiones de otros dominios

//importar la ruta de tarea
const tareaRouter = require('./routes/tarea.js');
app.use(tareaRouter);//usar las rutas (middleware

//importar la ruta de materia
const materiaRouter = require('./routes/materia.js');
app.use(materiaRouter);//usar las rutas (middleware)

//importar la ruta de tipoFecha
const tipoFechaRouter = require('./routes/tipoFecha.js');
app.use(tipoFechaRouter);//usar las rutas (middleware)

//abrir el puerto configurado
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
}
);