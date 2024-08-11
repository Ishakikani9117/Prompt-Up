import mongoose from "mongoose";

let isConnnected= false; // for tracking the connection status

export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    if(isConnnected){
        console.log('MongoDB is already connected');
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnnected = true;
        console.log('MongoDB is connected');
    } catch (error) {
        console.log(error);
    }

}