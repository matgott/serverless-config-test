"use strict";

module.exports.handler = async (event) => {
  const {User} = process.env.IS_OFFLINE ? require("../../utils/database/models/User") : require("../utils/database/models/User");

  let response = {statusCode: 0, body: undefined};

  try {
    await User.sync({force: false, alter: true});

    const users = await User.findAndCountAll();

    response.statusCode = 200;
    response.body = JSON.stringify(users);
  } catch (error) {
    response.statusCode = error.status || 500;
    response.body = JSON.stringify(error);
  }

  return response;
};
