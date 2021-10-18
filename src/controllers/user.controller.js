const { json } = require("express")
const userModel = require('../models/user.model')
const userCtrl = {}

userCtrl.list = async (req, res) => {
    try {
        const limit= parseInt(req.query.limit) || 10;
        const page= parseInt(req.query.page) || 1;
        const options= {
            limit,
            page
        }
        //const users = await userModel.find();
        const users = await userModel.paginate({},options);
        res.json({
            ok: true,
            users,

        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

userCtrl.listid = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.findById({ _id: id });
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            })
        }
        res.json({
            ok: true, user:user
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}


userCtrl.add = async (req, res) => {
    try {
        const { name, lastname, email, salary } = req.body
        const verificarEmail = await userModel.findOne({ email })
        if (verificarEmail) {
            return res.status(400).json({
                ok: false,
                message: 'El correo ya esta registrado con otro usuario'
            })
        }
        const newUser = new userModel({
            name,
            lastname,
            email,
            salary,
        });
        await newUser.save();
        res.json({
            ok: true,
            newUser
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}


userCtrl.update = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.findById({ _id: id })
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            })
        }

        const name = req.body.name || user.name
        const lastname = req.body.lastname || user.lastname
        const email = req.body.email || user.email
        const salary = req.body.salary || user.salary

        const userUpdate = {
            name,
            lastname,
            email,
            salary
        }
        await user.updateOne(userUpdate);
        res.json({
            ok: true,
            message: "usuario actualizado"
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

userCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.findById({ _id: id })
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            })
        }

        await user.deleteOne()
        res.json({
            ok:true,
            message: "usuario eliminado"
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }


}

module.exports = userCtrl