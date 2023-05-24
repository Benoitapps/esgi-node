const express = require("express");
const app = express();
const GenericRouter = require("./routes/genericCRUD");
const GenericController = require("./controllers/genericCRUD");
const userService = require("./services/user-memory");

app.use(express.json());

app.use("/users", require("./routes/user"));
app.use("/users2", new GenericRouter(new GenericController(userService)));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/", (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => console.log("Server started on port 3000"));
