require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const chatter_route = require("./routes/chatter_route");
const message_route = require("./routes/message_route");

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("\nConnected to Database.\n"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(
    `\n**************************\nApp listening on port ${port}\n**************************\n`
  );
});

app.use("/api/v1/chatters", chatter_route);
app.use("/api/v1/messages", message_route);

app.use((req, res) =>
  res.status(400).send({ message: "Invalid URL, Check documantition." })
);
