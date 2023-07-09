 const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Input values from the login form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && password) {
      // Send a POST request to the login endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/account');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the signup form
    const username = document.querySelector('#newUser').value.trim();
    const password = document.querySelector('#newpassword').value.trim();
  
    if (username && password) {
      // Send a POST request to the signup endpoint
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/account');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document.querySelector('#sign-in-enter-btn').addEventListener('click', loginFormHandler);
  document.querySelector('#sign-up-enter-btn').addEventListener('click', signupFormHandler);
  

