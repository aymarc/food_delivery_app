"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./utils/db");
const middleware_1 = __importDefault(require("./utils/middleware"));
const app = (0, express_1.default)();
const node_env = process.env.NODE_ENV;
const api_version = process.env.API_VERSION;
const middleware = new middleware_1.default(app, node_env, api_version);
//print the request object in development
middleware.report();
//handle errors and send feedback to user
middleware.catchError();
//handle request that don't match any route:send a 404 NOT FOUND to user
middleware.catchRequestWithNoMatch();
try {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`=======Server running on port ${process.env.PORT || 8000}========\n\n`);
    });
}
catch (error) {
    console.error(error);
    throw error;
}
exports.default = app;
