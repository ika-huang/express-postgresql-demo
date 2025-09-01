const pool = require('@/db');
const { validationResult } = require('express-validator');

module.exports = async(req, res) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(409).json({ errors: validationError.array() });
    }
    const { userId } = req.user;
    const { title, content } = req.body;
    const result = await pool.query(
      `INSERT INTO ${process.env.POST_TABLE_NAME} ("userId", title, content, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *`,
      [userId, title, content]
    )
    return res.json(result.rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
