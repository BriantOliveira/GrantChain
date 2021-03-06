require('dotenv').config()
const OSTSDK = require('@ostdotcom/ost-sdk-js');

const baseUrl = "https://api.ost.com/testnet/v2/";
const tokenUrl = "tokens";
const ostObj = new OSTSDK({
                            apiKey: process.env.api_key,
                            apiSecret: process.env.api_secret,
                            apiEndpoint: baseUrl,
                            config: {timeout: 10000}
                        });
const tokensService = ostObj.services.tokens;

tokensService.get({})
    .then(function(res) {
        console.log(JSON.stringify(res));
    })
    .catch(function(err) {
        console.log(JSON.stringify(err));
    });

const usersService = ostObj.services.users;

usersService.create({})
    .then(function(res) {
        console.log(JSON.stringify(res));
    })
    .catch(function(err) {
        console.log(JSON.stringify(err));
    });
