document.addEventListener('DOMContentLoaded', function() {
    
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const messageText = document.getElementById('message');
 
  const signInButton = document.getElementById('signInButton');

  signInInButton.addEventListener('click', signIn);
 

  function signIn() {
    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === '' || password === '') {
        alert('Please enter your name before clocking in.');
        return;
      }

    if (username === storedUser && password === storedPass) {
        messageText.textContent = "Login successful!"
    } else {
        messageText.textContent = "Password or Username is invaild."
    }
  }

});
