"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../utils/db"));
const model_1 = __importDefault(require("../menu/model"));
class Order extends sequelize_1.Model {
}
exports.default = Order;
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: db_1.default,
    tableName: "order"
});
Order.hasMany(model_1.default);
