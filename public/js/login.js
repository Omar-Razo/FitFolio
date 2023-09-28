const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const height = document.querySelector('#user-height').value;
  const weight = document.querySelector('#user-weight').value;
  const age = document.querySelector('#user-age').value;
  const gender = document.querySelector('#gender').value;

  console.log(name, email, password, height, weight, age, gender)

  if (name && email && password && height && weight && age && gender) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, height, weight, age, gender }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);


const checkDailyLogStatus = async () => {
  const currentDate = new Date().toISOString().slice(0, 10); 
  // Get the current date in YYYY-MM-DD format
  const existingLog = await DailyLog.findOne({ where: { date_created: currentDate } });

  if (existingLog) {
    // Log already exists for the current date
    console.log('Log already exists for today');
    // You can access the existing log's attributes using existingLog.attributeName
  } else {
    // Log doesn't exist for the current date, create a new one
    const newLog = await DailyLog.create({ date_created: currentDate });
    console.log('New log created:', newLog);
  }
}