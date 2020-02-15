const OSTSDK = require('@ostdotcom/ost-sdk-js');

const ostObj = new OSTSDK({
                            apiKey: api_key,
                            apiSecret: api_secret,
                            apiEndpoint: localhost:3000/,
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
