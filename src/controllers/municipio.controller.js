import Municipios from '../models/municipio.modelo.js'

export const listar = async (req, res) => {
    try {
        const municipios = await Municipios.findAll()
        res.send(municipios)
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const buscar = async (req, res) => {
    const id = req.params.idMunicipio
    try {
        const municipio = await Municipios.findOne({
            where: {
                idMunicipio: id
            }
        })
        res.send(municipio)
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
        await Municipios.sync();
        await Municipios.create({
            nombre: data.nombre,
            idEstado: data.idEstado
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Municipio creado exitosamente'
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
    const id = req.params.idMunicipio;
    const data = req.body;

    try {
        await Municipios.update({
            nombre: data.nombre
        }, {
            where: {
                idMunicipio: id
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Municipio actualizado exitosamente'
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
    const id = req.params.idMunicipio;

    try {
        await Municipios.destroy({
            where: {
                idMunicipio: id
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Municipio eliminado exitosamente'
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
}