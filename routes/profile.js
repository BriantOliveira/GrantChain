/**
* GrantChain Profile Router
*/
const { Router } = require('express');
const { Organization, User } = require('../db/models')
const { respondWith } = require('../utils/clientResponse');

const router = Router();

/** Organization Profile */
router.get('/organization/:id', async (req, res) => {
  const organization = await Organization.findOne({ where: { id: req.params.id } });

  if (!organization) {
    return respondWith(res, 400, ['Organization not found'], { organization });
  }

  return respondWith(res, 200, ['Found Organization'], { organization });
});

/** User Profile */
router.get('/user/:id', async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    return respondWith(res, 400, ['User not found'], { user });
  }

  return respondWith(res, 200, ['Found User'], { user });
});


module.exports = router;