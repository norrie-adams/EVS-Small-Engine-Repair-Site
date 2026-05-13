console.log("Script.js has loaded successfully!");

const form = document.querySelector('form'); 

if (!form) {
  console.error("CRITICAL ERROR: JS cannot find your <form> element!");
}

form.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  console.log("Form submit event captured! The page should NOT jump now.");

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('tel').value,
    machine: document.getElementById('machine').value,
    service: document.getElementById('service').value,
    problem: document.getElementById('problem_dec').value,
    image: document.getElementById('img').value
  };

  console.log("Form Data captured successfully:", formData);

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    console.log("Server response received:", result);
    alert("Form submitted successfully!");
    form.reset();

  } catch (error) {
    console.error("Error connecting to the Express server:", error);
  }
});
