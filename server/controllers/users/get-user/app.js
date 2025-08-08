const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
