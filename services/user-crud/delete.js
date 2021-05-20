"use strict";

module.exports.handler = async (event) => {
  const {User} = require("../utils/database/models/User");

  let response = {statusCode: 0, body: undefined};

  try {
    await User.sync({force: false, alter: true});

    const {id} = event.pathParameters;

    let user = await User.findByPk(id);

    if (!user) throw {status: 404, message: "User not found"};

    const deletedUser = await user.destroy();

    response.statusCode = 200;
    response.body = JSON.stringify({deleted: !!deletedUser});
  } catch (error) {
    console.error(error);
    response.statusCode = error.status || 500;
    response.body = JSON.stringify(error);
  }

  return response;
};
