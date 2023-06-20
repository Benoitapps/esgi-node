const Sequelize = require("sequelize");

const connection = new Sequelize(process.env.DATABASE_URL);

connection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = connection;
