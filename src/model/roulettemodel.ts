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
    public CreateRulette(request:Request, response:Response) {
        this.dbCon.query('INSERT INTO roulette SET ?', request.body, (error, result) => {
            if (!error) {
                response.status(201).json(request.body.id);
            } else {
                response.status(500).json({ status: error.stack })
            }
        })
    }
    public OpeningRulette(request:Request, response:Response) {
        const id = request.params.idRoulete;
        const opening = 1;
        this.dbCon.query('UPDATE roulette SET ? WHERE id = ?', [{ "available": opening }, id], (error, result) => {
            if (!error) {
                response.status(201).json(`successful operation`);
            } else {
                response.status(500).json({ status: error.stack })
            }
        })
    }
    public OpeningBet(request:Request, response:Response) {
        
        const data = {
            "idRoulette": parseInt(request.params.idRoulete),
            "idUser": request.headers['iduser'],
            "amount": request.body.amount,
            "num": request.body.num,
            "color": request.body.color
        }
        this.dbCon.query('INSERT INTO bet SET ?', data, (error, result) => {
            if (!error) {
                response.status(201).json(request.body.idRoulete);
            } else {
                response.status(500).json({ status: error.stack });
            }
        })
    }
    public closebet(request:Request, response:Response){
        const idRoulette = parseInt(request.params.id);
        this.dbCon.query('SELECT * FROM roulette as r INNER JOIN bet as b ON b.idRoulette=r.id WHERE b.idRoulette=?', idRoulette, (error, result) => {
            if (!error) {
                response.status(201).json(result);
            } else {
                response.status(500).json({ status: error.stack });
            }
        })
    }
    public getRulette(request:Request, response:Response){
        this.dbCon.query('SELECT * FROM roulette', (error, result) => {
            if (!error) {
                response.status(201).json(result);
            } else {
                response.status(500).json({ status: error.stack });
            }
        })
    }
} 
const dbmodel = new model();
export default dbmodel;   