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
            fechaDesde DATE NOT NULL,
            fechaHasta DATE,
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
            id CHAR(2) PRIMARY KEY NOT NULL, 
            nombre TEXT NOT NULL,
            shortName TEXT NOT NULL);`
            );
        console.log("Se creo la tabla materias");

        //inserto las filas

        await db.run(
            `INSERT INTO materias (id, nombre, shortName) VALUES 
            (1, 'ANALISIS MATEMATICO I', 'AM I'),
            (2, 'ALGEBRA Y GEOMETRIA ANALITICA', 'AGA'),
            (3, 'FISICA I', 'FIS I'),
            (4, 'INGLES I', 'ING I'),
            (5, 'LOGICA Y ESTRUCTURAS DISCRETAS', 'LED'),
            (6, 'ALGORITMOS Y ESTRUCTURAS DE DATOS', 'AED'),
            (7, 'ARQUITECTURA DE COMPUTADORAS', 'ACO'),
            (8, 'SISTEMAS Y PROCESOS DE NEGOCIOS', 'SPN'),
            (9, 'ANALISIS MATEMATICO II', 'AM II'),
            (10, 'FISICA II', 'FIS II'),
            (11, 'INGENIERIA Y SOCIEDAD', 'ISO'),
            (12, 'INGLES II', 'ING II'),
            (13, 'SINTAXIS Y SEMANTICA DE LOS LENGUAJES', 'SSL'),
            (14, 'PARADIGMAS DE PROGRAMACION', 'PPR'),
            (15, 'SISTEMAS OPERATIVOS', 'SOP'),
            (16, 'ANALISIS DE SISTEMAS DE INFORMACION', 'ASI'),
            (17, 'PROBABILIDAD Y ESTADISTICAS', 'PYE'),
            (18, 'ECONOMIA', 'ECO'),
            (19, 'BASES DE DATOS', 'BD'),
            (20, 'DESARROLLO DE SOFTWARE', 'DDS'),
            (21, 'COMUNICACION DE DATOS', 'COM'),
            (22, 'ANALISIS NUMERICO', 'AM'),
            (23, 'DISEÑO DE SISTEMAS DE INFORMACION', 'DSI'),
            (24, 'LEGISLACION', 'LEG'),
            (25, 'INGENIERIA Y CALIDAD DE SOFTWARE', 'ICS'),
            (26, 'REDES DE DATOS', 'REDES'),
            (27, 'INVESTIGACION OPERATIVA', 'IOP'),
            (28, 'SIMULACION', 'SIM'),
            (29, 'TECNOLOGIAS PARA LA AUTOMATIZACION', 'TAC'),
            (30, 'ADMINISTRACION DE SISTEMAS DE INFORMACION', 'AS'),
            (31, 'INTELIGENCIA ARTIFICIAL', 'IA'),
            (32, 'CIENCIA DE DATOS', 'CDD'),
            (33, 'SISTEMAS DE GESTION', 'SDG'),
            (34, 'GESTION GERENCIAL', 'GG'),
            (35, 'SEGURIDAD EN LOS SISTEMAS DE INFORMACION', 'SSI'),
            (36, 'PROYECTO FINAL', 'PF'),
            ('E1', 'BACKEND DE APLICACIONES', 'BA'),
            ('E2', 'GREEN SOFTWARE', 'GSOFT'),
            ('E3', 'GESTION INDUSTRIAL DE LA PRODUCCION', 'GIP'),
            ('E4', 'GESTION DE LA MEJORA DE LOS PROCESOS', 'GMP'),
            ('E5', 'DESARROLLO Y OPERACIONES DEVOPS', 'DEVOPS'),
            ('E6', 'DESARROLLO DE APLICACIONES CON OBJETOS', 'DAO'),
            ('E7', 'COMUNICACION MULTIMEDIAL EN EL DESARROLLO DE SISTEMAS DE INFORMACION', 'CMDSI'),
            ('E8', 'ARQUITECTURA DE SOFTWARE', 'ARQSOFT'),
            ('E9', 'DESARROLLO DE TECNOLOGIAS BLOCKCHAIN', 'DTB'),
            ('E10', 'CREATIVIDAD E INNOVACION EN INGENIERIA', 'CII'),
            ('E11', 'AUDITORIA DE SI/TI', 'ASITI'),
            ('E12', 'GERENCIAMIENTO ESTRATEGICO', 'GE'),
            ('E13', 'CONSULTORIA EN NEGOCIOS DIGITALES', 'CNG'),
            ('E14', 'EMPRENDIMIENTOS TECNOLOGICOS', 'ET'),
            ('E15', 'DECISIONES EN ESCENARIOS COMPLEJOS', 'DEC'),
            ('E16', 'TESTING DE SOFTWARE', 'TS'),
            ('E17', 'SEGURIDAD EN EL DESARROLLO DE SOFTWARE', 'SDS'),
            ('E18', 'INTEGRACION DE APLICACIONES EN ENTORNO WEB', 'IAWEB'),
            ('E19', 'INGENIERIA DE SOFTWARE DE FUENTES ABIERTAS/LIBRES', 'OPENSOURCE');`,
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
            `INSERT INTO tipoFechas (id, nombre) VALUES 
            (1, 'PARCIAL'),
            (2, 'PARCIALITO'),
            (3, 'TRABAJO PRACTICO'),
            (4, 'LABORATORIO'),
            (5, 'RECUPERATORIO'),
            (6, 'FINAL'),
            (7, 'FERIADO'),
            (8, 'DIA IMPORTANTE'),
            (9, 'CHARLA'),
            (10, 'CUMPLE'),
            (11, 'EVENTO');`,
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
            idMateria INTEGER,
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