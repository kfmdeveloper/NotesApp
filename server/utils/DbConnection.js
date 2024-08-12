const mongoose = require("mongoose")

const DbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Succesfully");

    } catch (error) {

        console.log(error);

    }
}

module.exports = DbConnection