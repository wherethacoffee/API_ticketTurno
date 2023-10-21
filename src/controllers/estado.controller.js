import Estados from '../models/estado.modelo.js'

export const listar = async (req, res) => {
    try {
        const estados = await Estados.findAll()
        res.send(estados)
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const buscar = async (req, res) => {
    const id = req.params.idEstado
    try {
        const estado = await Estados.findOne({
            where: {
                idEstado: id
            }
        })
        res.send(estado)
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
        await Estados.sync()
        await Estados.create({
            nombre: data.nombre
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Estado creado exitosamente'
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
    const id = req.params.idEstado;
    const data = req.body;

    try {
        await Estados.update({
            nombre: data.nombre
        }, {
            where: {
                idEstado: id
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Estado actualizado exitosamente'
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
    const id = req.params.idEstado;

    try {
        await Estados.destroy({
            where: {
                idEstado: id
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Estado eliminado exitosamente'
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
}