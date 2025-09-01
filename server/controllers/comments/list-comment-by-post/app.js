const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const { postId } = req.params;
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
       ORDER BY c."createdAt" ASC`,
      [postId]
    )
    return res.json(result.rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
