const pool = require('@/db');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

module.exports = async(req, res) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(409).json({ errors: validationError.array() });
    }
    const { name, email, age, role, password } = req.body;
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    const result = await pool.query(
      `INSERT INTO ${process.env.USER_TABLE_NAME}
      (name, email, age, role, password, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING id, name, email, age, role, "createdAt", "updatedAt"`,
      [name, email, age, role || 'user', password]
    )
    const user = result.rows[0];
    const accessToken = jwt.sign({
      userId: user.id,
      email: user.email,
      role: user.role
    }, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_EXPIRES_TIME}`
    })
    res.json({...result.rows[0], accessToken});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
