const pool = require('@/db');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

module.exports = async(req, res) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(409).json({ errors: validationError.array() });
    }
    const { email, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const user = result.rows[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const accessToken = jwt.sign({
      userId: user.id,
      email: user.email,
      role: user.role
    }, JWT_SECRET, {
      expiresIn: `${process.env.JWT_EXPIRES_TIME}`
    })
    res.json({...result.rows[0], accessToken});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
