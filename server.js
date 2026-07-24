import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import formRoutes from './routes/formRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html', 'htm'] }));

// API Base Routes
app.use('/api', formRoutes);
app.use('/', authRoutes);

app.get('/status', (req, res) => {
    res.send("API Functions Operating");
});

// Allows to run locally if not on vercel
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Local development server running on http://localhost:${PORT}`);
    });
}

export default app;
