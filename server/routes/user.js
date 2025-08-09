const express = require('express');
const router = express.Router();
const controllers = require('@controllers/users/index');
const { authenticateToken, authorizeRoles } = require('@controllers/authenticate');

router.get('/', controllers.listUser);

router.get('/:userId', authenticateToken, authorizeRoles(['admin', 'user']), controllers.getUser);

router.post('/', controllers.createUser);

router.post('/fake', controllers.createFakeUser);

router.put('/:userId', authenticateToken, authorizeRoles(['admin', 'user']), controllers.updateUser);

router.delete('/:userId', authenticateToken, authorizeRoles(['admin']), controllers.deleteUser);

module.exports = router;