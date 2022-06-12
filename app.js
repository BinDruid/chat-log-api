require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routers = require("./routes");
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("\nConnected to Database.\n"));

app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(
    `\n**************************\nApp listening on port ${port}\n**************************\n`
  );
});

app.use("/api/v1/stats", routers.stats_route);
app.use("/api/v1/messages", routers.messages_route);
app.use("/api/v1/test", routers.test_route);
app.use("/api/v1/token", routers.token_route);

app.use((req, res) =>
  res.status(400).send({ message: "Invalid URL, Check documantition." })
);
