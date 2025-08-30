const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user;
    const postResult = await pool.query(
      `SELECT * FROM ${process.env.POST_DATABASE_NAME} WHERE id = $1`,
      [postId]
    )
    if (postResult.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const post = postResult.rows[0];
    if (post.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden: not your post' });
    }
    const result = await pool.query(
      `DELETE FROM ${process.env.POST_DATABASE_NAME} WHERE id = $1 RETURNING *`,
      [postId]
    )
    return res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
