import {Router, Request, Response, NextFunction} from "express";
import Validation from "./validation";
import Service from "./service";
import Utils from "../../utils";

const validation = new Validation();
const service = new Service();
const utils = new Utils();


const router = Router();

export default class User{
    private readonly routes;
    
    constructor(){
        this.routes = router;
    }

    initRoutes(){
        this.routes.post("/user",
                utils.bodyValidator(validation.create()),
                async (req:Request, res:Response, next:NextFunction)=>{
                    try{
                        res.status(201).json( await service.create(req.body));
                    }catch(error){
                        next(error);
                    }
                });
        
        this.routes.delete("/user", 
                utils.auth,
                async (req:Request, res:Response, next:NextFunction)=>{
                    try{
                        res.status(204).json(await service.remove(req.headers));
                    }catch(error){
                        next(error);
                    }
                });

        this.routes.patch("/user",
                utils.auth,
                utils.bodyValidator(validation.update()),
                async (req:Request, res:Response, next:NextFunction) =>{
                    try{
                        res.status(200).json( await service.update(req.body, req.headers));
                    }catch(error){
                        next(error);
                    }
                });

        this.routes.post("/user/login",
                utils.bodyValidator(validation.login()),
                async (req:Request, res:Response, next:NextFunction) =>{
                    try{
                        res.status(200).json(await service.login(req.body.email, req.body.password));
                    }catch(error){
                        next(error);
                    }
                });

        this.routes.post("./user/logout",
                utils.auth,
                async (req:Request, res:Response, next:NextFunction) =>{
                    try{
                        res.status(200).json(await service.logout(req.headers));
                    }catch(error){
                        next(error);
                    }
                });
        
        return this.routes;
    } 

    
}