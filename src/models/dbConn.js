import { Sequelize } from "sequelize";
import { 
    DB_HOST,
    DB_NAME,
    DB_PWD,
    DB_USER,
    DB_PORT } from '../config.js'

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT
});

async function testConn() {
    try {
        sequelize.authenticate();
        console.log("Bien");
    } catch (error) {
        console.error("Error: " + error);
    }
};

testConn();