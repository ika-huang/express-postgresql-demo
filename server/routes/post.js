const express = require('express');
const router = express.Router();
const controllers = require('@controllers/posts/index');
const { authenticateToken, authorizeRoles } = require('@controllers/authenticate');

router.get('/', controllers.listPost);

// router.get('/users/:userId', authenticateToken, authorizeRoles(['admin', 'user']), controllers.listPostByUser);

router.get('/:postId', authenticateToken, authorizeRoles(['admin', 'user']), controllers.getPost);

router.post('/', authenticateToken, authorizeRoles(['admin', 'user']), controllers.createPost);

router.post('/fake', controllers.createFakePost);

router.put('/:postId', authenticateToken, authorizeRoles(['admin', 'user']), controllers.updatePost);

router.delete('/:postId', authenticateToken, authorizeRoles(['admin', 'user']), controllers.deletePost);

module.exports = router;