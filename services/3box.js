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
    const hash = await space.public.get(name);
    const infuraData = await Infura.IPFSPortalGet.getObjectData(hash);
    return infuraData;
};

const AllBoxData = function getAllBoxData() {
    const boxData = await space.public.all();
    let infuraDataArray;
    boxData.forEach(function(hash,index) {
        const infuraData = await Infura.IPFSPortalGet.getObjectData(hash);
        infuraDataArray.push(infuraData);
    });
    return infuraDataArray;
};

const CreateBoxData = function setBoxData(name, object) {
    const infuraData = await Infura.IPFSPortalPost.postToIPFS(object);
    const hash = infuraData.Hash;
    const infuraHash = await box.public.set(name, hash);
    return infuraHash;
};

module.exports = BoxData, AllBoxData, CreateBoxData;
