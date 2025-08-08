const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const { name, email, age, role, password } = req.body;

    const result = await pool.query(
      `INSERT INTO users (name, email, age, role, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email, age, role, password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
