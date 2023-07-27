const express = require('express');
const router = express.Router();
const db = require('../bases-orm/sequelize-init');


// GET: /tipoFecha
router.get('/api/tiposFecha', async (req, res, next) => {
    let tiposFecha = await db.TipoFecha.findAll({
        attributes: [
            'id',
            'nombre'
        ]
    });
    res.json(tiposFecha);
}
);

// GET: /tipoFecha/:id
router.get('/api/tiposFecha/:id', async (req, res, next) => {
    try{
        let tipoFecha = await db.TipoFecha.findOne({
            attributes: [
                'id',
                'nombre'
            ],
            where: {
                id: req.params.id
            }
        });
        if(tipoFecha){
            res.json(tipoFecha);
        }
    }catch(err){
        res.status(404).json({error: "No se encontro el tipo de fecha"});
    }
}
);

module.exports = router;