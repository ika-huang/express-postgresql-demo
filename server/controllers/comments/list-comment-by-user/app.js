const pool = require('@/db');
const { validationResult } = require('express-validator');

module.exports = async(req, res) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(409).json({ errors: validationError.array() });
    }
    const { userId } = req.params;
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    const result = await pool.query(
      `SELECT c.id, c.content, c."createdAt", c."updatedAt", u.id AS "userId", u.name AS author
       FROM ${process.env.COMMENT_TABLE_NAME} c
       JOIN ${process.env.USER_TABLE_NAME} u ON c."userId" = u.id
       WHERE c."userId" = $1
       ORDER BY c."createdAt" ASC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    )
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM ${process.env.COMMENT_TABLE_NAME} c
      WHERE c."userId" = $1`,
      [userId]
    );
    const total = parseInt(countResult.rows[0].count);
    return res.json({
      page,
      limit,
      total,
      data: result.rows
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
