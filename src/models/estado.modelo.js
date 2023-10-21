import { Model, DataTypes } from "sequelize";
import { sequelize } from './dbConn.js'


class Estado extends Model {}

Estado.init({
    idEstado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'Estado',
    tableName: 'estados',
    timestamps: false
});

export default Estado;