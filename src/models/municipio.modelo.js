import { Model, DataTypes } from "sequelize";
import { sequelize } from './dbConn.js'
import Estado from "./estado.modelo.js";


class Municipio extends Model {}

Municipio.init({
    idMunicipio: {
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
    idEstado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Estado,
            key: "idEstado"
        }
    }
}, {
    sequelize,
    modelName: 'Municipio',
    tableName: 'municipios',
    timestamps: false
});

Municipio.belongsTo(Estado, { foreignKey: 'idEstado' });

export default Municipio;