import mongoose from "mongoose"


const dbConnect=async ()=>{

    const URL=process.env.DATABASE_URL;

    try{
        await mongoose.connect(URL);
        console.log("Db connect successfully");
    }
    catch(e){
        console.log("Error while connection with db::",e);
    }
}
export default dbConnect;