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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const response_helper_1 = require("../helpers/response-helper");
const custom_error_1 = require("../model/custom-error");
const gameModel = __importStar(require("../model/game"));
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SomeSuperSecretPassword554433!';
const gameRouter = express_1.default.Router();
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
gameRouter.get('/', (req, res) => {
    (0, response_helper_1.handle)(() => {
        const { query } = req.query;
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
gameRouter.get('/name/:name', (req, res) => {
    (0, response_helper_1.handle)(() => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.params;
        const game = yield gameModel.getGameByName(name);
        return game !== null && game !== void 0 ? game : null;
    }), res);
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
gameRouter.post('/', (req, res) => {
    (0, response_helper_1.handle)(() => __awaiter(void 0, void 0, void 0, function* () {
        const game = gameModel.Game.create(req.body);
        const result = yield gameModel.add(game);
        return { name: result.name };
    }), res);
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
gameRouter.post('/:uuid/favourite', (req, res) => {
    (0, response_helper_1.handle)(() => __awaiter(void 0, void 0, void 0, function* () {
        const uuid = req.params.uuid;
        console.log(`Favouriting game with ID '${uuid}'.`);
        const favouritedGame = yield gameModel.favourite(uuid);
        return { name: favouritedGame.name };
    }), res);
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
gameRouter.post('/:uuid/rating', (req, res) => {
    (0, response_helper_1.handle)(() => __awaiter(void 0, void 0, void 0, function* () {
        const { uuid } = req.params;
        const { rating } = req.body;
        console.log(`Updating rating of game with ID '${uuid}'.`);
        const updatedGame = yield gameModel.setRating(uuid, rating);
        return { name: updatedGame.name };
    }), res);
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
gameRouter.delete('/:uuid', (req, res) => {
    (0, response_helper_1.handle)(() => __awaiter(void 0, void 0, void 0, function* () {
        const { uuid } = req.params;
        const deletedGame = yield gameModel.deleteGame(uuid);
        return { name: deletedGame.name };
    }), res);
});
gameRouter.delete('/', (req, res) => {
    (0, response_helper_1.handle)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (req.header('Authorization') === ADMIN_PASSWORD) {
            yield gameModel.deleteAllGames();
            return { status: 'ok' };
        }
        else {
            throw new custom_error_1.CustomError(403, 'Unauthorized');
        }
    }), res);
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
gameRouter.get('/filter', (req, res) => {
    (0, response_helper_1.handle)(() => __awaiter(void 0, void 0, void 0, function* () {
        const { query } = req.query;
        return gameModel.getAllGames(query);
    }), res);
});
