import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://xvkttfaonufaphgovbia.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a3R0ZmFvbnVmYXBoZ292YmlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MTc0NDUsImV4cCI6MjA1MDI5MzQ0NX0.3InFicUiDACm3bET4fSdy-5_h38-8XpQpd52BrYoV0gY'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get elements based on current page
let signupForm, loginForm, protectedContent, logoutButton, userInfoDiv, signupMessage, loginMessage;

if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
    loginForm = document.getElementById('login-form');
    protectedContent = document.getElementById('protected-content');
    logoutButton = document.getElementById('logout-button');
    userInfoDiv = document.getElementById('user-info');
    loginMessage = document.getElementById('login-message');
} else if (window.location.pathname.endsWith("signup.html")) {
    signupForm = document.getElementById('signup-form');
    signupMessage = document.getElementById('signup-message');
}

async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user && (window.location.pathname.endsWith("index.html") || window.location.pathname === "/")) {
        showProtectedContent(user);
    } else if (!user && (window.location.pathname.endsWith("index.html") || window.location.pathname === "/")) {
        showAuthForms();
    }
}

function showProtectedContent(user) {
    protectedContent.style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    userInfoDiv.innerHTML = `<p>User ID: ${user.id}</p><p>Email: ${user.email}</p>`;
}

function showAuthForms() {
    protectedContent.style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        signupMessage.textContent = "";

        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            signupMessage.textContent = error.message;
        } else {
            signupMessage.textContent = "Sign up successful!";
            signupMessage.classList.add('success');
            signupForm.reset();

            // Redirect after successful signup
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to login page
            }, 1500);
        }
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginMessage.textContent = "";

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            loginMessage.textContent = error.message;
        } else {
            checkAuth();
        }
    });
}

if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        await supabase.auth.signOut();
        showAuthForms();
    });
}

checkAuth();