const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', user: result.rows[0] });
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
