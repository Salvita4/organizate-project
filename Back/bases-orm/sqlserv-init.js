const sql = require("mssql");

async function tablaExiste(nombreTabla) {
    const queryResult = await sql.query(`
        SELECT COUNT(*) as contar
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = '${nombreTabla}'
    `);

    return queryResult.recordset[0].contar > 0;
}

async function initBDs() {
    try {
    // Configuración de la base de datos de SQL Server
    const config = {
        server: "organizate-project.database.windows.net",
        port: 1433,
        database: "orgnizat-db",
        authentication: {
            type: 'default',
            options: {
                userName: '9686443b-d2a8-4291-b44d-cf29f16daa9e',
                password: 'Nadielasabe1'
            }
        },
        options: {
            encrypt: true
        },
        connectionTimeout: 30000// Tiempo de espera para conectar con el servidor SQL
    };
    // Conectar a la base de datos
    const db = await sql.connect(config);

    // Verificar si la tabla "tareas" existe
    let existe = await tablaExiste("tareas");

    // Cerrar la conexión con la base de datos
    await sql.close();

    if (!existe) {
        // Crea la tabla tareas
        await sql.query(`
        CREATE TABLE tareas (
            idTarea INT PRIMARY KEY IDENTITY(1,1),
            nombre VARCHAR(50) NOT NULL,
            fechaDesde DATE NOT NULL,
            fechaHasta DATE NOT NULL,
            activo BOOLEAN NOT NULL
        ); `);

        console.log("tabla tareas creada exitosamente");

        //insercion de pruenba
        await sql.query(`
        INSERT INTO tareas (nombre, fechaDesde, fechaHasta, activo)
        VALUES ('Tarea de prueba', '2021-01-01', '2021-01-01', 1),
        ('Tarea de prueba 2', '2021-01-01', '2021-01-01', 1),
        ('Tarea de prueba 3', '2021-01-01', '2021-01-01', 1),
        ('Tarea de prueba 4', '2021-01-01', '2021-01-01', 1),
        ('Tarea de prueba 5', '2021-01-01', '2021-01-01', 1),    
        ; `);
    }

    existe = false;

    //cierro la base de datos
    await sql.close();

    } catch (error) {
    // Manejo de errores
    console.error("Error al conectar o consultar la base de datos:", error);
    throw error;
    }
}

initBDs();
module.exports = initBDs;
