const pool = require('@/db');
const { faker } = require('@faker-js/faker')

module.exports = async(req, res) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, age, role, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        faker.person.fullName(),
        faker.internet.email(),
        Number((Math.random() * 100).toFixed(0)),
        Math.random() < 0.5 ? 'user' : 'admin',
        faker.internet.password()
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
