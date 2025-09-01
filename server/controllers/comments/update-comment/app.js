const pool = require('@/db');
const { validationResult } = require('express-validator');

module.exports = async(req, res) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(409).json({ errors: validationError.array() });
    }
    const { commentId } = req.params;
    const { userId } = req.user;
    const commentResult = await pool.query(
      `SELECT id, "userId" FROM ${process.env.COMMENT_TABLE_NAME} WHERE id = $1`,
      [commentId]
    )
    if (commentResult.rows.length === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    const comment = commentResult.rows[0];
    if (comment.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden: not your comment' });
    }
    const fields = [];
    const values = [];
    let index = 1;
    for (let key of ['content']) {
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
    const query = `UPDATE ${process.env.COMMENT_TABLE_NAME} SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
    values.push(commentId);
    const result = await pool.query(query, values);
    return res.json(result.rows[0]);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
