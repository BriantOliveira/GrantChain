/*
 * GrantChain - Signup Router
 */
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const userService = require('../queries/user');
const organizationService = require('../queries/organization');
const logger = require('../utils/logger');
const { clientResponse } = require('../utils/clientResponse');
const { User } = require('../db/models');

const { Op } = Sequelize;
const router = Router();

/**
 * Helper function to hash password using bcrypt.
 * @param {string} password The password to be hashed.
 */
/* eslint-disable-next-line func-names */
const hashPassword = async function(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    logger.error(`Password hashing error: ${error}`);
    return '';
  }
};


/**
 * User Signup Routes
 */
router.get('/signup', async (req, res) => {
  clientResponse(res, 200, {message: 'User Signup Page'})
});

router.post('/signup', async (req, res) => {
  try {
    /** Check if user exist already */
    const existingUser = await userService.getUserByEmail(req.body.email);

    if (existingUser) {
      return clientResponse(res, 422, {
        message: 'A user with that email already exist',
      });
    }
    /** Hash the user's password and then create a new User */
    // TODO: Needs revision
    const hash = await hashPassword(req.body.password);
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };

    const savedUser = await userService.createUser(newUser);

    /** Early exit if saving user fails */
    if (!savedUser) {
      logger.error(`User creation error: ${newUser}`);
      return clientResponse(res, 500, {
        message: 'Something went wrong trying to create the user.',
      });
    }

    // FIXME: Refresh tokens for expired tokens
    /** Success case where user is created */
    const token = jwt.sign({ _id: newUser.id }, process.env.SECRETKEY, {
      expiresIn: '60 days',
    });


    return clientResponse(res, 200, {
      message: 'User successfully created',
      data: {
        auth_token: token,
        userId: savedUser.id,
      },
    });
  } catch (error) {
    logger.error(`An unexpected error occurred during user signup: ${error}`);
    return clientResponse(res, 500);
  }
});

/**
 * User Login Routes
 */
router.get('/login', async (req, res) => {
  clientResponse(res, 200, {message: 'User Login Page'})
});

router.post('/login', async (req, res) => {
  try {
    /** Get the user to compare password */
    const user = await userService.getUserByEmail(req.body.email);

    if (!user) {
      return clientResponse(res, 400, {
        message: 'Invalid credentials, please try again',
      });
    }

    // Check if password was correct
    const passwordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    /** Early exit on non matching credentials */
    if (!passwordMatched) {
      return clientResponse(res, 400, {
        message: 'Invalid credentials, please try again',
      });
    }

    const token = jwt.sign({ _id: user.id }, process.env.SECRETKEY, {
      expiresIn: '60 days',
    });

    return clientResponse(res, 200, {
      message: 'User logged in.',
      data: {
        authToken: token,
        userId: user.id,
      },
    });
  } catch (error) {
    logger.error(`An unexpected error occurred logging in the user: ${error}`);
    return clientResponse(res, 500);
  }
});

/**
 * Organization Signup Routes
 */
router.get('/organization/signup', async (req, res) => {
  clientResponse(res, 200, {message: 'Organization Signup Page'})
});

router.post('/organization/signup', async (req, res) => {
  try {
    /** Check if Organization exist already */
    const existingOrganization = await organizationService.getOrganizationByEmail(
      req.body.email
    );
    if (existingOrganization) {
      return clientResponse(res, 422, {
        message: 'A Organization with that email already exist',
      });
    }
    /** Hash the Organization's password and then create a newOrganization */
    // TODO: Needs revision
    const hash = await hashPassword(req.body.password);
    const newOrganization = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };
    const savedOrganization = await organizationService.createOrganization(newOrganization);

    /** Early exit if saving Organization fails */
    if (!savedOrganization) {
      logger.error(`Organization creation error: ${newOrganization}`);
      return clientResponse(res, 500, {
        message: 'Something went wrong trying to create the Organization.',
      });
    }

    // FIXME: Refresh tokens for expired tokens
    /** Success case where Organization is created */
    const token = jwt.sign({ _id: newOrganization.id }, process.env.SECRETKEY, {
      expiresIn: '60 days',
    });

    return clientResponse(res, 200, {
      message: 'Organization successfully created',
      data: {
        auth_token: token,
        OrganizationId: savedOrganization.id,
      },
    });
  } catch (error) {
    logger.error(`An unexpected error occurred during Organization signup: ${error}`);
    return clientResponse(res, 500);
  }
});

/**
 * Organization Login Routes
 */
router.get('/organization/login', async (req, res) => {
  clientResponse(res, 200, {message: 'Organization Login Page'})
});

router.post('/organization/login', async (req, res) => {
  try {
    /** Get the Organization to compare password */
    const organization = await organizationService.getOrganizationByEmail(req.body.email);

    if (!organization) {
      return clientResponse(res, 400, {
        message: 'Invalid credentials, please try again',
      });
    }

    // Check if password was correct
    const passwordMatched = await bcrypt.compare(
      req.body.password,
      organization.password
    );

    /** Early exit on non matching credentials */
    if (!passwordMatched) {
      return clientResponse(res, 400, {
        message: 'Invalid credentials, please try again',
      });
    }

    const token = jwt.sign({ _id: organization.id }, process.env.SECRETKEY, {
      expiresIn: '60 days',
    });

    return clientResponse(res, 200, {
      message: 'Organization logged in.',
      data: {
        authToken: token,
        organizationrId: organization.id,
      },
    });
  } catch (error) {
    logger.error(`An unexpected error occurred logging in the Organization: ${error}`);
    return clientResponse(res, 500);
  }
});

module.exports = router;
