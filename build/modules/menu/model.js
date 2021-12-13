"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../utils/db"));
var MenuCategory;
(function (MenuCategory) {
    MenuCategory["APERITIFS"] = "APERITIFS";
    MenuCategory["ENTREES"] = "ENTREES";
    MenuCategory["MAIN"] = "MAIN COURSE";
    MenuCategory["DESERT"] = "DESERT";
})(MenuCategory || (MenuCategory = {}));
class Menu extends sequelize_1.Model {
}
exports.default = Menu;
Menu.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.ENUM,
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    sequelize: db_1.default,
    tableName: "menu",
});
