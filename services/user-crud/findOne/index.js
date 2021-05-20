"use strict";

module.exports.handler = async (event) => {
  const {User} = process.env.IS_OFFLINE ? require("../../utils/database/models/User") : require("../utils/database/models/User");

  let response = {statusCode: 0, body: undefined};

  try {
    await User.sync({force: false, alter: true});

    const {id} = event.pathParameters;

    const user = await User.findByPk(id);

    if (!user) throw {status: 404, message: "User not found"};

    response.statusCode = 200;
    response.body = JSON.stringify(user);
  } catch (error) {
    response.statusCode = error.status || 500;
    response.body = JSON.stringify(error);
  }

  return response;
};
