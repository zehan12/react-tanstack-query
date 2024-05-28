const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.json({ message: "api is working" });
});

app.listen(3000, () => {
    console.log("server is running");
});
