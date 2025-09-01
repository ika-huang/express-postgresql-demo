const express = require('express');
const router = express.Router();
const controllers = require('@controllers/posts/index');
const { authenticateToken, authorizeRoles } = require('@controllers/authenticate');
const { body, query } = require('express-validator');

router.get('/', [
  query('limit').optional().isInt({ min: 1, max: 30 }),
  query('page').optional().isInt({ min: 1 }),
  query('search').optional().isString()
], controllers.listPost);

// router.get('/users/:userId', authenticateToken, authorizeRoles(['admin', 'user']), controllers.listPostByUser);

router.get('/:postId', authenticateToken, authorizeRoles(['admin', 'user']), controllers.getPost);

router.post('/', [
  body('title').notEmpty().isString().withMessage('Title is required'),
  body('content').notEmpty().isString().withMessage('Content is required'),
], authenticateToken, authorizeRoles(['admin', 'user']), controllers.createPost);

router.post('/fake', controllers.createFakePost);

router.put('/:postId',[
  body('title').optional().isString(),
  body('content').optional().isString(),
], authenticateToken, authorizeRoles(['admin', 'user']), controllers.updatePost);

router.delete('/:postId', authenticateToken, authorizeRoles(['admin', 'user']), controllers.deletePost);

module.exports = router;