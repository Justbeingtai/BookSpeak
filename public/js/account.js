document.addEventListener('DOMContentLoaded', () => {
    const signOutButton = document.getElementById('signOut-btn');
    const deleteButton = document.getElementById('delete-btn');
  
    // Sign Out button click event
    signOutButton.addEventListener('click', () => {
      // Perform sign out logic here
      console.log('Sign Out clicked');
    });
  
    // Delete Account button click event
    deleteButton.addEventListener('click', () => {
      // Perform delete account logic here
      console.log('Delete Account clicked');
    });
  });
  