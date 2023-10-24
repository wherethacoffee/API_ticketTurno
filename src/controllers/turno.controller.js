import PDFDocument from 'pdfkit';
import qrcode from 'qrcode';
import sequelize from 'sequelize';


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
                nTurno: turno.nTurno,
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
    const { nTurno, curp_alumno } = req.params
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
                curp_alumno: curp_alumno,
                nTurno: nTurno,
            }
        });
        const turnoTransformado = {
            idTurno: turno.idTurno,
            nTurno: turno.nTurno,
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
    const idMunicipio = data.idMunicipio

    try {
        await Turnos.sync();

        const ultimoTurno = await obtenerUltimoNumTurno(idMunicipio);
        const nuevoTurno = ultimoTurno + 1;

        const turnoCreado = await Turnos.create({
            nTurno: nuevoTurno,
            idRep: data.idRep,
            curp_alumno: data.curp_alumno,
            idMunicipio: data.idMunicipio,
            idNivel: data.idNivel,
            idAsunto: data.idAsunto,
            idStatus: 1
        });

        const turnoEncontrado = await Turnos.findOne({
            include: [
                {
                    model: Representante,
                    attributes: ['nombre', 'celular', 'telefono', 'correo']
                },
                {
                    model: Alumno,
                    attributes: ['curp', 'nombre', 'paterno', 'materno']
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
                idTurno: turnoCreado.idTurno
            }
        });

        const turnoTransformado = {
            idTurno: turnoEncontrado.idTurno,
            nTurno: turnoEncontrado.nTurno,
            Representante: turnoEncontrado.Representante,
            Alumno: turnoEncontrado.Alumno,
            Municipio: turnoEncontrado.Municipio,
            Nivel: turnoEncontrado.Nivel,
            Asunto: turnoEncontrado.Asunto,
            Status: turnoEncontrado.Status,
        };

        console.log(turnoEncontrado);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=turno.pdf');

        generarPDF(turnoTransformado, res);
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        })
    }
};

export const actualizar = async (req, res) => {
    const { idTurno, curp_alumno } = req.params
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
                curp_alumno: curp_alumno,
                idTurno: idTurno,
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

export const cambiarStatus = async (req, res) => {
    const idTurno = req.params.idTurno;

    try {
        
        const turnoEncontrado = await Turnos.findOne({
            where: {
                idTurno: idTurno,
            }
        });

        if (turnoEncontrado.idStatus === 1) {
            await Turnos.update({
                idStatus: 2
            }, {
                where: {
                    idTurno: idTurno
                }
            });
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'El status del turno ha cambiado a "Realizado"'
            });
        } else {
            await Turnos.update({
                idStatus: 1
            }, {
                where: {
                    idTurno: idTurno
                }
            });
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'El status del turno ha cambiado a "Pendiente"'
            });
        }
        
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
};

const generarPDF = async (turno, res) => {
    const doc = new PDFDocument();
    const qrData = `CURP del alumno solicitante: ${turno.Alumno.curp}`;
    const qrImage = await qrcode.toDataURL(qrData);


    doc.pipe(res);

    doc.fontSize(20).text('Información del turno', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Turno: ${turno.nTurno}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text('Datos del alumno');
    doc.fontSize(12).text(`CURP del alumno: ${turno.Alumno.curp}
                        \nNombre completo: ${turno.Alumno.nombre} ${turno.Alumno.paterno} ${turno.Alumno.materno}
                        \nNivel académico: ${turno.Nivel.descripcion}`);
    doc.moveDown();
    doc.fontSize(14).text('Datos del tutor');
    doc.fontSize(12).text(`Nombre completo: ${turno.Representante.nombre}
                        \nCelular: ${turno.Representante.celular}
                        \nTeléfono: ${turno.Representante.telefono}
                        \nCorreo: ${turno.Representante.correo}`);
    doc.moveDown();
    doc.fontSize(14).text('Datos adicionales');
    doc.fontSize(12).text(`Asunto a tratar: ${turno.Asunto.descripcion}
                        \nMunicipio: ${turno.Municipio.nombre}
                        \nStatus actual del turno: ${turno.Status.descripcion}`);
    doc.moveDown();
    doc.image(qrImage, 450, 150, { width: 100, height: 100 });
    doc.end();
};

export const contarStatusTotal = async (req, res) => {
    try {
        const counts = await Turnos.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('idTurno')), 'totalTurnos'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN idStatus = 1 THEN 1 ELSE 0 END')), 'pendiente'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN idStatus = 2 THEN 1 ELSE 0 END')), 'realizado'],
            ]
        });

        if (counts.length > 0) {
            const { totalTurnos, pendiente, realizado } = counts[0].dataValues;

            res.send({
                totalTurnos,
                pendiente,
                realizado,
            });
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                message: 'No se encontraron registros de Turno.'
            });
        }
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        });
    }
};

export const contarStatusPorMunicipio = async (req, res) => {
    const idMunicipio = req.params.idMunicipio;

    try {
        const counts = await Turnos.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('idTurno')), 'totalTurnos'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN idStatus = 1 THEN 1 ELSE 0 END')), 'pendiente'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN idStatus = 2 THEN 1 ELSE 0 END')), 'realizado'],
            ],
            where: {
                idMunicipio: idMunicipio,
            },
        });

        if (counts.length > 0) {
            const { totalTurnos, pendiente, realizado } = counts[0].dataValues;

            res.send({
                totalTurnos,
                pendiente,
                realizado,
            });
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                message: 'No se encontraron registros de Turno para el municipio especificado.'
            });
        }
    } catch (error) {
        res.status(404).json({
            ok: false,
            status: 404,
            message: error.message
        });
    }
};

async function obtenerUltimoNumTurno(idMunicipio) {
    try {
        const ultimoTurno = await Turnos.findOne({
            attributes: [[sequelize.fn('max', sequelize.col('nTurno')), 'ultimoTurno']],
            where: { idMunicipio: idMunicipio }
        });

        if (ultimoTurno) {
            return ultimoTurno.getDataValue('ultimoTurno') || 0;
        }
        return 0;
    } catch (error) {
        throw error;
    }
}





