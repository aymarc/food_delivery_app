import {DataTypes, Model} from "sequelize";
import db from  "../../utils/db";

enum MenuCategory{
    APERITIFS= "APERITIFS",
    ENTREES= "ENTREES",
    MAIN= "MAIN COURSE",
    DESERT= "DESERT",
}

interface menuAttributes{
    id:number;
    name:string;
    category?:MenuCategory;
    price:number;
}

export default class Menu extends Model <menuAttributes>{}

Menu.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        category:{
            type:DataTypes.ENUM,
            allowNull:true,
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false,
        }
    },
    {
        sequelize:db,
        tableName: "menu",
    }
);
