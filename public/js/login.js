 const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Input values from the login form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && password) {
      // Send a POST request to the login endpoint
      const response = await fetch('/api/users/login', {
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
      const response = await fetch('/api/users', {
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
  

// document.addEventListener('DOMContentLoaded', () => {
//   const signInButton = document.getElementById('sign-in-enter-btn');
//   const signUpButton = document.getElementById('sign-up-enter-btn');
//   const signInInfoInput = document.getElementById('username');
//   const signInPasswordInput = document.getElementById('password');
//   const signUpInfoInput = document.getElementById('newUser');
//   const signUpPasswordInput = document.getElementById('newpassword');

  //   // Sign-in button click event
//   signInButton.addEventListener('click', () => {
//     const username = signInInfoInput.value.trim();
//     const password = signInPasswordInput.value.trim();
//     if (username !== '' && password !== '') {
//       // Perform sign-in logic
//       console.log('Sign-in:', username);
//         // Clear input fields
//         signInInfoInput.value = '';
//         signInPasswordInput.value = '';
//     }
//   });

//   // Sign-up button click event
//   signUpButton.addEventListener('click', () => {
//     const username = signUpInfoInput.value.trim();
//     const password = signUpPasswordInput.value.trim();
//     if (username !== '' && password !== '') {
//       // Perform sign-up logic
//       console.log('Sign-up:', username);

//  // Clear input fields
//       signUpInfoInput.value = '';
//       signUpPasswordInput.value = '';

//       // Store the userId in local storage
//       const userId = ''; 
//       localStorage.setItem('userId', userId);
//     }
//   });
// });
