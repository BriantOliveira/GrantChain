const { Router } = require('express');
const logger = require('../utils/logger');
const { clientResponse } = require('../utils/clientResponse');
const iRouter = Router();
const infuraEndPoint = "https://ipfs.infura.io:5001/api/v0/";

const IPFSPortalGet = function getObjectData(hash) {
    iRouter.get(infuraEndPoint + 'object/data?arg=' + hash, async (req, res) => {
      try {
        return clientResponse(res, 200, {
          message: 'data retrieved from IPFS',
        });
      } catch (error) {
        logger.error(`An unexpected error occurred logging in the Organization: ${error}`);
        return clientResponse(res, 500);
      }
    });
};

const IPFSPortalPost = function postToIPFS(object) {
    iRouter.post(infuraEndPoint + 'add?cid-version=0&hash=sha2-256&file=' + object, async (req, res) => {
      try {
        return clientResponse(res, 200, {
          message: 'posted to IPFS',
        });
      } catch (error) {
        logger.error(`An unexpected error occurred logging in the Organization: ${error}`);
        return clientResponse(res, 500);
      }
    });
};

module.exports = IPFSPortalGet, IPFSPortalPost;
