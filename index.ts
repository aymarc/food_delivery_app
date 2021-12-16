import express from "express";
import RedisStore from "./utils/redis";
import db from "./utils/db";
import Middleware from "./utils/middleware";
import routes from "./routes";


const app = express();
const node_env = process.env.NODE_ENV as string;
const api_version = process.env.API_VERSION as string;
const middleware = new Middleware(app, node_env, api_version);
const redisStore = new RedisStore();

//print the request object in development
middleware.report();

routes(app);

//handle errors and send feedback to user
middleware.catchError();

//handle request that don't match any route:send a 404 NOT FOUND to user
middleware.catchRequestWithNoMatch();

(async()=>{
    try{
        await db.sync();
        await redisStore.connectRedis();
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`=======Server running on port ${process.env.PORT||8000}========\n\n`);
        })
    }catch(error){
        console.error(error);
        throw error;
    }
})();
