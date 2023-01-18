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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = void 0;
function handle(executor, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield executor();
            res.status(200).json(results);
        }
        catch (error) {
            const status = error.status || error.isValidationError
                ? 400
                : 500;
            res.status(status).send({ status: 'error', message: error.message });
        }
    });
}
exports.handle = handle;
