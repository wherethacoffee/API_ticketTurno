import { Model, DataTypes } from "sequelize";
import { sequelize } from './dbConn.js'


class Representante extends Model {}

Representante.init({
    idRep: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+ [A-Za-záéíóúüñÁÉÍÓÚÜÑ]+$/,
        }
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
            is: /^\d{10}$/
        }
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
            is: /^\d{10}$/
        }
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
}, {
    sequelize,
    modelName: 'Representante',
    tableName: 'representantes',
    timestamps: false
});

export default Representante;