const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `SELECT c.id, c.content, c."createdAt", c."updatedAt", u.id AS "userId", u.name AS author
       FROM ${process.env.COMMENT_TABLE_NAME} c
       JOIN ${process.env.USER_TABLE_NAME} u ON c."userId" = u.id
       WHERE c."userId" = $1
       ORDER BY c."createdAt" ASC`,
      [userId]
    )
    return res.json(result.rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
