const userService = require("../services/user");

module.exports = {
  getAll: async (req, res) => {
    const { page, itemsPerPage, order, ...filters } = req.query;
    try {
      const users = await userService.findAll(filters, {
        order,
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage,
      });

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userService.findOne(parseInt(id, 10));
      if (user) res.json(user);
      else res.sendStatus(404);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  create: async (req, res) => {
    const { body } = req;
    try {
      const user = await userService.create(body);
      res.status(201).json(user);
    } catch (err) {
      if (err.name === "ValidationError") {
        res.status(422).json(err.errors);
      } else {
        res.status(500).json(err);
      }
    }
  },
};
