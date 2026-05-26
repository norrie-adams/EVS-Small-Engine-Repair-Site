import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import formRoutes from './routes/formRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.static('public', { extensions: ['html', 'htm'] }));

// API Base Routes
app.use('/api', formRoutes); 
app.use('/', authRoutes);      

// Catch-all info route
app.get('/', (req, res) => {
    res.send("API Functions Operating");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running beautifully on port ${PORT}`);
});