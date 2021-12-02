const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM todo where activo = 1', (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// arreglar
router.post('/guardar', async (req, res) => {
    const data = req.body;
    data.forEach((element) => {
        const { descripcion, isCompleted, usuario_id, id, activo } = element;
        if (element.newData) {
            console.log('Nuevo Registro', element.id);
            pool.query('INSERT INTO todo(descripcion, isCompleted, usuario_id) VALUES (?,?,?)', [descripcion, isCompleted, usuario_id], (err, rows) => {
                if (err) {
                    res.status(500).send({status: 500, message: 'Ha surgido un error en el servidor'});
                    console.log(err);
                }
            })
        }
        pool.query('UPDATE todo SET descripcion = ?, isCompleted = ?, activo = ? WHERE id= ?', [descripcion, isCompleted, activo, id], (err, rows) => {
            console.log(element);
            if (err) {
                res.status(500).send({status: 500, message: 'Ha surgido un error en el servidor'});
                console.log(err);
            }
        })
        console.log('Actualizacion del registro', element.id);
    });
    res.status(200).send({status: 200, message: 'Registros guardados.'});
});

router.post('/update', async (req, res) => {
    const data = req.body;

    data.forEach((element) => {
        const { id , activo } = element;
        pool.query('UPDATE todo SET activo = ? WHERE id= ?', [activo, id], (err, rows) => {
            console.log(element);
            if (err) {
                res.status(500).send({status: 500, message: 'Ha surgido un error en el servidor'});
                console.log(err);
            }
        })
        console.log('Actualizacion del registro', element.id);
    });
});

module.exports = router;