import express from 'express';
const app = express();
const PORT = 8000;

app.use(express.json());

const submissions = [];

app.use(express.static('public', { extensions: ['html', 'htm']}));

app.get('/', (req, res) => {
    res.send("API Functions");
});

app.post('/api/submit', (req, res) => {
    const {name, email, tel, machine, service, problem_dec, img} = req.body;

    const newRecord = { id: Date.now(), name, email, tel, machine, service, problem_dec, img };
    submissions.push(newRecord);

    console.log("Updated Submissions List:", submissions)

    res.json({
        message: "Data recived successfully!",
        currentCount: submissions.length
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}); 