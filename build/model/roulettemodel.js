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
}
const dbmodel = new model();
exports.default = dbmodel;