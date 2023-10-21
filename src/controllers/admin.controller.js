import Admins from '../models/admin.modelo.js'

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
        await Admins.create({
            username: data.username,
            pwd: data.pwd
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Usuario creado exitosamente'
        })
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