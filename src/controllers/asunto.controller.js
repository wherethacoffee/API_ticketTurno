import Asuntos from '../models/asunto.modelo.js'

export const listar = async (req, res) => {
    try {
        const asuntos = await Asuntos.findAll()
        res.send(asuntos)
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const buscar = async (req, res) => {
    const id = req.params.idAsunto
    try {
        const asunto = await Asuntos.findOne({
            where: {
                idAsunto: id
            }
        })
        res.send(asunto)
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
        await Asuntos.sync();
        await Asuntos.create({
            descripcion: data.descripcion,
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Asunto escolar creado exitosamente'
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
    const id = req.params.idAsunto;
    const data = req.body;

    try {
        await Asuntos.update({
            descripcion: data.descripcion
        }, {
            where: {
                idAsunto: id
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Asunto escolar actualizado exitosamente'
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
    const id = req.params.idAsunto;

    try {
        await Asuntos.destroy({
            where: {
                idAsunto: id
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Asunto escolar eliminado exitosamente'
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
}