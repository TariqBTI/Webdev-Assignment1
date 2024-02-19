const { body, validationResult } = require('express-validator');

const validateLogin = [
  body('username').isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
];

const validateRegister = [
  body('username').isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateLogin,
  validateRegister,
  validate
};
