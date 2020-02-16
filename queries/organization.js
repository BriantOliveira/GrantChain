const Sequelize = require('sequelize');
const { Organization } = require('../db/models');

const { Op } = Sequelize;

const getOrganizationByID = async id => {
  const organization = await Organization.findOne({ where: { id } });

  return organization;
};

const getOrganizationByEmail = async email => {
  const organization = await Organization.findOne({  where: { email: { [Op.like]: email } } });

  return organization;
};

const createOrganization = async userInfo => {
  const organization = await Organization.create(userInfo, { w: 1 });

  return organization;
};

const findOrganizationAndUpdate = async payload => {
 
  const updatedOrganization = await Organization.update(payload, { where: { id: payload.id } }, { returning: true });

  return updatedOrganization;
};

module.exports = { getOrganizationByID, getOrganizationByEmail, createOrganization, findOrganizationAndUpdate };
