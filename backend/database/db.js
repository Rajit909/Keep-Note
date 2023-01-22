import mongoose from "mongoose";
import config from "../config/config.js";

const connectToDB = ()=> {
    mongoose.set("strictQuery", false);

    mongoose.connect(config.URI)
    .then((conn) => {
        console.log(
            console.log(`Connected DB at : ${conn.connection.host}`)
         );
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1)
    });
};

export default connectToDB;