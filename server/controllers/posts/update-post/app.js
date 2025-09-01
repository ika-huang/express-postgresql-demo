const pool = require('@/db');
const { validationResult } = require('express-validator');

module.exports = async(req, res) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(409).json({ errors: validationError.array() });
    }
    const { postId } = req.params;
    const { userId } = req.user;
    const postResult = await pool.query(
      `SELECT * FROM ${process.env.POST_TABLE_NAME} WHERE id = $1`,
      [postId]
    )
    if (postResult.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const post = postResult.rows[0];
    if (post.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden: not your post' });
    }
    const fields = [];
    const values = [];
    let index = 1;
    for (let key of ['title', 'content']) {
      if (req.body[key] !== undefined) {
        fields.push(`${key} = $${index}`);
        values.push(req.body[key]);
        index++;
      }
    }
    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    fields.push(`"updatedAt" = NOW()`);
    const query = `UPDATE ${process.env.POST_TABLE_NAME} SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
    values.push(postId);
    const result = await pool.query(query, values);
    return res.json(result.rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
