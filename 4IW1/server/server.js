const express = require("express");
const app = express();
const genericCRUDRouter = require("./routes/genericCRUDRouter");
const UserController = require("./controllers/user");
const UserService = require("./services/user");

app.use(express.json());

app.use("/users", new genericCRUDRouter(new UserController(new UserService())));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Got a POST request");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
