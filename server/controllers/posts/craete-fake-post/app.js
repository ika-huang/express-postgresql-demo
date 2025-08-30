const pool = require('@/db');
const { faker } = require('@faker-js/faker');

module.exports = async(req, res) => {
  try {
    const { rows: users } = await pool.query(`SELECT id FROM ${process.env.USER_DATABASE_NAME}`);
    const { id: userId } = users[Math.floor(Math.random() * users.length)];
    const result = await pool.query(
      `INSERT INTO ${process.env.POST_DATABASE_NAME} ("userId", title, content, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *`,
      [
        userId,
        faker.food.dish(),
        faker.food.description()
      ]
    )
    return res.json(result.rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
