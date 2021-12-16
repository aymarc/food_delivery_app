import {hashSync, compare, genSalt, hash} from "bcryptjs";
import { DataTypes, Model } from "sequelize";
import db from "../../utils/db";
import Order from "../order/model";
import jwt from "jsonwebtoken";


export interface userAttributes{
    id: number;
    name: string;
    email: string;
    streetAddress: string;
    password: string;
}

export default class UserModel extends Model <userAttributes>{}

UserModel.init(
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    streetAddress:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(this:any, val:string):string{
            return this.setDataValue("password", hashSync(val));
        }
    }
},
{
    timestamps: true,
    sequelize: db,
    tableName: "user",
});

UserModel.hasMany(Order);

export const comparePassword = async (password:string,hashedPassword:string)=>{
    try{
        return await compare(password, hashedPassword);
    }catch(error){
        console.error(error);
        throw error;
    }
}

const secret_key = process.env.APP_KEY as string;
const token_validity = process.env.JWT_TOKEN_VALIDITY as string;
export const generateToken = async (id:number, name:string) => {
    return  jwt.sign({id, name},
      secret_key,
      { expiresIn: '24h'}
    );
  };