// selecting elements from dom
const signinForm = document.getElementById('signinForm');
const email = document.getElementById('email')
const password = document.getElementById('password');
const passwordSignInToggle = document.getElementById('passwordSignIn-Toggle');
passwordSignInToggle.onclick = function () {
  if(password.type == "password") {
    password.type = 'text'; 
    passwordSignInToggle.src = 'img/eye-open.png';
  } else {
    password.type = 'password';
    passwordSignInToggle.src = 'img/eye-close.png';
  }

}
// showError function
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'control-form error';
  const small = formControl.querySelector('small');
  small.style.visibility = 'visible';
  small.innerText = message;
}

// showSucces function
// showSuccess function
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'control-form success';
  const small = formControl.querySelector('small');
  small.style.visibility = 'hidden';
}

// CheckRequired function
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    }  else {
      showSuccess(input);
    }
  });
}
// checkLength function
function checkLength(input, min, max) {
  if (input.value.trim() !== '') { // Check if input value is not empty
    if (input.value.length < min) {
      showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
      showError(input, `${getFieldName(input)} must be at most ${max} characters`);
    } else {
      showSuccess(input);
    }
  }
}
// checkEmail
function checkEmail(input) {
  if(input.value.trim() !== '') {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Invalid Email');
    }
  }
  }

// getFieldName function
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
function getAccountFromStorage() {
  let accountData = localStorage.getItem('inputs');
  return accountData ? JSON.parse(accountData) : [];
}

// Retrieve the account details from local storage
const accounts = getAccountFromStorage();


// add event listener form
signinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([email, password]);
  checkLength(password,  8,  20);
  checkEmail(email);
   // Get the entered email and password
   const enteredEmail = email.value.trim();
   const enteredPassword = password.value.trim();
 
   // Find the account with the entered email
   const matchedAccount = accounts.find(account => account.email === enteredEmail);
 
   // Check if the account exists and the entered password matches
   if (matchedAccount && matchedAccount.password === enteredPassword) {
     // Authentication successful
     // You can store the user session/token in local storage or redirect to the authenticated area of your website
 // Example: Storing the first name in session storage
    
    //  sessionStorage.setItem('firstName', matchedAccount.firstName);
 
     // Example: Storing the email in session storage
     sessionStorage.setItem('email', enteredEmail);
     // Example: Storing the first name in session storage
    
     // Redirect to the authenticated area
     window.location.href = "posts.html";
   } else {
     // Authentication failed
     // Display an error message or handle the failure case as desired
     showError(email, 'Invalid email or password');
   }
})