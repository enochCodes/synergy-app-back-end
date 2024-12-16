"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const postgres_1 = require("@sequelize/postgres");
const sequelize = new core_1.Sequelize({
    dialect: postgres_1.PostgresDialect,
    database: "mydb",
    user: 'myuser',
    password: 'mypass',
    host: 'localhost',
    port: 5432,
    ssl: true,
    clientMinMessages: 'notice',
});
exports.default = sequelize;
