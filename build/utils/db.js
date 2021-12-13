"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USERNAME;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const db = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
});
exports.default = db;
