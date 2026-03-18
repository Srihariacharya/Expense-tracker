const express = require("express");
const app = express();

app.use(express.json());

app.get("/",(res,req) => {
    res.send("Server is running");
})

app.listen(3000, () => {
    console.log("Server is running in port 3000");
})