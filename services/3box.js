const Box = require('3box');
const Infura = require('./infura.js');
const myProfile = await Box.getProfile(myAddress);
const {
  profileGraphQL, getProfile,
  getProfiles, getVerifiedAccounts
} = require('3box/lib/api');

const box = await Box.openBox(myAddress, window.ethereum, {});
const space = await box.openSpace('myApp');

const BoxData = function getBoxData(name) {
    const key = await space.public.get(name);
    const infuraData = await Infura.IPFSPortalGet.getObjectData(key);
    return infuraData;
};

const AllBoxData = function getAllBoxData() {
    const boxData = await space.public.all();
    let infuraDataArray = [];
    boxData.values(obj).forEach(function(key,index) {
        const infuraData = await Infura.IPFSPortalGet.getObjectData(key);
        infuraDataArray.push(infuraData);
    });
    return infuraDataArray;
};

const CreateBoxData = function setBoxData(jsonObject) {
    const infuraData = await Infura.IPFSPortalPost.postToIPFS(jsonObject);
    const key = infuraData;
    const infuraHash = await box.public.set(key, hash(infuraData.id));
    return infuraHash;
};

module.exports = BoxData, AllBoxData, CreateBoxData;
