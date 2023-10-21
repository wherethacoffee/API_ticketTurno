import { Model, DataTypes } from "sequelize";
import { sequelize } from './dbConn.js'


class Nivel extends Model {}

Nivel.init({
    idNivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'Nivel',
    tableName: 'nivel',
    timestamps: false
});

export default Nivel;