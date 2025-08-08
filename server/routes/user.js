const express = require('express');
const router = express.Router();
const controllers = require('@controllers/users/index');

router.get('/', controllers.listUser);

router.get('/:userId', controllers.getUser);

router.post('/', controllers.createUser);

router.post('/fake', controllers.createFakeUser);

router.put('/:userId', controllers.updateUser);

router.delete('/:userId', controllers.deleteUser);

module.exports = router;