import Admins from '../models/admin.modelo.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const listar = async (req, res) => {
    try {
        const admins = await Admins.findAll()
        res.send(admins)
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const buscar = async (req, res) => {
    const id = req.params.idAdmin
    try {
        const admin = await Admins.findOne({
            where: {
                idAdmin: id
            }
        })
        res.send(admin)
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const agregar = async (req, res) => {
    const data = req.body;

    try {
        await Admins.sync()

        const hash_pwd = await bcrypt.hash(data.pwd, 10)

        const userSaved = await Admins.create({
            username: data.username,
            pwd: hash_pwd
        });

        const token = await createAccessToken({id: userSaved.idAdmin});
        res.cookie("token", token);

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Usuario creado exitosamente'
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const actualizar = async (req, res) => {
    const id = req.params.idAdmin;
    const data = req.body;

    try {
        await Admins.update({
            username: data.username,
            pwd: data.pwd
        }, {
            where: {
                idAdmin: id
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Usuario actualizado exitosamente'
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
}

export const eliminar = async (req, res) => {
    const id = req.params.idAdmin;

    try {
        await Admins.destroy({
            where: {
                idAdmin: id
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Usuario eliminado exitosamente'
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    const data = req.body;

    try {
        const userFound = await Admins.findOne({
            where: {
                username: data.username
            }
        });

        if (!userFound) return res.status(400).json({
            ok: false,
            status: 400,
            message: "Usuario no encontrado"
        });

        const isMatch = await bcrypt.compare(data.pwd, userFound.pwd);
        if (!isMatch) return res.status(400).json({
            ok: false,
            status: 400,
            message: "Contraseña incorrecta"
        });

        const token = await createAccessToken({id: userFound.idAdmin});
        res.cookie("token", token);

        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Inicio se sesíon exitoso'
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            status: 400,
            message: error.message
        })    
    }
}

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    });

    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    console.log(req.user);

    const userFound = await Admins.findOne({
        where: {
            idAdmin: req.user.id
        }
    });

    if (!userFound) 
        return res.status(400).json({ message: 'Usuario no encontrado' });

    return res.json({
        id: userFound.id,
        username: userFound.username,
        password: userFound.pwd
    })
}