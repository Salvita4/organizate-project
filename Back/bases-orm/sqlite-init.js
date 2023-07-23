const sql = require('sqlite3');

async function createBaseIfNotExist(){
    //abrir la base y crearla si no existe
    await db.open('./.data/organizt.db');

    let existe = false;
    let res = null;

    res = await db.get("SELECT count(*) AS contar FROM sqlite_schema WHERE type='table' AND name='tareas'", []);

    if(res.contar > 0){
        existe = true;
    }

    if(!existe){
        await db.run(`CREATE TABLE tareas (id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL, 
        fechaDesde DATE NOT NULL,
        fechaHasta DATE,
        estado BOOLEAN NOT NULL,)`);

        console.log("Se creo la tabla tareas");

        //inserto las filas
        await db.run(
            `INSERT INTO tareas (nombre, fechaDesde, fechaHasta, estado) VALUES ('tarea1', '23-04-2023', '24-04-2023', 1)`,
        );
    }
    existe = false;

    //CREO LA TABLA MATERIA
    res = await db.get("SELECT count(*) AS contar FROM sqlite_schema WHERE type='table' AND name='materias'", []);

    if(res.contar > 0){
        existe = true;
    }

    if(!existe){
        await db.run(`CREATE TABLE materias (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL)`);
        console.log("Se creo la tabla materias");

        //inserto las filas

        await db.run(
            `INSERT INTO materias (nombre) VALUES ('BASES DE DATOS')`,
        );
    }
    existe = false;
    
    //CREO LA TABLA TIPOFECHA
    res = await db.get("SELECT count(*) AS contar FROM sqlite_schema WHERE type='table' AND name='tipoFechas'", []);

    if(res.contar > 0){
        existe = true;
    }

    if(!existe){
        await db.run(`CREATE TABLE tipoFechas (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL)`);
        console.log("Se creo la tabla tipoFechas");

        //inserto las filas

        await db.run(
            `INSERT INTO tipoFechas (nombre) VALUES ('PARCIAL')`,
        );
    }
    existe = false;


    //CREO LA TABLA FECHA
    res = await db.get("SELECT count(*) AS contar FROM sqlite_schema WHERE type='table' AND name='fechas'", []);

    if(res.contar > 0){
        existe = true;
    }

    if(!existe){
        await db.run(`CREATE TABLE fechas (fechaSeleccionada DATE NOT NULL,
            idMateria INTEGER NOT NULL,
            idTipoFecha INTEGER NOT NULL,
            descripcion TEXT NOT NULL,
            estado BOOLEAN NOT NULL,
            FOREING KEY(idMateria) REFERENCES materias(id),
            FOREING KEY(idTipoFecha) REFERENCES tipoFechas(id)),
            PRIMARY KEY (fechaSeleccionada, idMateria, idTipoFecha)`);

        console.log("Se creo la tabla fechas");

        //inserto las filas
        await db.run(
            `INSERT INTO fechas (fechaSeleccionada, idMateria, idTipoFecha, descripcion) VALUES ('23-04-2023', 1, 1, 'PARCIAL 1',1)`
        );
    }
    existe = false;

}

createBaseIfNotExist();
module.exports = createBaseIfNotExist