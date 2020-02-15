const ulProvider = ULWeb3Provider.getDefaultProvider('mainnet');
const web3 = new Web3(ulProvider);
await ulProvider.create();
const usingUniversalLogin = web3.currentProvider && web3.currentProvider.isUniLogin;
