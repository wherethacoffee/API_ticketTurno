import Turnos from '../models/turno.modelo.js'
import Representante from "../models/rep.modelo.js";
import Alumno from "../models/alumno.modelo.js";
import Municipio from "../models/municipio.modelo.js";
import Nivel from "../models/nivel.modelo.js";
import Asunto from "../models/asunto.modelo.js";
import Status from "../models/status.modelo.js";

export const listar = async (req, res) => {
    try {
        const turnos = await Turnos.findAll({
            include: [
                {
                    model: Representante,
                    attributes: ['nombre', 'celular', 'telefono', 'correo']
                },
                {
                    model: Alumno,
                    attributes: ['curp']
                },
                {
                    model: Municipio,
                    attributes: ['nombre']
                },
                {
                    model: Nivel,
                    attributes: ['descripcion']
                },
                {
                    model: Asunto,
                    attributes: ['descripcion']
                },
                {
                    model: Status,
                    attributes: ['descripcion']
                }
            ]
        });

        const turnosTransformados = turnos.map((turno) => {
            return {
                idTurno: turno.idTurno,
                Representante: turno.Representante,
                Alumno: turno.Alumno,
                Municipio: turno.Municipio,
                Nivel: turno.Nivel,
                Asunto: turno.Asunto,
                Status: turno.Status,
            };
        });
        res.send(turnosTransformados)
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const buscar = async (req, res) => {
    const idTurno = req.params.idTurno
    try {
        const turno = await Turnos.findOne({
            include: [
                {
                    model: Representante,
                    attributes: ['nombre', 'celular', 'telefono', 'correo']
                },
                {
                    model: Alumno,
                    attributes: ['curp']
                },
                {
                    model: Municipio,
                    attributes: ['nombre']
                },
                {
                    model: Nivel,
                    attributes: ['descripcion']
                },
                {
                    model: Asunto,
                    attributes: ['descripcion']
                },
                {
                    model: Status,
                    attributes: ['descripcion']
                }
            ],
            where: {
                idTurno: idTurno
            }
        });
        const turnoTransformado = {
            idTurno: turno.idTurno,
            Representante: turno.Representante,
            Alumno: turno.Alumno,
            Municipio: turno.Municipio,
            Nivel: turno.Nivel,
            Asunto: turno.Asunto,
            Status: turno.Status,
        };
        res.send(turnoTransformado)
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
        await Turnos.sync();

        const existingTurno = await Turnos.findOne({
            where: {
                curp_alumno: data.curp_alumno,
                idStatus: 1
            }
        });

        if (existingTurno) {
            res.send('Un alumno ya está registrado para un trámite con esos datos, espere a su finalización para realizar otro')
        } else {
            await Turnos.create({
                idRep: data.idRep,
                curp_alumno: data.curp_alumno,
                idMunicipio: data.idMunicipio,
                idNivel: data.idNivel,
                idAsunto: data.idAsunto,
                idStatus: 1
            });
            res.status(201).json({
                ok: true,
                status: 201,
                message: 'Turno creado exitosamente'
            })
        }
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const actualizar = async (req, res) => {
    const idTurno = req.params.idTurno;
    const data = req.body;

    try {
        await Turnos.update({
            idRep: data.idRep,
            curp_alumno: data.curp_alumno,
            idMunicipio: data.idMunicipio,
            idNivel: data.idNivel,
            idAsunto: data.idAsunto,
        }, {
            where: {
                idTurno: idTurno
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Datos del turno actualizados exitosamente'
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const statusRealizado = async (req, res) => {
    const idTurno = req.params.idTurno;

    try {
        await Turnos.update({
            idStatus: 2
        }, {
            where: {
                idTurno: idTurno
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Turno ha cambiado a "Realizado"'
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const eliminar = async (req, res) => {
    const idTurno = req.params.idTurno;

    try {
        await Turnos.destroy({
            where: {
                idTurno: idTurno
            }
        })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Datos del turno eliminados exitosamente'
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
}