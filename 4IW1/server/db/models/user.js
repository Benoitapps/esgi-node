module.exports = function (connection) {
  const { DataTypes, Model } = require("sequelize");
  const bcrypt = require("bcryptjs");
  class User extends Model {}

  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: {
        type: DataTypes.STRING,
        validate: {
          len: [8, 32],
          //is: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/i,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 32],
          //is: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/i,
        },
      },
    },
    {
      tableName: "users",
      sequelize: connection,
      //timestamps: false,
      //paranoid: true // soft delete
    }
  );

  async function hashPassword(user) {
    console.log("hashPassword");
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
  }

  User.addHook("beforeCreate", hashPassword);

  User.addHook("beforeUpdate", async (user, options) => {
    if (options.fields.includes("password")) await hashPassword(user);
  });

  return User;
};
