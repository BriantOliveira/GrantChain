const axios = require('axios');
const { clientResponse } = require('../utils/clientResponse');
const infuraEndPoint = "https://ipfs.infura.io:5001/api/v0/";

const headers = {
    'Content-Type': 'multipart/form-data'
};

const getUrl = axios.create({
  baseURL: infuraEndPoint + "object/data?arg=",
});

const postUrl = axios.create({
  baseURL: infuraEndPoint,
  headers: headers,
});

const IPFSPortalGet = async hash => {
    try {
      const response = await getUrl.get('' + hash);
      return response;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
};

const IPFSPortalPost = async object => {
  try {
    const response = await postUrl.post('/add?cid-version=0&hash=sha2-256', {
      file: object,
    });
    return response;
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

module.exports = IPFSPortalGet, IPFSPortalPost;
