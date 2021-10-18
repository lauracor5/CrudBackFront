const { Router } = require('express')
const { check } = require('express-validator')
const route = Router()
const userCtrl = require('../controllers/user.controller')
const validarCampos = require('../middlewares/validar')

route.get('/list', userCtrl.list)
route.get('/userid/:id', userCtrl.listid);
route.post(
    "/",
    [
        check('name', 'el campo name es requerio o no puede estar vacio')
            .exists()
            .trim()
            .notEmpty(),
        check('lastname', 'el campo name es requerio o no puede estar vacio')
            .exists()
            .trim()
            .notEmpty(),
            
    ],
    validarCampos,
    userCtrl.add
);
route.put('/userid/:id', userCtrl.update)
route.delete('/userid/:id', userCtrl.delete)

module.exports = route

