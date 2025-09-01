const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, role } = req.user;
    const commentResult = await pool.query(
      `SELECT id, "userId" FROM ${process.env.COMMENT_TABLE_NAME} WHERE id = $1`,
      [commentId]
    )
    if (commentResult.rows.length === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    const comment = commentResult.rows[0];
    if (comment.userId !== userId && role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: not your comment' });
    }
    await pool.query(
      `DELETE FROM ${process.env.COMMENT_TABLE_NAME} WHERE id = $1 RETURNING *`,
      [commentId]
    )
    return res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
