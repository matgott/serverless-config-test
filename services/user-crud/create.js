"use strict";

module.exports.handler = async (event) => {
  const {User} = require("../utils/database/models/User");

  let response = {statusCode: 0, body: undefined};

  try {
    await User.sync({force: false, alter: true});

    const body = JSON.parse(event.body);

    const user = await User.create(body);

    response.statusCode = 201;
    response.body = JSON.stringify(user);
  } catch (error) {
    response.statusCode = error.status || 500;
    response.body = JSON.stringify(error);
  }

  return response;
};
