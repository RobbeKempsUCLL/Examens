"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.gameRouter = void 0;
/**
 * @swagger
 *   components:
 *    schemas:
 *      Game:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Game name.
 *            type:
 *              type: string
 *              description: Game type.
 *            rating:
 *              type: number
 *              description: Game rating.
 *            isFavourite:
 *              type: boolean
 *              description: Flag showing whether game is favourited or not.
 *
 */
var express_1 = __importDefault(require("express"));
var response_helper_1 = require("../helpers/response-helper");
var custom_error_1 = require("../model/custom-error");
var gameModel = __importStar(require("../model/game"));
var ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SomeSuperSecretPassword554433!';
var gameRouter = express_1["default"].Router();
exports.gameRouter = gameRouter;
/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get a list of all games
 *     responses:
 *       200:
 *         description: A list of games.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 */
gameRouter.get('/', function (req, res) {
    (0, response_helper_1.handle)(function () {
        var query = req.query.query;
        return gameModel.getAllGames(query);
    }, res);
});
/**
 * @swagger
 * /games/name/:name:
 *   get:
 *      summary: Get a game by it's name
 *      responses:
 *         200:
 *            description: The ID of the game
 *            content:
 *              application/json:
 *                schema:
 *                  type: string
 *                  description: ID of the found game
 */
gameRouter.get('/name/:name', function (req, res) {
    (0, response_helper_1.handle)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, game;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = req.params.name;
                    return [4 /*yield*/, gameModel.getGameByName(name)];
                case 1:
                    game = _a.sent();
                    return [2 /*return*/, game !== null && game !== void 0 ? game : null];
            }
        });
    }); }, res);
});
/**
 * @swagger
 * /games:
 *   post:
 *      summary: Add a game
 *      responses:
 *         200:
 *            description: The Name of the added game
 *            content:
 *              application/json:
 *                schema:
 *                  type: string
 *                  description: Name of the new game
 */
gameRouter.post('/', function (req, res) {
    (0, response_helper_1.handle)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var game, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    game = gameModel.Game.create(req.body);
                    return [4 /*yield*/, gameModel.add(game)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, { name: result.name }];
            }
        });
    }); }, res);
});
/**
 * @swagger
 * /games/:uuid/favourite:
 *   post:
 *      summary: Toggle the isFavourite flag of the game
 *      responses:
 *         200:
 *            description: The name of the favourited game
 *            content:
 *              application/json:
 *                schema:
 *                  type: string
 *                  description: Name of the favourited game
 */
gameRouter.post('/:uuid/favourite', function (req, res) {
    (0, response_helper_1.handle)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var uuid, favouritedGame;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uuid = req.params.uuid;
                    console.log("Favouriting game with ID '".concat(uuid, "'."));
                    return [4 /*yield*/, gameModel.favourite(uuid)];
                case 1:
                    favouritedGame = _a.sent();
                    return [2 /*return*/, { name: favouritedGame.name }];
            }
        });
    }); }, res);
});
/**
 * @swagger
 * /games/:uuid/rating:
 *   post:
 *      summary: Set the rating of the game
 *      responses:
 *         200:
 *            description: The name of the updated game
 *            content:
 *              application/json:
 *                schema:
 *                  type: string
 *                  description: Name of the updated game
 */
gameRouter.post('/:uuid/rating', function (req, res) {
    (0, response_helper_1.handle)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var uuid, rating, updatedGame;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uuid = req.params.uuid;
                    rating = req.body.rating;
                    console.log("Updating rating of game with ID '".concat(uuid, "'."));
                    return [4 /*yield*/, gameModel.setRating(uuid, rating)];
                case 1:
                    updatedGame = _a.sent();
                    return [2 /*return*/, { name: updatedGame.name }];
            }
        });
    }); }, res);
});
/**
 * @swagger
 * /games/:uuid:
 *   delete:
 *      summary: Delete a game
 *      responses:
 *         200:
 *            description: The name of the deleted game
 *            content:
 *              application/json:
 *                schema:
 *                  type: string
 *                  description: Name of the deleted game
 */
gameRouter["delete"]('/:uuid', function (req, res) {
    (0, response_helper_1.handle)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var uuid, deletedGame;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uuid = req.params.uuid;
                    return [4 /*yield*/, gameModel.deleteGame(uuid)];
                case 1:
                    deletedGame = _a.sent();
                    return [2 /*return*/, { name: deletedGame.name }];
            }
        });
    }); }, res);
});
gameRouter["delete"]('/', function (req, res) {
    (0, response_helper_1.handle)(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(req.header('Authorization') === ADMIN_PASSWORD)) return [3 /*break*/, 2];
                    return [4 /*yield*/, gameModel.deleteAllGames()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, { status: 'ok' }];
                case 2: throw new custom_error_1.CustomError(403, 'Unauthorized');
            }
        });
    }); }, res);
});
/**
 * @swagger
 * /games/filter:
 *   get:
 *      summary: Filter the list of games
 *      responses:
 *         200:
 *            description: The list of filtered games
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Game'
 */
gameRouter.get('/filter', function (req, res) {
    (0, response_helper_1.handle)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = req.query.query;
            return [2 /*return*/, gameModel.getAllGames(query)];
        });
    }); }, res);
});
