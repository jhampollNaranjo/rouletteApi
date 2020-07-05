import mysql from 'mysql';
import {Request, Response } from 'express';
class model {
    public dbCon :mysql.Pool;
    constructor() {
        this.dbCon = this.connect();
    }
     connect():mysql.Pool{
        const config = {
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'mydb'
        };
        return mysql.createPool(config);
    }
    CreateRulette(request:Request, response:Response) {
        this.dbCon.query('INSERT INTO roulette SET ?', request.body, (error, result) => {
            if (!error) {
                response.status(201).json(request.body.id);
            } else {
                response.status(500).json({ status: error.stack })
            }
        })
    }
    OpeningRulette(request:Request, response:Response) {
        const id = request.params.id;
        const opening = 1;
        this.dbCon.query('UPDATE roulette SET ? WHERE id = ?', [{ "available": opening }, id], (error, result) => {
            if (!error) {
                response.status(201).json(`successful operation`);
            } else {
                response.status(500).json({ status: error.stack })
            }
        })
    }
} 
const dbmodel = new model();
export default dbmodel;   