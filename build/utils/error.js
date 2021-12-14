"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = exports.ExistError = exports.AccessDenied = exports.NotFoundError = exports.AuthenticationError = exports.ValidationError = void 0;
class CustomError extends Error {
    constructor() {
        super(...arguments);
        this.httpStatusCode = "";
    }
}
class ValidationError extends CustomError {
    constructor(message) {
        super(message);
        this.name = "NOT_VALID";
        this.httpStatusCode = "400";
    }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends CustomError {
    constructor(message) {
        super(message);
        this.name = "NOT_VALID";
        this.httpStatusCode = "401";
    }
}
exports.AuthenticationError = AuthenticationError;
class NotFoundError extends CustomError {
    constructor(message) {
        super(message);
        this.name = "NOT_FOUND";
        this.httpStatusCode = "404";
    }
}
exports.NotFoundError = NotFoundError;
class AccessDenied extends CustomError {
    constructor(message) {
        super(message);
        this.name = "NOT_ALLOWED";
        this.httpStatusCode = "403";
    }
}
exports.AccessDenied = AccessDenied;
class ExistError extends CustomError {
    constructor(message) {
        super(message);
        this.name = "ENTRY_ALREADY_EXIST";
        this.httpStatusCode = "409";
    }
}
exports.ExistError = ExistError;
class ErrorMessage extends CustomError {
    constructor(message) {
        super(message);
        this.name = "INTERNAL_SERVER_ERROR";
        this.httpStatusCode = "500";
    }
}
exports.ErrorMessage = ErrorMessage;
