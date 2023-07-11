module.exports = function SecurityController(UserService) {
  const UnauthorizedError = require("../errors/UnauthorizedError");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  return {
    login: async (req, res, next) => {
      const [user] = await UserService.findAll({
        email: req.body.email,
      });

      if (!user) {
        return next(new UnauthorizedError());
      }

      //test password
      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return next(new UnauthorizedError());
      }

      //create token
      res.json({
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
      });
    },
  };
};
