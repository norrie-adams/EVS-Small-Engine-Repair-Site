import express from 'express';
const app = express();
const PORT = 8000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("API Functions");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}); 