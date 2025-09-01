const express = require('express');
const router = express.Router();
const controllers = require('@controllers/comments/index');
const { authenticateToken, authorizeRoles } = require('@controllers/authenticate');
const { body, query } = require('express-validator');

router.post('/posts/:postId', [
  body('content').notEmpty().isString().withMessage('Content is required')
], authenticateToken, authorizeRoles(['admin', 'user']), controllers.createComment);

router.post('/fake', controllers.createFakeComment);

router.get('/posts/:postId', [
  query('limit').optional().isInt({ min: 1, max: 30 }),
  query('page').optional().isInt({ min: 1 })
], controllers.listCommentByPost);

router.get('/users/:userId', [
  query('limit').optional().isInt({ min: 1, max: 30 }),
  query('page').optional().isInt({ min: 1 })
], controllers.listCommentByUser);

router.delete('/:commentId', authenticateToken, authorizeRoles(['admin', 'user']), controllers.deleteComment);

router.put('/:commentId', [
  body('content').optional().isString(),
], authenticateToken, authorizeRoles(['admin', 'user']), controllers.updateComment);

module.exports = router;
