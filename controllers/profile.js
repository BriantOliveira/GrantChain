const userService = require('../queries/user');
const organizationService = require('../queries/organization');
const { clientResponse } = require('../utils/clientResponse');
const logger = require('../utils/logger');


/** Update Collaborator Profile */
const updateUserProfile = async (req, res) => {
  try {
    const user = await userService.getUserByID(req.body.id)

    // TODO: Need to add some validation here for the body
    const payload = {
      id: req.body.id,
      name: req.body.name || user.name,
      location: req.body.location || user.location,
      phoneNumber: req.body.phoneNumber || user.phoneNumber,
      interests: req.body.interests || user.interests,
      schoolName: req.body.schoolName || user.schoolName,
      degree: req.body.degree || user.degree,
      bio: req.body.bio || user.bio,
    }

    const userProfile = await userService.findUserAndUpdate(payload)
    
    if (!userProfile) {
      return clientResponse(res, 400, ['User not found.']);
    }
  
    const result = {
      id: user.dataValues.id,
      name: user.dataValues.name,
      email: user.dataValues.email,
      location: user.dataValues.location,
      phoneNumber: user.dataValues.phoneNumber,
      interests: user.dataValues.interests,
      schoolName: user.dataValues.schoolName,
      degree: user.dataValues.degree,
      bio: user.dataValues.bio,
      };
    return clientResponse(res, 200, { message: 'User Updated Successfully.',
      data: { result },
    });
  } catch (error) {
    logger.error(`An unexpected error has occurred: ${error}`);
    return clientResponse(res, 500, error);
  }
};



/** Update Organization Profile */
const updateOrganizationProfile = async (req, res) => {
  try {
    const organization = await organizationService.getOrganizationByID(req.body.id)

    // TODO: Need to add some validation here for the body
    const payload = {
      id: req.body.id,
      name: req.body.name || organization.name,
      location: req.body.location || organization.location,
      phoneNumber: req.body.phoneNumber || organization.phoneNumber,
      category: req.body.category || organization.category,
      missionStatement: req.body.missionStatement || organization.missionStatement,
      bio: req.body.bio || organization.bio,
    }

    const OrganizationProfile = await organizationService.findOrganizationAndUpdate(payload)
    
    if (!OrganizationProfile) {
      return clientResponse(res, 400, ['User not found.']);
    }

    const result = {
      id: organization.dataValues.id,
      name: organization.dataValues.name,
      email: organization.dataValues.email,
      location: organization.dataValues.location,
      phoneNumber: organization.dataValues.phoneNumber,
      category: organization.dataValues.category,
      missionStatement: organization.dataValues.missionStatement,
      bio: organization.dataValues.bio,
    };
    return clientResponse(res, 200, { message: 'Organization Updated Successfully.',
      data: { result },
    });
  } catch (error) {
    logger.error(`An unexpected error has occurred: ${error}`);
    return clientResponse(res, 500, error);
  }
};

module.exports = { updateUserProfile, updateOrganizationProfile };