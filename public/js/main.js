const loginButton = document.getElementById('login');
const logoutButton = document.getElementById('logout');

if (loginButton) {
  loginButton.addEventListener('click', () => {
    window.location.href = '/login';
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    window.location.href = '/account';
  });
}