const express = require('express');
const router = express.Router();
const db = require('../bases-orm/sequelize-init.js');
const { Op, ValidationError } = require("sequelize");

// GET all tareas
router.get("/api/tareas", async (req, res, next) => {
    try {
        let where = {};
        if (req.query.fechaDesde != null && req.query.fechaDesde !== "") {
            const fechaDesde = new Date(req.query.fechaDesde);

            where.fechaDesde = {
                [Op.gte]: fechaDesde
            };
        }
        if (req.query.estado != null && req.query.estado !== "") {
            where.estado = req.query.estado === "true";
        }

        const Pagina = req.query.Pagina ?? 1;
        const PageSize = 10;
        const { count, rows } = await db.Tarea.findAndCountAll({
            attributes: [
                "id",
                "nombre",
                "fechaDesde",
                "fechaHasta",
                "estado"
            ],
            order: [["fechaDesde", "ASC"]],
            where,
            offset: (Pagina - 1) * PageSize,
            limit: PageSize
        });
        return res.json({Items: rows, Total: count});
    } catch (err) {
        next(err);
    }
});

// GET one tarea
router.get("/api/tareas/:nombre", async (req, res, next) => {
    try {
        const tarea = await db.Tarea.findOne({
            where: {
                [Op.like]: "%" + req.params.nombre + "%"
            }
        });
        return res.json(tarea);
    } catch (err) {
        next(err);
    }
});

// POST one tarea
router.post("/api/tareas", async (req, res, next) => {
    try {
        let tarea = await db.Tarea.create({
            nombre: req.body.nombre,
            fechaDesde: req.body.fechaDesde,
            fechaHasta: req.body.fechaHasta,
            estado: req.body.estado
        });

        return res.status(200).json(tarea.dataValues); //se devuelve el estado 200 de creacion exitosa y se devuelve los valores de la tarea recien agregada

    } catch (err) {
        if (err instanceof ValidationError) {
            let msg = '';
            err.errors.forEach((e) => msg += (e.path ?? 'campo') + ': ' + e.message + '\n');
            return res.status(400).json({ message: msg });
        } else {
            throw(err);
        }
    }
});

// PUT one tarea
router.put('/api/tareas/:id', async (req, res) => {
    try {
        const tarea = await db.Tarea.update({
            nombre: req.body.nombre,
            fechaDesde: req.body.fechaDesde,
            fechaHasta: req.body.fechaHasta,
            estado: req.body.estado
        }, {
            where: {
                id: req.params.id
            }
        });
        return res.status(204);
    } catch (err) {
        if (err instanceof ValidationError){
            let msg = '';
            err.errors.forEach((e) => msg += (e.path ?? 'campo') + ': ' + e.message + '\n');
            return res.status(400).json({message: msg});
        }
    }
});

// DELETE one tarea BAJA LOGICA NO FISICA
router.delete("/api/tareas/:id", async (req, res, next) => {
    try {
        let tarea = await db.sequelize.query(
            `UPDATE tareas SET  estado = case when estado = 1 then 0 else 1 end WHERE id = ${req.params.id}`
        );
        res.sendStatus(200);
    } catch (err) {
        if (err instanceof ValidationError) {
            let msg = '';
            err.errors.forEach((e) => msg += (e.path ?? 'campo') + ': ' + e.message + '\n');
            return res.status(400).json({ message: msg });
        }
        else { throw (err); }
    }
});

module.exports = router;

