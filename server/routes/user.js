const express = require('express');
const router = express.Router();
const controllers = require('@controllers/users/index');

router.get('/', controllers.listUser);

router.post('/', controllers.createUser);

module.exports = router;