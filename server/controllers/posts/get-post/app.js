const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user;
    const result = await pool.query(
      `SELECT * FROM ${process.env.POST_TABLE_NAME} WHERE id = $1;`,
      [postId]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const post = result.rows[0];
    if (post.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden: not your post' });
    }
    return res.json(post);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
