import Alumnos from '../models/alumno.modelo.js'

export const listar = async (req, res) => {
    try {
        const alumnos = await Alumnos.findAll()
        res.send(alumnos)
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const buscar = async (req, res) => {
    const curp = req.params.curp
    try {
        const alumno = await Alumnos.findOne({
            where: {
                curp: curp
            }
        })
        res.send(alumno)
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
        await Alumnos.sync();
        await Alumnos.create({
            curp: data.curp,
            nombre: data.nombre,
            paterno: data.paterno,
            materno: data.materno
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Alumno agregado exitosamente'
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
    const curp = req.params.curp;
    const data = req.body;

    try {
        await Alumnos.update({
            curp: data.curp,
            nombre: data.nombre,
            paterno: data.paterno,
            materno: data.materno
        }, {
            where: {
                curp: curp
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Alumno actualizado exitosamente'
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
    const curp = req.params.curp;

    try {
        await Alumnos.destroy({
            where: {
                curp: curp
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Alumno eliminado exitosamente'
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
}