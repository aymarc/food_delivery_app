import { createClient } from 'redis';

export default class RedisStore{
    private readonly client = createClient();
    
    constructor(){
      this.client.on('error', (err:any) => {
        console.error("=======Redis Error====",err, "======Redis Error End======");
      });
    }
    async connectRedis(){
        
        await this.client.connect();
        await this.client.set('started', 'true');
        const hasRedisStarted = await this.client.get('started');
        if(hasRedisStarted === "true"){
            console.info("=========Redis Server Is Ready==============")
        }
        await this.client.disconnect();
    }
  
    async setInRedis(key:string, value:string){
        await this.client.connect();
        await this.client.set(key, value);
        await this.client.disconnect();
    }

    async setexInRedis(key:string, expiry:number, value:string){
      await this.client.connect();
      await this.client.set(key, value);
      await this.client.expire(key,expiry);
      await this.client.disconnect();
    }

    async getInRedis(key:string,){
        await this.client.connect();
        const data = await this.client.get(key);
        await this.client.disconnect();
        return data; 
    }

    async delInRedis(key:string,){
      await this.client.connect();
      const data = await this.client.del(key);
      await this.client.disconnect();
    }


}