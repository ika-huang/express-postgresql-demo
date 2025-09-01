const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    const { postId } = req.params;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    const postResult = await pool.query(
      `SELECT id FROM ${process.env.POST_TABLE_NAME} WHERE id = $1`,
      [postId]
    )
    if (postResult.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const result = await pool.query(
      `SELECT c.id, c.content, c."createdAt", c."updatedAt", u.id AS "userId", u.name AS author
       FROM ${process.env.COMMENT_TABLE_NAME} c
       JOIN ${process.env.USER_TABLE_NAME} u ON c."userId" = u.id
       WHERE c."postId" = $1
       ORDER BY c."createdAt" ASC
       LIMIT $2 OFFSET $3`,
      [postId, limit, offset]
    )
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM ${process.env.COMMENT_TABLE_NAME} c
      WHERE c."postId" = $1`,
      [postId]
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
