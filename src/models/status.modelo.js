import { Model, DataTypes } from "sequelize";
import { sequelize } from './dbConn.js'


class Status extends Model {}

Status.init({
    idStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isAlpha: true
        }
    },
}, {
    sequelize,
    modelName: 'Status',
    tableName: 'status',
    timestamps: false
});

export default Status;