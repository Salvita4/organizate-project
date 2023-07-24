//config del orm
const {Sequelize, DataTypes}  = require('sequelize');

const sequelize = new Sequelize("sqlite:" + "./.data/organizt.db");

//definir los modelos
const Tarea = sequelize.define('tarea', 
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{ 
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El nombre no puede estar vacio"
            },
            len: {
                args: [10, 50],
                msg: "El nombre debe tener entre 10 y 50 caracteres"
            }
        }
    },
    fechaDesde: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: "La fecha desde no puede estar vacia"
            },
        }
    },
    fechaHasta: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: "El estado no puede estar vacio"
            }
        }
    }
},

//  HOOKS PARA PASAR A MAYUSCULAS
{
    hooks: {
        beforeValidate: (tarea, options) => {
            if (typeof tarea.nombre === 'string') {
                tarea.nombre = tarea.nombre.toUpperCase().trim();
            }
        }
    },
    tinmeStamps: false,
}
);

//modelo de materias
const Materia = sequelize.define('materia',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El nombre de la materia no puede estar vacio"
            },
            len: {
                args: [3, 30],
                msg: "El nombre de la materia debe tener entre 3 y 30 caracteres"
            }
        }
    }
},
{
    hooks: {
        beforeValidate: (materia, options) => {
            if (typeof materia.nombre === 'string') {
                materia.nombre = materia.nombre.toUpperCase().trim();
            }
        }
    },
    tinmeStamps: false,
}
);

//modelo de tipoFecha
const TipoFecha = sequelize.define('tipoFecha',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El nombre del tipo de fecha no puede estar vacio"
            },
            len: {
                args: [3, 20],
                msg: "El nombre del tipo de fecha debe tener entre 3 y 20 caracteres"
            }
        }
    }
},
    {
        hooks: {
            beforeValidate: (tipoFecha, options) => {
                if (typeof tipoFecha.nombre === 'string') {
                    tipoFecha.nombre = tipoFecha.nombre.toUpperCase().trim();
                }
            }
        },
    }
);

//modelo de fecha
const Fecha = sequelize.define('fecha',
{
    fechaSeleccionada: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La fecha no puede estar vacia"
            }
        }
    },
    idMateria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: "La materia no puede estar vacia"
            }
        }
    },
    idTipoFecha: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: "El tipo de fecha no puede estar vacio"
            }
        }
    },
    descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La descripcion no puede estar vacia"
            },
            len: {
                args: [10, 100],
                msg: "La descripcion debe tener entre 10 y 100 caracteres"
            }
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: "El estado no puede estar vacio"
            }
        }
    }
},
{
    hooks: {
        beforeValidate: (fecha, options) => {
            if (typeof fecha.descripcion === 'string') {
                fecha.descripcion = fecha.descripcion.toUpperCase().trim();
            }
        }
    },
    tinmeStamps: false,
}
);

//relaciones
Fecha.belongsTo(Materia, {foreignKey: 'idMateria'});
Fecha.belongsTo(TipoFecha, {foreignKey: 'idTipoFecha'});
Materia.hasMany(Fecha, {foreignKey: 'idMateria'});
TipoFecha.hasMany(Fecha, {foreignKey: 'idTipoFecha'});

//exportar los modelos
module.exports = {
    sequelize,
    Tarea,
    Materia,
    TipoFecha,
    Fecha
}