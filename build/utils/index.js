"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handy_redis_1 = require("handy-redis");
const error_1 = require("./error");
/**
 * validation functions to validate respectively
 * body, params, and query for a given request.
 * Expection a Joi.Schema using joi package. Returns an errror
 * if validation fails. If not run the next process in the middleware
 * chain.
 *
 * Auth function to check for authentication token. Also checks for session
 * and determine whether user has an active session or not using Redis Store
 */
class Utils {
    constructor() {
        this.auth = (req, res, next) => {
            try {
                let authHeader = req.body.token || req.query.token || req.headers.authorization;
                let token = "";
                if (!authHeader) {
                    console.error("\n Auth Error: 'No access token supplied.'");
                    throw new error_1.AuthenticationError("Kindly Login to have access to this service.");
                }
                if (typeof authHeader !== undefined) {
                    token = authHeader.split(' ')[1];
                }
                ///console.log(token);
                const secret_key = process.env.APP_KEY;
                const decoded = jsonwebtoken_1.default.verify(token, secret_key);
                req.headers.user = decoded;
            }
            catch (err) {
                console.error("\n routes.js/middleware: Auth function says 'You may have sent an invalid token.'\n");
                throw new error_1.AuthenticationError("Session expired. Kindly login again.");
            }
            return next();
        };
    }
    connectRedis() {
        this.client = (0, handy_redis_1.createNodeRedisClient)();
        let clientError = null;
        this.client.nodeRedis.on('error', (err) => {
            console.error("=======Redis Error====", err, "======Redis Error End======");
            clientError = true;
        });
        if (!clientError) {
            console.info("=========Redis Server started==============");
            return this.client;
        }
    }
    setInRedis(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.set(key, value);
        });
    }
    getInRedis(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.client.set(key);
            return data;
        });
    }
    bodyValidator(schemaName) {
        if (!schemaName) {
            throw new error_1.ErrorMessage("No schema suplied to validator");
        }
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = schemaName.validate(req.body);
                if (error) {
                    throw new error_1.ValidationError(error.details[0].message);
                }
                next();
            }
            catch (err) {
                console.error("catch error ", err);
                next(err);
            }
        });
    }
    paramValidator(schemaName) {
        if (!schemaName) {
            throw new error_1.ErrorMessage("No schema suplied to validator");
        }
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = yield schemaName.validate(req.params);
                if (error) {
                    throw new error_1.ValidationError(error.details[0].message);
                }
                next();
            }
            catch (err) {
                console.error("catch error ", err);
                next(err);
            }
        });
    }
    queryValidator(schemaName) {
        if (!schemaName) {
            throw new error_1.ErrorMessage("No schema suplied to validator");
        }
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = schemaName.validate(req.query);
                if (error) {
                    throw new error_1.ValidationError(error.details[0].message);
                }
                next();
            }
            catch (err) {
                console.error("catch error ", err);
                next(err);
            }
        });
    }
}
exports.default = Utils;
