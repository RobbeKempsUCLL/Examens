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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteAllGames = exports.deleteGame = exports.setRating = exports.add = exports.favourite = exports.getGameByName = exports.getAllGames = exports.Game = void 0;
var valivalue_1 = __importDefault(require("valivalue"));
var uuid_1 = require("uuid");
var custom_error_1 = require("./custom-error");
var Game = /** @class */ (function () {
    function Game(id, name, type, rating, isFavourite) {
        if (isFavourite === void 0) { isFavourite = false; }
        this.id = valivalue_1["default"].strings.validateNotEmpty(id, 'Game ID');
        this.name = valivalue_1["default"].strings.validateMinAndMaxLength(name, 2, 64, "Name");
        this.type = valivalue_1["default"].strings.validateMinAndMaxLength(type, 2, 32, "Type");
        this.rating = valivalue_1["default"].numbers.validateMinAndMaxValue(rating, 0, 10, "Rating");
        this.isFavourite = isFavourite;
    }
    Game.prototype.equals = function (otherGame) {
        return this.name === otherGame.name
            && this.type === otherGame.type
            && this.rating === otherGame.rating
            && this.isFavourite === otherGame.isFavourite;
    };
    Game.prototype.toggleFavourite = function () {
        this.isFavourite = !this.isFavourite;
    };
    Game.prototype.setRating = function (rating) {
        valivalue_1["default"].numbers.validateMinAndMaxValue(rating, 0, 5, "Rating");
        this.rating = rating;
    };
    Game.create = function (json) {
        valivalue_1["default"].objects.validateNotNullOrUndefined(json.name, "Name");
        valivalue_1["default"].objects.validateNotNullOrUndefined(json.type, "Type");
        valivalue_1["default"].objects.validateNotNullOrUndefined(json.rating, "Rating");
        return new Game((0, uuid_1.v4)(), json.name, json.type, json.rating, false);
    };
    return Game;
}());
exports.Game = Game;
var allGames = [
    new Game((0, uuid_1.v4)(), 'Elden Ring', 'Fantasy', 4),
    new Game((0, uuid_1.v4)(), 'Horizon Forbidden West', 'Adventure', 3.5),
    new Game((0, uuid_1.v4)(), 'Pokémon Legends: Arceus', 'RPG', 3),
    new Game((0, uuid_1.v4)(), 'GTAV', 'Open World', 5)
];
var getAllGames = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (query) {
            return [2 /*return*/, allGames.filter(function (game) {
                    return game.name.toLowerCase().includes(query.toLowerCase());
                })];
        }
        return [2 /*return*/, allGames];
    });
}); };
exports.getAllGames = getAllGames;
var getGame = function (uuid) { return __awaiter(void 0, void 0, void 0, function () {
    var foundGame;
    return __generator(this, function (_a) {
        foundGame = allGames.find(function (existingGame) { return existingGame.id === uuid; });
        if (foundGame) {
            return [2 /*return*/, foundGame];
        }
        else {
            throw new custom_error_1.CustomError(404, "Game with ID '".concat(uuid, "' was not found."));
        }
        return [2 /*return*/];
    });
}); };
var add = function (game) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        allGames.push(game);
        return [2 /*return*/, game];
    });
}); };
exports.add = add;
var favourite = function (uuid) { return __awaiter(void 0, void 0, void 0, function () {
    var foundGame;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getGame(uuid)];
            case 1:
                foundGame = _a.sent();
                foundGame.toggleFavourite();
                return [2 /*return*/, foundGame];
        }
    });
}); };
exports.favourite = favourite;
var setRating = function (uuid, rating) { return __awaiter(void 0, void 0, void 0, function () {
    var foundGame;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getGame(uuid)];
            case 1:
                foundGame = _a.sent();
                foundGame.setRating(rating);
                return [2 /*return*/, foundGame];
        }
    });
}); };
exports.setRating = setRating;
var deleteGame = function (uuid) { return __awaiter(void 0, void 0, void 0, function () {
    var foundGame, updatedList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getGame(uuid)];
            case 1:
                foundGame = _a.sent();
                updatedList = allGames.filter(function (currentGame) { return currentGame.id !== foundGame.id; });
                allGames = updatedList;
                return [2 /*return*/, foundGame];
        }
    });
}); };
exports.deleteGame = deleteGame;
var deleteAllGames = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        allGames = [];
        return [2 /*return*/];
    });
}); };
exports.deleteAllGames = deleteAllGames;
var getGameByName = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, allGames.find(function (game) { return game.name.toLowerCase() === name.toLowerCase(); })];
    });
}); };
exports.getGameByName = getGameByName;
