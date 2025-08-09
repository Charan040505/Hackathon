document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const role = 'Admin'; // Or make it dynamic if needed

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Registered successfully! Please login.');
      document.getElementById('toggleLink').click();
    } else {
      alert(data.message || 'Registration failed.');
    }
  } catch (err) {
    alert('Error connecting to server.');
  }
});
