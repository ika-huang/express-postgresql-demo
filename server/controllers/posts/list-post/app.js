const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, p.title, p.content, u.name AS author
      FROM ${process.env.POST_DATABASE_NAME} p
      JOIN ${process.env.USER_DATABASE_NAME} u ON p."userId" = u.id
      ORDER BY author, p.id;
    `)
    return res.json(result.rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
