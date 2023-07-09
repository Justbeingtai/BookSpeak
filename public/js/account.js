const signOutButton = document.getElementById('signOut-btn');
const deleteButton = document.getElementById('delete-btn');

// Sign Out button click event
signOutButton.addEventListener('click', async (event) => {
  event.preventDefault();

  try {
    // Send a POST request to the logout endpoint
    const response = await fetch('/api/users/logout', {
      method: 'POST',
    });

    if (response.ok) {
      // If successful, redirect the browser to the login page
      document.location.replace('/login');
    } else {
      alert('Failed to sign out.');
    }
  } catch (err) {
    console.log(err);
    alert('Failed to sign out.');
  }
});

// Delete Account button click event
deleteButton.addEventListener('click', async (event) => {
  event.preventDefault();

  try {
    // Send a DELETE request to the delete account endpoint
    const response = await fetch('/api/users', {
      method: 'DELETE',
    });

    if (response.ok) {
      // If successful, redirect the browser to the login page
      document.location.replace('/login');
    } else {
      alert('Failed to delete account.');
    }
  } catch (err) {
    console.log(err);
    alert('Failed to delete account.');
  }
});
