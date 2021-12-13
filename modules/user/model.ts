import {hashSync, compare, genSalt, hash} from "bcryptjs";
import { DataTypes, Model } from "sequelize";
import db from "../../utils/db";
import Order from "../order/model";

interface userAttributes{
    id: number;
    email: string;
    streetAddress: string;
    password: string;
}

export default class User extends Model <userAttributes>{}

User.init(
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
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

User.hasMany(Order);

export const comparePassword = async (password:string,hashedPassword:string)=>{
    try{
        return await compare(password, hashedPassword);
    }catch(error){
        console.error(error);
        throw error;
    }
}