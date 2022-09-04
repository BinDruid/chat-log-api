require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routers = require("./routes");
const logger = require("./middleware/logger");
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("\nConnected to Database.\n"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`\nServer is listening on ${port}\n`);
});

app.use(logger);

app.use("/api/v1/user", routers.user_route);
app.use("/api/v1/stats", routers.stats_route);
app.use("/api/v1/messages", routers.messages_route);
app.use("/api/v1/topwords", routers.top_words_route);
app.use("/api/v1/test", routers.test_route);

app.use((req, res) =>
  res.status(400).send({ message: "Invalid URL, Check documentation." })
);
