import { Router, Request, Response } from 'express';
import model from '../model/roulettemodel';
class rouletteRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    public getRulette(req:Request,res:Response) { 
    }
    public createRulette(req:Request,res:Response){
        model.CreateRulette(req,res);
    }
    public OpeningRulette(req:Request,res:Response){
        model.OpeningRulette(req,res);
    }
    public OpeningBet(req:Request,res:Response){
    }
    public closebet(req:Request,res:Response){
    }
    public routes() {
        this.router.post('/add', this.createRulette);
        this.router.put('/opening/:id', this.OpeningRulette);      
    }
}
const rulette = new rouletteRouter();
export default rulette.router;