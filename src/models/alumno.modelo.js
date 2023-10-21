import { Model, DataTypes } from "sequelize";
import { sequelize } from './dbConn.js'


class Alumno extends Model {}

Alumno.init({
    curp: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
            is: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paterno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    materno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Alumno',
    tableName: 'alumnos',
    timestamps: false
});

export default Alumno;