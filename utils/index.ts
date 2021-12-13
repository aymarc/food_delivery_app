import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken";
import {ErrorMessage, ValidationError,  AuthenticationError} from "./error";

export default class Utils{

    bodyValidator(schemaName: any){
        if (!schemaName){        
          throw new ErrorMessage("No schema suplied to validator");
        }
    
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                  const { error} =  schemaName.validate(req.body);
                  if (error) { 
                    throw new ValidationError(error.details[0].message);
                  } 
             
               next();
            } catch (err) {
              console.error("catch error ", err);
              next(err);
            }
        }
    }     
    
    paramValidator(schemaName: any){
      if (!schemaName){
        throw new ErrorMessage("No schema suplied to validator");
      }
    
      return async (req: Request, res: Response, next: NextFunction) => {
          try {
                const { error} = await schemaName.validate(req.params);
                if (error) { 
                  throw new ValidationError(error.details[0].message);
                } 
           
            next();
          } catch (err) {
            console.error("catch error ", err);
            next(err);
          }
      }
    }     
    
    
    queryValidator(schemaName: any){
      if (!schemaName){
        throw new ErrorMessage("No schema suplied to validator");
      }
      return async (req: Request, res: Response, next: NextFunction) => {
          try {
                const { error} = schemaName.validate(req.query);
                if (error) { 
                  throw new ValidationError(error.details[0].message);
                } 
           
            next();
          } catch (err) {
            console.error("catch error ", err);
            next(err);
          }
      }
    }     


    auth = (req: Request, res: Response, next: NextFunction) => {

    try {
      let authHeader = req.body.token || req.query.token || req.headers.authorization;
      let token = "";
      if (!authHeader) {
        console.error("\n Auth Error: 'No access token supplied.'");
        throw new AuthenticationError("Kindly Login to have access to this service.");
      }
  
      if(typeof authHeader !== undefined){
        token = authHeader.split(' ')[1];
      }
      ///console.log(token);
      const secret_key = process.env.APP_KEY as string;
      const decoded:any = jwt.verify(token, secret_key);
      req.headers.user = decoded;
    } catch (err) {
      console.error("\n routes.js/middleware: Auth function says 'You may have sent an invalid token.'\n");
      throw new AuthenticationError("Session expired. Kindly login again.")
    }
    return next();
  };
}