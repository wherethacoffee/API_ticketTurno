import Status from '../models/status.modelo.js'

export const listar = async (req, res) => {
    try {
        const registros = await Status.findAll()
        res.send(registros)
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
        await Status.sync();
        await Status.create({
            descripcion: data.descripcion,
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Status de turno creado exitosamente'
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
    const id = req.params.idStatus;
    const data = req.body;

    try {
        await Status.update({
            descripcion: data.descripcion
        }, {
            where: {
                idStatus: id
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Descripcion de status actualizada exitosamente'
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};