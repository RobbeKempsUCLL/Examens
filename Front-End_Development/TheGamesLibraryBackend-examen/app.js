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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv = __importStar(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var bodyParser = __importStar(require("body-parser"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var games_router_1 = require("./routes/games-router");
var app = (0, express_1["default"])();
dotenv.config();
var port = process.env.APP_PORT || 3000;
var swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API for The Games Library app',
            version: '1.0.0'
        }
    },
    apis: ['./routes/*.ts']
};
var swaggerSpec = (0, swagger_jsdoc_1["default"])(swaggerOpts);
app.use((0, cors_1["default"])());
app.use(bodyParser.json());
app.use('/games', games_router_1.gameRouter);
app.get('/status', function (req, res) {
    res.json({ message: 'The Games Library is running...' });
});
app.use('/', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swaggerSpec));
app.listen(port || 3000, function () {
    console.log("Server is running on port ".concat(port, "."));
});
