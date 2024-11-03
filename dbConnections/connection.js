const mongoose = require("mongoose");

const dbConnection = process.env.CONNECTION_STRING
mongoose.connect(dbConnection).then(res => {
    console.log("MongoDB Atlas Connected successfully with testServer");

}).catch(err => {
    console.log("Connection failed");
    console.log(err);
})
