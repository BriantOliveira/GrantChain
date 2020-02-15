// const UniversalLoginSDK = require('../@universal-login/sdk');
import UniversalLoginSDK from '../@universal-login/sdk';
import ethers from 'ethers';


const relayerUrl = 'https://relayer.universallogin.io';
const jsonRpcUrl = 'https://ropsten.infura.io';

const universalLoginSDK = new UniversalLoginSDK(relayerUrl, jsonRpcUrl);
const ulProvider = ULWeb3Provider.getDefaultProvider('mainnet');
const web3 = new Web3(ulProvider);
const usingUniversalLogin = web3.currentProvider && web3.currentProvider.isUniLogin;


const universalLoginSDK = new UniversalLoginSDK('http://localhost:3311', 'http://localhost:18545');
const [privateKey, contractAddress] = await sdk.create('myname.mylogin.eth');
for creating a wallet in a function
await ulProvider.create();
