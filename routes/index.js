/*
  Purpose:
    - This is where we will route requests to controllers, which ideally is a 1:1 relationship
    - Should contain absolutely no business logic or complexity
    - Each route should represent an endpoint for the API
    - Example: Routes a /todo/:id request to the todo.getTodo controller, etc
*/

const express = require('express');
const contract = require('../controllers/contract');
const profile = require('../controllers/profile');

const router = express.Router();

/*
* Organization Profile Routes
*/
router.patch('/organization/update', profile.updateOrganizationProfile);


/*
* User Profile Routes
*/
router.patch('/user/update', profile.updateUserProfile);


/*
* Contracts Routes 
*/
router.post('/contract/new',  contract.newContract);
router.get('/contract', contract.getContracts);
router.get('/contract/:id', contract.getContractByID);
router.get('/contract/:collaboratorsId', contract.getContractByUserID);
router.get('/contract/:organizationId', contract.getContractByOrganizationID);
router.delete('/contract/:id', contract.deleteContractInstance);

module.exports = router;