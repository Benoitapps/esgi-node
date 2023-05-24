const express = require("express");
const userRouter = require("./routes/user");
const app = express();

app.use((req, res, next) => {
  if (
    ["POST", "PATCH", "PUT"].includes(req.method) &&
    !req.is("application/json")
  ) {
    res.sendStatus(400);
  } else {
    next();
  }
});

app.use(express.json());

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
