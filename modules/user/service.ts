import UserModel,{userAttributes, comparePassword, generateToken} from "./model";
import {ExistError, ErrorMessage, AuthenticationError} from "../../utils/error";
import RedisStore from "../../utils/redis";

const redisStore = new RedisStore();


interface updateUser{
    id:number;
    name?: string;
    email?: string;
    streetAddress?: string;
    password?: string;
}
export default class UserService{


    //create user
    async create(body:userAttributes){
        try{
            let user = await UserModel.findOne({
                where:{
                    email:body.email,
                },
                raw:true
            });
            if(user){
                throw new ExistError("Account already exist");
            }
            user = await UserModel.create(body);
            return {
                success:true,
                message: "user creaed successfully"
            }
        }catch(error){
            throw error;
        }
    }
    


    //update user 
    async update(body:updateUser, headers:any){
        try{
            const id = headers.user.id;
            let user:object|null = await UserModel.update(body,{
                where:{
                    id:body.id || id,
                }
            });
            user = await UserModel.findByPk(body.id);
            return {
                success:true,
                message: "user data update",
                data:user
            }
        }catch(error){
            throw error;
        }
    }


    //delete user
    async remove(headers:any){
        try{
            let id = headers.user.id;
            let user = await UserModel.findByPk(id);
            if(user){
                await user.destroy();
            }else{
                throw new ErrorMessage("Oops! Something went wrong. Try again later.")
            }
        }catch(error){
            throw error;
        }
    }

    //user login
    async login(email:string, password:string){
        try{
            let user:any = await UserModel.findOne({
                where:{email},
                raw:true
            });
            if(!user){
                throw new AuthenticationError("Incorrect username and or password");
            }
            let token:string = "";
            if(await comparePassword(password, user.password)){
                token = await generateToken(user.id, user.name);
                const validity = parseInt(process.env.JWT_TOKEN_VALIDITY as string);
                await redisStore.setexInRedis(token, validity, user.name);
            }else{
                throw new AuthenticationError("Incorrect username and or password");
            }

            return{
                success:true,
                message:"Login successfully",
                token
            }
        }catch(error){
            throw error;
        }
    }

    //user logout
    async logout(headers:any){
        try{
            const token = headers.authorization;
            await redisStore.delInRedis(token);
        }catch(error){
            throw error;
        }
    }
}