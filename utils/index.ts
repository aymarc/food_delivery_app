import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken";
import RedisStore from './redis';
import {ErrorMessage, ValidationError,  AuthenticationError} from "./error";

const redisStore = new RedisStore();
/**
 * validation functions to validate respectively
 * body, params, and query for a given request. 
 * Expection a Joi.Schema using joi package. Returns an errror
 * if validation fails. If not run the next process in the middleware
 * chain.
 * 
 * Auth function to check for authentication token. Also checks for session 
 * and determine whether user has an active session or not using Redis Store
 */

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


    async auth (req: Request, res: Response, next: NextFunction){
      
        try {
          let authHeader = req.body.token || req.query.token || req.headers.authorization;
          let token = "";

          //check authorization token. If none throw Authentication exception
          if (!authHeader) {
            console.error("\n Auth Error: 'No access token supplied.'");
            throw new AuthenticationError("Kindly Login to proceed.");
          }
          
          //retrieve token from bearer token
          if(typeof authHeader !== undefined){
            token = authHeader.split(' ')[1];
          }
          
          //decode token and verify if valid
          const secret_key = process.env.APP_KEY as string;
          let decoded:any = "";
          let isNotDecoded = false;
          jwt.verify(token, secret_key, (err, data)=>{
              if(err){
                isNotDecoded = true;
              }
              decoded = data;
          });
          if(isNotDecoded){
            throw new AuthenticationError("Kindly Login to proceed.");
          }
          //if token valid, check if token has a valid session. If not throw Authentication exception
           
         
          let activeSessionOwner = await redisStore.getInRedis(token);
          if(activeSessionOwner){
            throw new AuthenticationError("Kindly Login to proceed.");
          };
         console.log(decoded, "\n owner", activeSessionOwner)
          //if session exist verify ownwer's name is retrieve successfully. If not throw Authentication exception
          if(activeSessionOwner !== decoded.name){
            throw new AuthenticationError("Kindly Login to proceed.");
          }
          req.headers.user = decoded;
          
        } catch (err) {
          return next(err);
        }
        return next();
  };
}