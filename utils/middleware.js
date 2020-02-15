const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { clientResponse } = require('../utils/clientResponse');

/*
 *  Check for login token on every request
 */
const verifyAuthentication = async (req, res, next) => {
  /** Don't need auth for public files */
  if (req.path.substring(0, 7) === '/public') {
    return next();
  }

  /**
   * Get token from Authorization header.
   * Header format - Authorization: Bearer [token]
   */
  if (req.get('Authorization') === undefined) {
    return clientResponse(res, 403);
  }

  const authToken = req.get('Authorization').split(' ')[1];

  /** Verify token is valid */
  try {
    const verifiedToken = await jwt.verify(authToken, process.env.SECRETKEY);
    req.token = verifiedToken;
    return next();
  } catch (error) {
    logger.error(`Verify Token Error: ${error}`);
    return clientResponse(res, 401);
  }
};

module.exports = {
  verifyAuthentication,
};
