// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Toggle between Login and Sign Up forms
document.getElementById('go-to-signup').addEventListener('click', () => {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('go-to-login').addEventListener('click', () => {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
});

// Sign Up User
document.getElementById('signup-btn').addEventListener('click', () => {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log('User signed up:', userCredential.user);
      showLoggedInUI();
    })
    .catch(error => {
      console.error('Error during signup:', error);
    });
});

// Login User
document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log('User logged in:', userCredential.user);
      showLoggedInUI();
    })
    .catch(error => {
      console.error('Error during login:', error);
    });
});

// Logout User
document.getElementById('logout-btn').addEventListener('click', () => {
  auth.signOut().then(() => {
    console.log('User logged out');
    showLoggedOutUI();
  });
});

// Auth state listener
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('User is logged in:', user);
    showLoggedInUI();
  } else {
    console.log('No user logged in');
    showLoggedOutUI();
  }
});

// Show the UI when a user is logged in
function showLoggedInUI() {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('logout-btn').style.display = 'block';
  document.getElementById('pick-section').style.display = 'block';
  document.getElementById('leaderboard-section').style.display = 'block';
}

// Show the UI when no user is logged in
function showLoggedOutUI() {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('logout-btn').style.display = 'none';
  document.getElementById('pick-section').style.display = 'none';
  document.getElementById('leaderboard-section').style.display = 'none';
}
