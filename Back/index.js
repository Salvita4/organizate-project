//importar express
const express = require('express');
const cors = require('cors');

//crear un servidor express
const app = express();

require("./bases-orm/sqlserv-init")//iniciar la bd
app.use(express.json());//para que express pueda leer json
app.use(cors());//para que express pueda recibir peticiones de otros dominios

//abrir el puerto configurado
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
}
);