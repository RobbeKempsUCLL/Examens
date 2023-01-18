"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.CustomError = CustomError;
