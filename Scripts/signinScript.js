document.addEventListener('DOMContentLoaded', function() {
    
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const messageText = document.getElementById('message');
 
  const signInButton = document.getElementById('signInButton');
  const regisButton = document.getElementById('regiButton')

  signInButton.addEventListener('click', handleSignIn);
  regisButton.addEventListener('click', handleRegistraion);


  function handleSignIn() {
    validateSignIn();
    // remove the first two // and click sign in to add the admin as password and usernames 
  }

  function handleRegistraion() {
    saveSignIn();
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
            messageText.textContent = "Login successful! wait 3 seconds to get to main page"
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
  function saveSignIn() {
    const un = usernameInput.value.trim();
    const pw = passwordInput.value.trim();

    // checks the username and password input if its populatied
    if (un === '' || pw === '') {
      alert('Please enter your username  or password before entering the clocked-in website.');
      return;
    }

    const signInRecord = {
      username: un,
      password: pw
    };

    let records = JSON.parse(localStorage.getItem('credentials')) || [];
    records.push(signInRecord);
    localStorage.setItem('credentials', JSON.stringify(records));
  
  }

});