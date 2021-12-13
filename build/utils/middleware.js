"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
class Utils {
    constructor(app, env) {
        this.app = app;
        this.app.use((0, express_1.json)());
        this.app.use((0, express_1.urlencoded)({ extended: true }));
        this.app.use((0, express_1.raw)());
        this.app.use((0, cors_1.default)());
        this.env = env;
    }
    report() {
        if (this.env === "development") {
            this.app.use((req, res, next) => {
                const requestObject = {
                    AuthToken: req.headers.authorization,
                    Url: `${req.get("HOST")}${req.originalUrl}`,
                    Method: req.method,
                    Body: req.body,
                    Params: req.params,
                    Query: req.query,
                };
                console.info(requestObject);
                next();
            });
        }
    }
}
exports.default = Utils;
