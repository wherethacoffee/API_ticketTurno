import { Model, DataTypes } from "sequelize";
import { sequelize } from './dbConn.js'

import Representante from "./rep.modelo.js";
import Alumno from "./alumno.modelo.js";
import Municipio from "./municipio.modelo.js";
import Nivel from "./nivel.modelo.js";
import Asunto from "./asunto.modelo.js";
import Status from "./status.modelo.js";


class Turno extends Model {}

Turno.init({
    idTurno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idRep: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Representante,
            key: 'idRep'
        }
    },
    curp_alumno: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Alumno,
            key: 'curp'
        },
        validate: {
            is: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/
        }
    },
    idMunicipio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Municipio,
            key: 'idMunicipio'
        }
    },
    idNivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Nivel,
            key: 'idNivel'
        }
    },
    idAsunto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Asunto,
            key: 'idAsunto'
        }
    },
    idStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Status,
            key: 'idStatus'
        },
        defaultValue: 1
    }
}, {
    sequelize,
    modelName: 'Turno',
    tableName: 'turnos',
    timestamps: false
}
);

Turno.belongsTo(Representante, { foreignKey: 'idRep' });
Turno.belongsTo(Alumno, { foreignKey: 'curp_alumno' });
Turno.belongsTo(Municipio, { foreignKey: 'idMunicipio' });
Turno.belongsTo(Nivel, { foreignKey: 'idNivel' });
Turno.belongsTo(Asunto, { foreignKey: 'idAsunto' });
Turno.belongsTo(Status, { foreignKey: 'idStatus' });

export default Turno;
