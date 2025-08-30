const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const { userId } = req.user;
    const { title, content } = req.body;
    const result = await pool.query(
      `INSERT INTO ${process.env.POST_DATABASE_NAME} ("userId", title, content, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *`,
      [userId, title, content]
    )
    return res.json(result.rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
