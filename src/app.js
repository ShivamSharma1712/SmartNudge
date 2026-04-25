// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors({ origin: "*" }));
// app.use(express.json());

// app.get("/", (req, res) => {
// res.send("SmartNudge API Running...");
// });

// app.use("/ai", require("./modules/ai/ai.routes"));

// module.exports = app;

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("SmartNudge API Running...");
});

module.exports = app;