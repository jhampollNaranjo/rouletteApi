"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roulettemodel_1 = __importDefault(require("../model/roulettemodel"));
class rouletteRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getRulette(req, res) {
        roulettemodel_1.default.getRulette(req, res);
    }
    createRulette(req, res) {
        roulettemodel_1.default.CreateRulette(req, res);
    }
    OpeningRulette(req, res) {
        roulettemodel_1.default.OpeningRulette(req, res);
    }
    OpeningBet(req, res) {
        roulettemodel_1.default.OpeningBet(req, res);
    }
    closebet(req, res) {
        roulettemodel_1.default.closebet(req, res);
    }
    routes() {
        this.router.post('/add', this.createRulette);
        this.router.put('/opening/:idRoulete', this.OpeningRulette);
        this.router.post('/bet/:idRoulete', this.OpeningBet);
        this.router.get('/closebet/:id', this.closebet);
        this.router.get('/', this.getRulette);
    }
}
const rulette = new rouletteRouter();
exports.default = rulette.router;
