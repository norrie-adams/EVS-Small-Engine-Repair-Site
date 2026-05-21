/*const jwt = require("jsonwebtoken");

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = { id: 1, username: "norrie" };

    const token = jwt.sign(
        {
            userId: userid,
            username: user.username
        },
        "MY_SECRET_KEY",
        { expiresIn: "1h" }
    );

    res.json({ token });
}); */