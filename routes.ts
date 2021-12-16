import User from "./modules/user";
import {Application} from "express";


const apiVersion = `/api/v1`;

export default (app:Application)=>{
    const user = new User();
    app.use(apiVersion,  user.initRoutes());
}
