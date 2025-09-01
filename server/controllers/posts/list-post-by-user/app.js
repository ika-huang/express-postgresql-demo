const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(`
      SELECT p.id, p.title, p.content, p."createdAt", u.name AS author
      FROM ${process.env.POST_TABLE_NAME} p
      JOIN ${process.env.USER_TABLE_NAME} u ON p."userId" = u.id
      WHERE u.id = $1
    `, [userId])
    return res.json(result.rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
