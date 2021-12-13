import express from "express";
import "./utils/db";

const app = express();


try{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`=======Server running on port ${process.env.PORT||8000}========\n\n`);
    })
}catch(error){
    console.error(error);
    throw error;
}

export default app;