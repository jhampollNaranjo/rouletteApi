"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class model {
    constructor() {
        this.dbCon = this.connect();
    }
    connect() {
        const config = {
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'mydb'
        };
        return mysql_1.default.createPool(config);
    }
    CreateRulette(request, response) {
        this.dbCon.query('INSERT INTO roulette SET ?', request.body, (error, result) => {
            if (!error) {
                response.status(201).json(request.body.id);
            }
            else {
                response.status(500).json({ status: error.stack });
            }
        });
    }
    OpeningRulette(request, response) {
        const id = request.params.idRoulete;
        const opening = 1;
        this.dbCon.query('UPDATE roulette SET ? WHERE id = ?', [{ "available": opening }, id], (error, result) => {
            if (!error) {
                response.status(201).json(`successful operation`);
            }
            else {
                response.status(500).json({ status: error.stack });
            }
        });
    }
    OpeningBet(request, response) {
        const data = {
            "idRoulette": parseInt(request.params.idRoulete),
            "idUser": request.headers['iduser'],
            "amount": request.body.amount,
            "num": request.body.num,
            "color": request.body.color
        };
        this.dbCon.query('INSERT INTO bet SET ?', data, (error, result) => {
            if (!error) {
                response.status(201).json(request.body.idRoulete);
            }
            else {
                response.status(500).json({ status: error.stack });
            }
        });
    }
    closebet(request, response) {
        const idRoulette = parseInt(request.params.id);
        this.dbCon.query('SELECT * FROM roulette as r INNER JOIN bet as b ON b.idRoulette=r.id WHERE b.idRoulette=?', idRoulette, (error, result) => {
            if (!error) {
                response.status(201).json(result);
            }
            else {
                response.status(500).json({ status: error.stack });
            }
        });
    }
    getRulette(request, response) {
        this.dbCon.query('SELECT * FROM roulette', (error, result) => {
            if (!error) {
                response.status(201).json(result);
            }
            else {
                response.status(500).json({ status: error.stack });
            }
        });
    }
}
const dbmodel = new model();
exports.default = dbmodel;
