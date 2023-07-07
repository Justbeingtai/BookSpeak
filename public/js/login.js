document.addEventListener('DOMContentLoaded', () => {
  const signInButton = document.getElementById('sign-in-btn');
  const signUpButton = document.getElementById('sign-up-btn');
  const signInInfoInput = document.getElementById('username');
  const signInPasswordInput = document.getElementById('password');
  const signUpInfoInput = document.getElementById('newUser');
  const signUpPasswordInput = document.getElementById('newpassword');

  // Sign-in button click event
  signInButton.addEventListener('click', () => {
    const username = signInInfoInput.value.trim();
    const password = signInPasswordInput.value.trim();
    if (username !== '' && password !== '') {
      // Perform sign-in logic
      console.log('Sign-in:', username);
    }
  });

  // Sign-up button click event
  signUpButton.addEventListener('click', () => {
    const username = signUpInfoInput.value.trim();
    const password = signUpPasswordInput.value.trim();
    if (username !== '' && password !== '') {
      // Perform sign-up logic
      console.log('Sign-up:', username);

      // Store the userId in local storage
      const userId = ''; 
      localStorage.setItem('userId', userId);
    }
  });
});
