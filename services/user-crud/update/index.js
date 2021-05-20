"use strict";

module.exports.handler = async (event) => {
  const {User} = process.env.IS_OFFLINE ? require("../../utils/database/models/User") : require("../utils/database/models/User");

  let response = {statusCode: 0, body: undefined};

  try {
    await User.sync({force: false, alter: true});

    const {id} = event.pathParameters;

    let user = await User.findByPk(id);
    const body = JSON.parse(event.body) || null;

    if (!user) throw {status: 404, message: "User not found"};
    if (!body) throw {status: 400, message: "No data received for updating"};

    Object.keys(body).forEach((key) => (user[key] = body[key]));
    const updatedUser = await user.save();

    response.statusCode = 201;
    response.body = JSON.stringify(updatedUser);
  } catch (error) {
    console.error(error);
    response.statusCode = error.status || 500;
    response.body = JSON.stringify(error);
  }

  return response;
};
