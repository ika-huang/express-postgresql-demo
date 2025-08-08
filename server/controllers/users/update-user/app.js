const pool = require('@/db');

module.exports = async(req, res) => {
  try {
    const { userId } = req.params;
    const fields = [];
    const values = [];
    let index = 1;
    for (let key of ['name', 'email', 'age', 'role', 'password']) {
      if (req.body[key] !== undefined) {
        fields.push(`${key} = $${index}`);
        values.push(req.body[key]);
        index++;
      }
    }
    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    fields.push(`"updatedAt" = CURRENT_TIMESTAMP`);
    // update example
    // `UPDATE users SET name = $1, email = $2, age = $3, role = $4, password = $5, updatedAt = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *`
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
    values.push(userId);
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }  
}
