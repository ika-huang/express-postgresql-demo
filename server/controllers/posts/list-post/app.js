const pool = require('@/db');
const { validationResult } = require('express-validator');

module.exports = async(req, res) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(409).json({ errors: validationError.array() });
    }
    let { page = 1, limit = 10, search = '', userId = null } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const searchQuery = `%${search}%`;
    const offset = (page - 1) * limit;
    const result = await pool.query(
      `SELECT p.id, p.title, p.content, p."createdAt", p."updatedAt", u.id AS "userId", u.name AS author
      FROM ${process.env.POST_TABLE_NAME} p
      JOIN ${process.env.USER_TABLE_NAME} u ON p."userId" = u.id
      WHERE (p.title ILIKE $3 OR p.content ILIKE $3) AND ($4::int IS NULL OR p."userId" = $4)
      ORDER BY p."createdAt" DESC
      LIMIT $1 OFFSET $2`,
      [limit, offset, searchQuery, userId]
    )
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM ${process.env.POST_TABLE_NAME} p
      WHERE (p.title ILIKE $1 OR p.content ILIKE $1) AND ($2::int IS NULL OR p."userId" = $2)`,
      [searchQuery, userId]
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
