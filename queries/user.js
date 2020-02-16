const Sequelize = require('sequelize');
const { User } = require('../db/models');

const { Op } = Sequelize;

const getUserByID = async id => { 
  const user = await User.findOne({ where: { id } });

  return user;
};

const getUserByEmail = async email => {
  const user = await User.findOne({  where: { email: { [Op.like]: email } } });

  return user;
};

const createUser = async userInfo => {
  const user = await User.create(userInfo, { w: 1 });

  return user;
};

const findUserAndUpdate = async payload => {
 
  const updatedUser = await User.update(payload, { where: { id: payload.id } }, { returning: true });

  return updatedUser;
};

module.exports = { getUserByID, getUserByEmail, createUser, findUserAndUpdate };
