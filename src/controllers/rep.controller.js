import Representantes from '../models/rep.modelo.js'

export const listar = async (req, res) => {
    try {
        const representantes = await Representantes.findAll()
        res.send(representantes)
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const buscar = async (req, res) => {
    const id = req.params.idRep
    try {
        const representante = await Representantes.findOne({
            where: {
                idRep: id
            }
        })
        res.send(representante)
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
        await Representantes.sync();
        await Representantes.create({
            nombre: data.nombre,
            celular: data.celular,
            telefono: data.telefono,
            correo: data.correo
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Representante creado exitosamente'
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
    const id = req.params.idRep;
    const data = req.body;

    try {
        await Representantes.update({
            nombre: data.nombre,
            celular: data.celular,
            telefono: data.telefono,
            correo: data.correo
        }, {
            where: {
                idRep: id
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Representante actualizado exitosamente'
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
    const id = req.params.idRep;

    try {
        await Representantes.destroy({
            where: {
                idRep: id
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Representante eliminado exitosamente'
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
}