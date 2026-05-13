import express from 'express';
import pool from './db.js';
const app = express();
const PORT = 8000;

app.use(express.json());

const submissions = [];

app.use(express.static('public', { extensions: ['html', 'htm']}));

app.get('/', (req, res) => {
    res.send("API Functions");
});

app.post('/api/submit', async (req, res) => {
  try {
    // 1. Extract the incoming data fields from the request body
    const { name, email, phone, machine, service, problem, image } = req.body;

    // 2. Define your SQL query statement string
    const insertQuery = `
      INSERT INTO repairs (name, email, phone, machine, service, problem, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    // 3. FIX: Create the 'values' array inside the function so it is fully defined
    const values = [name, email, phone, machine, service, problem, image];

    // 4. Execute the query using your imported database pool
    const result = await pool.query(insertQuery, values);
    
    console.log("✅ Data successfully saved to Postgres:", result.rows[0]);
    res.json({ message: "Data saved securely to PostgreSQL!", record: result.rows[0] });

  } catch (error) {
    // Catch database syntax constraints or mapping connection errors
    console.error("❌ SQL EXECUTION FAILED:", error.message);
    res.status(500).json({ message: "Failed to save data to database.", error: error.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}); 