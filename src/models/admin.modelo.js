import { Model, DataTypes } from "sequelize";
import { sequelize } from './dbConn.js'


class Admin extends Model {}

Admin.init({
    idAdmin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1, Infinity],
        }
    },
    pwd: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [8, Infinity],
        }
    }
}, {
    sequelize,
    modelName: 'Admin',
    tableName: 'admins',
    timestamps: false
});

export default Admin;