const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const { postId } = req.params;
    // const { userId } = req.user;
    const postResult = await pool.query(
      `SELECT p.id, p.title, p.content, p."createdAt", p."updatedAt", u.id AS "userId", u.name AS author
      FROM ${process.env.POST_TABLE_NAME} p
      JOIN ${process.env.USER_TABLE_NAME} u ON p."userId" = u.id
      WHERE p.id = $1`,
      [postId]
    )
    if (postResult.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const commentResult = await pool.query(
      `SELECT c.id, c.content, c."createdAt", c."updatedAt", u.id AS "userId", u.name AS author
      FROM ${process.env.COMMENT_TABLE_NAME} c
      JOIN ${process.env.USER_TABLE_NAME} u ON c."userId" = u.id
      WHERE c."postId" = $1`,
      [postId]
    )
    const post = postResult.rows[0];
    post.comments = commentResult.rows;
    // if (post.userId !== userId) {
    //   return res.status(403).json({ message: 'Forbidden: not your post' });
    // }
    return res.json(post);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
