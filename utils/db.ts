"use strict";
import {Sequelize} from "sequelize";

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USERNAME as string
const dbHost = process.env.DB_HOST as string
const dbPassword = process.env.DB_PASSWORD 

const db = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
        host: dbHost,
        dialect: "mysql",
    }
)

export default db;