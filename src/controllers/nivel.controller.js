import Nivel from '../models/nivel.modelo.js'

export const listar = async (req, res) => {
    try {
        const registros = await Nivel.findAll()
        res.send(registros)
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const buscar = async (req, res) => {
    const id = req.params.idNivel
    try {
        const nivel = await Nivel.findOne({
            where: {
                idNivel: id
            }
        })
        res.send(nivel)
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
        await Nivel.sync();
        await Nivel.create({
            descripcion: data.descripcion,
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Nivel académico creado exitosamente'
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
    const id = req.params.idNivel;
    const data = req.body;

    try {
        await Nivel.update({
            descripcion: data.descripcion
        }, {
            where: {
                idNivel: id
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Nivel académico actualizado exitosamente'
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
    const id = req.params.idNivel;

    try {
        await Nivel.destroy({
            where: {
                idNivel: id
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Nivel académico eliminado exitosamente'
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
}