"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
class Middleware {
    constructor(app, env, apiVersion) {
        this.app = app;
        this.apiVersion = apiVersion;
        this.app.use((0, express_1.json)());
        this.app.use((0, express_1.urlencoded)({ extended: true }));
        this.app.use((0, express_1.raw)());
        this.app.use((0, cors_1.default)());
        this.env = env;
    }
    initilazeRoute(routeName) {
        this.app.use(this.apiVersion, routeName);
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
                console.info("============START====================\n");
                console.time("request-duration");
                console.info(requestObject);
                console.timeEnd("request-duration");
                console.info("============START====================\n");
                next();
            });
        }
    }
    catchError() {
        this.app.use((err, req, res, next) => {
            if (!err) {
                return next();
            }
            console.error("==================Error Start=========\n", err, "==================Error End==========\n\n");
            res.status(err.httpStatusCode || 500).json(() => {
                return {
                    success: false,
                    message: "Oops! We are so sorry; something went wrong. Kindly contact support if this persist."
                };
            });
        });
    }
    catchRequestWithNoMatch() {
        this.app.use((req, res, next) => {
            res.status(404).json({
                message: `Requested route ( ${req.get('HOST')}${req.originalUrl} ) not found`,
            });
        });
    }
}
exports.default = Middleware;
