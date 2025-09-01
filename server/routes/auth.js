const express = require('express');
const router = express.Router();
const controllers = require('@controllers/auth/index');
const { body } = require('express-validator');

router.post('/login',[
  body('email').notEmpty().isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 6 chars')
], controllers.login);

router.post('/register',[
  body('email').notEmpty().isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 6 chars'),
  body('name').notEmpty().withMessage('Name is required'),
  body('age').notEmpty().isInt({ min: 0 }).withMessage('Age must be a positive number'),
  body('role').optional().isIn(['admin', 'user'])
], controllers.register);

module.exports = router;