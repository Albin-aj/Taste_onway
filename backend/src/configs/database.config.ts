import {connect,ConnectOptions} from "mongoose"

export const dbConnect = () => {
    connect(process.env.MONGO_URI!, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    } as ConnectOptions).then(
        ()=>console.log('mongoDb Succesfully Connected'),
        (error)=> console.log(error)
        
    )
}


// import mongoose, { ConnectOptions } from "mongoose";

// const mongoconnect  = async ()=>{
//     try {
//             const mango =  await mongoose.connect(String (process.env.MONGO_URI), {
//             useNewUrlParser:true,
//             useUnifiedTopology:true
//         } as ConnectOptions)
//         console.log(`connected ${mango.connection.host}`);
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

export default dbConnect
// export default mongoconnect
