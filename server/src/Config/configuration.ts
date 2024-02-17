
export default () => ({
    port: +process.env.PORT,
    client:process.env.CLIENT,
    defaultLimit:process.env.DEFAULT_LIMIT, 
    mongo:{
        url:process.env.MONGO_URL,
        username:process.env.MONGO_USERNAME,
        password:process.env.MONGO_PASSWORD
    }
    
  });