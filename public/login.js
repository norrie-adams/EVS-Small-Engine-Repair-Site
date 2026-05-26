document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    try {

        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.style.color = 'green';
            messageElement.innerText = data.message;

            setTimeout(() => {
                window.location.href = '/admin.html';
            }, 1000);
        } else {
            messageElement.style.color = 'red';
            messageElement.innerText = data.message;
        }
    } catch (error) {
        console.error("Network error:", error);
        messageElement.innerText = "Something went wrong connecting to the server";
    }
});