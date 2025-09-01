const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    const result = await pool.query(
      `SELECT p.id, p.title, p.content, p."createdAt", p."updatedAt", u.id AS "userId", u.name AS author
      FROM ${process.env.POST_TABLE_NAME} p
      JOIN ${process.env.USER_TABLE_NAME} u ON p."userId" = u.id
      ORDER BY p."createdAt" DESC
      LIMIT $1 OFFSET $2`,
      [limit, offset]
    )
    const countResult = await pool.query(`SELECT COUNT(*) FROM ${process.env.POST_TABLE_NAME}`);
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
