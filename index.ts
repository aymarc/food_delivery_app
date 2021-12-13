import express from "express";
import "./utils/db";
import Middleware from "./utils/middleware";

const app = express();
const node_env = process.env.NODE_ENV as string;
const api_version = process.env.API_VERSION as string;
const middleware = new Middleware(app, node_env, api_version);

//print the request object in development
middleware.report();

//handle errors and send feedback to user
middleware.catchError();

//handle request that don't match any route:send a 404 NOT FOUND to user
middleware.catchRequestWithNoMatch();

try{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`=======Server running on port ${process.env.PORT||8000}========\n\n`);
    })
}catch(error){
    console.error(error);
    throw error;
}

export default app;