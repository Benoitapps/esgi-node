const { Router } = require("express");

module.exports = function SecurityRouter(SecurityController, UserController) {
  const router = new Router();
  router.post("/login", SecurityController.login);
  router.post("/register", UserController.create);
  return router;
};
