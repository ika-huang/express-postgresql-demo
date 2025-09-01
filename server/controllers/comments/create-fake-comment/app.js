const pool = require('@/db');
const { faker } = require('@faker-js/faker');

module.exports = async(req, res) => {
  try {
    const { rows: posts } = await pool.query(`SELECT id FROM ${process.env.POST_TABLE_NAME}`);
    const { rows: users } = await pool.query(`SELECT id FROM ${process.env.USER_TABLE_NAME}`);
    const { id: postId } = posts[Math.floor(Math.random() * posts.length)];
    const { id: userId } = users[Math.floor(Math.random() * users.length)];
    const result = await pool.query(
      `INSERT INTO ${process.env.COMMENT_TABLE_NAME} ("userId", "postId", content, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *`,
      [userId, postId, faker.food.description()]
    )
    return res.json(result.rows[0]);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
