const db = require('aa-sqlite');

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
        try{
            await db.run(`CREATE TABLE tareas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL, 
            fechaDesde TEXT NOT NULL,
            fechaHasta TEXT,
            estado BOOLEAN NOT NULL);`);

            console.log("Se creo la tabla tareas");

            //inserto las filas
            await db.run(
                `INSERT INTO tareas (id, nombre, fechaDesde, fechaHasta, estado) VALUES (1, 'tarea1', '2023-01-22', '2023-04-05', 1);`,
            );
        }catch(err){
            console.log(err);
        }
    }
    existe = false;

    //CREO LA TABLA MATERIA
    res = await db.get("SELECT count(*) AS contar FROM sqlite_schema WHERE type='table' AND name='materias'", []);

    if(res.contar > 0){
        existe = true;
    }

    if(!existe){
        await db.run(`CREATE TABLE materias (
            id INTEGER PRIMARY KEY, 
            nombre TEXT NOT NULL);`
            );
        console.log("Se creo la tabla materias");

        //inserto las filas

        await db.run(
            `INSERT INTO materias (id, nombre) VALUES (
            1, 'BASES DE DATOS');`,
        );
    }
    existe = false;
    
    //CREO LA TABLA TIPOFECHA
    res = await db.get("SELECT count(*) AS contar FROM sqlite_schema WHERE type='table' AND name='tipoFechas'", []);

    if(res.contar > 0){
        existe = true;
    }

    if(!existe){
        await db.run(`CREATE TABLE tipoFechas (
            id INTEGER PRIMARY KEY,
            nombre TEXT NOT NULL);`);
        console.log("Se creo la tabla tipoFechas");

        //inserto las filas

        await db.run(
            `INSERT INTO tipoFechas (id, nombre) VALUES (
            1, 'PARCIAL');`,
        );
    }
    existe = false;


    //CREO LA TABLA FECHA
    res = await db.get("SELECT count(*) AS contar FROM sqlite_schema WHERE type='table' AND name='fechas'", []);

    if(res.contar > 0){
        existe = true;
    }

    if(!existe){
        await db.run(`CREATE TABLE fechas (
            fechaSeleccionada TEXT NOT NULL,
            idMateria INTEGER NOT NULL,
            idTipoFecha INTEGER NOT NULL,
            descripcion TEXT NOT NULL,
            estado BOOLEAN NOT NULL,
            PRIMARY KEY (fechaSeleccionada, idMateria, idTipoFecha),
            FOREIGN KEY(idMateria) REFERENCES materias(id),
            FOREIGN KEY(idTipoFecha) REFERENCES tipoFechas(id));`);

        console.log("Se creo la tabla fechas");

        //inserto las filas
        await db.run(
            `INSERT INTO fechas (fechaSeleccionada, idMateria, idTipoFecha, descripcion, estado) VALUES ('2023-05-03', 1, 1, 'PARCIAL 1',TRUE);`
        );
    }
    existe = false;
    db.close();
}

createBaseIfNotExist();
module.exports = createBaseIfNotExist