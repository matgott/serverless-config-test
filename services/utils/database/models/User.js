const {sequelize} = require("../config");
const {DataTypes} = require("sequelize");
const sjs = require("sequelize-json-schema");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
    allowNull: false,
  },
});

const SchemaValidator = JSON.stringify(
  sjs.getModelSchema(User, {
    exclude: ["id", "createdAt", "updatedAt"],
  })
);

module.exports = {
  User,
  SchemaValidator,
};
