const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users')
    return res.status(200).json(users.rows)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
