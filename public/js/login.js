const signupForm = document.querySelector("#signup-form")

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    console.log(email, password)
    
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json()
    console.log(result)

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  
  if ( email && password) {
    console.log(email, password)
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json()
    console.log(result)

    console.log(response)
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(result.payload);
    }
  }
};

document.querySelector('#login-form')?.addEventListener('submit', loginFormHandler);

document.querySelector('#signup-form')?.addEventListener('submit', signupFormHandler);

