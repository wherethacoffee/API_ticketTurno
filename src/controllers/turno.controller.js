import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';


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
    const { idTurno, curp_alumno } = req.params
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
                idTurno: idTurno,
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
        const turnoCreado = await Turnos.create({
            idRep: data.idRep,
            curp_alumno: data.curp_alumno,
            idMunicipio: data.idMunicipio,
            idNivel: data.idNivel,
            idAsunto: data.idAsunto,
            idStatus: 1
        });

        const turnoEncontrado = await Turnos.findOne({
            where: {
                idTurno: turnoCreado.idTurno
            }
        });
        
        const pdfPath = await generarPDF(turnoEncontrado);
        res.download(pdfPath, 'turno.pdf', (err) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    status: 500,
                    message: 'Error al descargar el archivo'
                })
            }
            res.status(201).json({
                ok: true,
                status: 201,
                message: turnoEncontrado
            })
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

const generarPDF = (data) => {
    return new Promise((resolve, reject) => {
        const pdf = new PDFDocument();
        const pdfPath = path.join(__dirname, '..', 'temp', 'turno.pdf');
        const stream = fs.createWriteStream(pdfPath);

        pdf.pipe(stream);
        pdf.fontSize(14).text('Información del turno:');
        pdf.fontSize(12).text(`Número de turno: ${data.idTurno}`);
        pdf.fontSize(12).text(`CURP del alumno: ${data.curp_alumno}`);

        pdf.end();

        stream.on('finish', () => {
            resolve(pdfPath)
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}

