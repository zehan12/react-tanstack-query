const express = require("express");
const cors = require("cors");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("database.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
    setTimeout(next, 500);
});

server.use(router);

const app = express();
app.use(server);

app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "api is working" });
});

app.listen(3000, () => {
    console.log("server is running");
});
