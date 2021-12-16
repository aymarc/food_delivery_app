import  {Application, Request, Response, NextFunction, json, urlencoded, raw} from "express";
import cors from "cors";


export default class Middleware{
    app: Application;
    env: string;
    apiVersion: string;
    constructor(app:Application, env:string, apiVersion:string){
        this.app = app;
        this.apiVersion = apiVersion;
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(raw());
        this.app.use(cors());
        this.env = env;
    }
    
    initilazeRoute(routeName:any):void{
        this.app.use(this.apiVersion, routeName);
    }

    report():void{
        if(this.env === "development"){
            this.app.use((req:Request, res:Response, next:NextFunction)=>{
                const requestObject = {
                    AuthToken: req.headers.authorization,
                    Url: `${req.get("HOST")}${req.originalUrl}`,
                    Method: req.method,
                    Body: req.body,
                    Params: req.params,
                    Query: req.query,
                } 
                console.info("============START====================\n");
                console.time("request-duration");
                console.info(requestObject);
                console.timeEnd("request-duration");
                console.info("============START====================\n");
                next();
            })
            
        }
    }

    catchError(){
        this.app.use((err:any, req:Request, res:Response, next:NextFunction)=>{
            if(!err){
                return next();
            }
            console.error("==================Error Start=========\n",err,
                          "==================Error End==========\n\n");
            const message = err.httpStatusCode 
                            ? {success:false, ErrorMessage:err.message} : {
                                success:false,
                                ErrorMessage:"Oops! We are so sorry; something went wrong. Kindly contact support if this persist."
                            };
            res.status(err.httpStatusCode || 500).json(message);
        })
    }

    catchRequestWithNoMatch(){
        this.app.use((req:Request, res:Response, next:NextFunction)=>{
            res.status(404).json({
                message: `Requested route ( ${req.get('HOST')}${req.originalUrl} ) not found`,
              });
        })
    }
}