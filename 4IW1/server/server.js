const express = require("express");
const app = express();
const genericCRUDRouter = require("./routes/genericCRUDRouter");
const SecurityRouter = require("./routes/security");
const GenericController = require("./controllers/GenericController");
const SecurityController = require("./controllers/security");
const errorsHandler = require("./middlewares/errorsHandler");
const UserService = require("./services/user.js");
const cors = require("cors");
const checkAuth = require("./middlewares/checkAuth");

app.use(cors());
app.use(express.json());
const userService = new UserService();

app.use(
  new SecurityRouter(
    new SecurityController(userService),
    new GenericController(userService)
  )
);

app.use(
  "/users",
  checkAuth,
  new genericCRUDRouter(new GenericController(userService))
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Got a POST request");
});

app.use(errorsHandler);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
