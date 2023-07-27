const express = require('express');
const router = express.Router();
const db = require('../bases-orm/sequelize-init');

// GET: /materia
router.get('/api/materias', async (req, res, next) => {
    let materias = await db.Materia.findAll({
        attributes: [
            'id',
            'nombre'
        ]
    });
    res.json(materias);
});

// GET: /materia/:id
router.get('/api/materias/:id', async (req, res, next) => {
    try{
        let materia = await db.Materia.findOne({
            attributes: [
                'id',
                'nombre'
            ],
            where: {
                id: req.params.id
            }
        });
        if(materia){
            res.json(materia);
        }
    }catch(err){
        res.status(404).json({error: "No se encontro la materia"});
    }
});

module.exports = router;

