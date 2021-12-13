import {DataTypes, Model} from  "sequelize";
import db from "../../utils/db";
import Menu from "../menu/model";

interface orderAttributes{
    id: number;
}

export default class Order extends Model <orderAttributes>{}

Order.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
        }
    },
    {
        timestamps:true,
        sequelize:db,
        tableName: "order"
    }
);

Order.hasMany(Menu);