// script.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from actually submitting

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    errorMessage.textContent = ""; // Clear any previous error messages

    if (username.trim() === "" || password.trim() === "") {
        errorMessage.textContent = "Please fill in all fields.";
        return;
    }

    // Basic client-side validation (Example)
    if (username.length < 3) {
      errorMessage.textContent = "Username must be at least 3 characters.";
      return;
    }

    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters.";
        return;
    }


    // Here you would typically send the data to a server for authentication
    // using fetch or AJAX. For this example, we'll just show an alert.
    alert("Login successful (Simulated). Username: " + username);

    document.getElementById('loginForm').reset();
});