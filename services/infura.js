const { Router } = require('express');
const logger = require('../utils/logger');
const { clientResponse } = require('../utils/clientResponse');
const iRouter = Router();
const infuraEndPoint = "mainnet.infura.io/v3/";

const IPFSPortalGet = function getObjectData(key) {
    iRouter.get(infuraEndPoint + project_id + 'object/data?arg=' + key, async (req, res) => {
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

const IPFSPortalPost = function postToIPFS(jsonObject) {
    iRouter.post(infuraEndPoint + project_id +'add?cid-version=0&hash=sha2-256&file=jsonObject', async (req, res) => {
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
