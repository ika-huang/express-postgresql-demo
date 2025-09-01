const express = require('express');
const router = express.Router();
const controllers = require('@controllers/comments/index');
const { authenticateToken, authorizeRoles } = require('@controllers/authenticate');

router.post('/posts/:postId', authenticateToken, authorizeRoles(['admin', 'user']), controllers.createComment);

router.post('/fake', controllers.createFakeComment);

router.get('/posts/:postId', controllers.listCommentByPost);

router.get('/users/:userId', controllers.listCommentByUser);

router.delete('/:commentId', authenticateToken, authorizeRoles(['admin', 'user']), controllers.deleteComment);

router.put('/:commentId', authenticateToken, authorizeRoles(['admin', 'user']), controllers.updateComment);

module.exports = router;
