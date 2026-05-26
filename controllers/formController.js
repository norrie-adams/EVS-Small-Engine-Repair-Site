import pool from '../config/db.js';

export const submitRepair = async (req, res) => {
  try {

    const { name, email, phone, machine, service, problem, image } = req.body;

    const insertQuery = `
      INSERT INTO repairs (name, email, phone, machine, service, problem, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [name, email, phone, machine, service, problem, image];

    const result = await pool.query(insertQuery, values);
    
    console.log("✅ Data successfully saved to Postgres:", result.rows[0]);
    res.json({ message: "Data saved securely to PostgreSQL!", record: result.rows[0] });

  } catch (error) {
    console.error("❌ SQL EXECUTION FAILED:", error.message);
    res.status(500).json({ message: "Failed to save data to database.", error: error.message });
  }
};

export const getAllRepairs = async (req, res) => {
  try {
    const query = 'SELECT * FROM repairs ORDER BY id DESC;';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Failed to fetch repairs:", error.message);
    res.status(500).json({ message: "Failed to fetch repairs", error: error.message });
  }
};