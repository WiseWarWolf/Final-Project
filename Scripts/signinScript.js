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

    //checks to see if theres is a local storage named credentials if not tell the user there is none
    const listData = localStorage.getItem('credentials');
    if (listData) {

        //parses items in the credentials storage
        let items;
        if (listData) {
          items = JSON.parse(listData);
        } else {
          items = [];
        }    
    
        //turns the localstorage array to independent objects
        let recordElement;
        const recentItems = items.slice();
        recentItems.forEach(record => {
          recordElement = record;
        });
    
        // checks the username and password input if its populatied
        if (un === '' || pw === '') {
            alert('Please enter your username  or password before entering the clocked-in website.');
            return;
        }
    
        // checks if the username and password input are the currect values
        if (un == recordElement.username && pw == recordElement.password ) {
            messageText.textContent = "Login successful!"
            setTimeout(() => {
                window.location.href = "clocked-in.html"
            }, 3000);
    
        } else {
            messageText.textContent = "Password or Username is invaild."
        }
    } else {
        alert("NO CREDENTIALS FOUND!!!")
    }
  }


  // this function was used to setup the username and password for the sign In page
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