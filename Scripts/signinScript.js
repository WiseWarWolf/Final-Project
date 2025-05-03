document.addEventListener('DOMContentLoaded', function() {
    
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const messageText = document.getElementById('message');
 
  const signInButton = document.getElementById('signInButton');

  signInButton.addEventListener('click', handleSignIn);

  function handleSignIn() {
    validateSignIn();
  }

  function validateSignIn() {
    const un = usernameInput.value.trim();
    const pw = passwordInput.value.trim();

    const listData = localStorage.getItem('credentials');
    let items;
    if (listData) {
      items = JSON.parse(listData);
    } else {
      items = [];
    }    

    let recordElement;
    const recentItems = items.slice();
    recentItems.forEach(record => {
      recordElement = record;
    });

    if (un === '' || pw === '') {
        alert('Please enter your username  or password before entering the clocked-in website.');
        return;
      }

    if (un == recordElement.username && pw == recordElement.password ) {
        messageText.textContent = "Login successful!"
        setTimeout(() => {
            window.location.href = "clocked-in.html"
        }, 5000);

    } else {
        messageText.textContent = "Password or Username is invaild."
    }

  }

  function saveSignIn(uname, pword) {

    const signInRecord = {
      username: uname,
      password: pword
    };

    let records = JSON.parse(localStorage.getItem('credentials')) || [];
    records.push(signInRecord);
    localStorage.setItem('credentials', JSON.stringify(records));
  
  }

});
