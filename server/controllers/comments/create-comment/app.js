const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const { userId } = req.user;
    const { postId } = req.params;
    const { content } = req.body;
    const postResult = await pool.query(
      `SELECT id FROM ${process.env.POST_TABLE_NAME} WHERE id = $1`,
      [postId]
    )
    if (postResult.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const result = await pool.query(
      `INSERT INTO ${process.env.COMMENT_TABLE_NAME} ("userId", "postId", content, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *`,
      [userId, postId, content]
    )
    return res.json(result.rows[0]);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
