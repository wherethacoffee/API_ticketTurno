import { Model, DataTypes } from "sequelize";
import { sequelize } from './dbConn.js'


class Asunto extends Model {}

Asunto.init({
    idAsunto: {
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
    modelName: 'Asunto',
    tableName: 'asunto',
    timestamps: false
});

export default Asunto;