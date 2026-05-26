import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await pool.query(
          "SELECT * FROM admin_credentials WHERE username = $1",
          [username]
        );

        if (result.rows.length === 0) {
          return res.status(401).json({ message: "Invalid username or password "});
        }

        const admin = result.rows[0];

        const isPasswordCorrect = await bcrypt.compare(password, admin.password_hash);

        if (!isPasswordCorrect) {
          return res.status(401).json({ message: "Invalid username or password "});
        }

        const token = jwt.sign(
          { id: admin.id, username: admin.username },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        )

        res.status(200).json({ 
          message: "Login successful! Redirecting... ",
          token: token
        });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server database error "});
    }
};
