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
exports.deleteAllGames = exports.deleteGame = exports.setRating = exports.add = exports.favourite = exports.getGameByName = exports.getAllGames = exports.Game = void 0;
const valivalue_1 = __importDefault(require("valivalue"));
const uuid_1 = require("uuid");
const custom_error_1 = require("./custom-error");
class Game {
    constructor(id, name, type, rating, isFavourite = false) {
        this.id = valivalue_1.default.strings.validateNotEmpty(id, 'Game ID');
        this.name = valivalue_1.default.strings.validateMinAndMaxLength(name, 2, 64, "Name");
        this.type = valivalue_1.default.strings.validateMinAndMaxLength(type, 2, 32, "Type");
        this.rating = valivalue_1.default.numbers.validateMinAndMaxValue(rating, 0, 10, "Rating");
        this.isFavourite = isFavourite;
    }
    equals(otherGame) {
        return this.name === otherGame.name
            && this.type === otherGame.type
            && this.rating === otherGame.rating
            && this.isFavourite === otherGame.isFavourite;
    }
    toggleFavourite() {
        this.isFavourite = !this.isFavourite;
    }
    setRating(rating) {
        valivalue_1.default.numbers.validateMinAndMaxValue(rating, 0, 5, "Rating");
        this.rating = rating;
    }
    static create(json) {
        valivalue_1.default.objects.validateNotNullOrUndefined(json.name, "Name");
        valivalue_1.default.objects.validateNotNullOrUndefined(json.type, "Type");
        valivalue_1.default.objects.validateNotNullOrUndefined(json.rating, "Rating");
        return new Game((0, uuid_1.v4)(), json.name, json.type, json.rating, false);
    }
}
exports.Game = Game;
let allGames = [
    new Game((0, uuid_1.v4)(), 'Elden Ring', 'Fantasy', 4),
    new Game((0, uuid_1.v4)(), 'Horizon Forbidden West', 'Adventure', 3.5),
    new Game((0, uuid_1.v4)(), 'Pokémon Legends: Arceus', 'RPG', 3),
    new Game((0, uuid_1.v4)(), 'GTAV', 'Open World', 5)
];
const getAllGames = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (query) {
        return allGames.filter(game => {
            return game.name.toLowerCase().includes(query.toLowerCase());
        });
    }
    return allGames;
});
exports.getAllGames = getAllGames;
const getGame = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    const foundGame = allGames.find(existingGame => existingGame.id === uuid);
    if (foundGame) {
        return foundGame;
    }
    else {
        throw new custom_error_1.CustomError(404, `Game with ID '${uuid}' was not found.`);
    }
});
const add = (game) => __awaiter(void 0, void 0, void 0, function* () {
    allGames.push(game);
    return game;
});
exports.add = add;
const favourite = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    const foundGame = yield getGame(uuid);
    foundGame.toggleFavourite();
    return foundGame;
});
exports.favourite = favourite;
const setRating = (uuid, rating) => __awaiter(void 0, void 0, void 0, function* () {
    const foundGame = yield getGame(uuid);
    foundGame.setRating(rating);
    return foundGame;
});
exports.setRating = setRating;
const deleteGame = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    const foundGame = yield getGame(uuid);
    const updatedList = allGames.filter(currentGame => currentGame.id !== foundGame.id);
    allGames = updatedList;
    return foundGame;
});
exports.deleteGame = deleteGame;
const deleteAllGames = () => __awaiter(void 0, void 0, void 0, function* () {
    allGames = [];
});
exports.deleteAllGames = deleteAllGames;
const getGameByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return allGames.find(game => game.name.toLowerCase() === name.toLowerCase());
});
exports.getGameByName = getGameByName;
