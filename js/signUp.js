// selecting elements from signUp file
const form = document.getElementById('form');
const myName = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const passwordToggle = document.getElementById('password-toggle');
const confirmPasswordToggle = document.getElementById('confirmPassword-toggle');

const createBtn = document.querySelector('.createBtn');
// Functions 
passwordToggle.onclick = function () {
  if(password.type == "password") {
    password.type = 'text'; 
    passwordToggle.src = 'img/eye-open.png';
  } else {
    password.type = 'password';
    passwordToggle.src = 'img/eye-close.png';
  }

}
confirmPasswordToggle.onclick = function () {
  if(confirmPassword.type == "password") {
    confirmPassword.type = 'text'; 
    confirmPasswordToggle.src = 'img/eye-open.png';
  } else {
    confirmPassword.type = 'password';
    confirmPasswordToggle.src = 'img/eye-close.png';
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
// confirm password matching 
function confirmPasswordMatching(p1, p2) {
  if(p2.value.trim() !== '') {
    if(p1.value === p2.value) {
      showSuccess(p2);
    } else {
     showError(p2, 'password do not matching');
    }
  }
  }

// getFieldName function
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// get inputs from local storage
function getInputsFromStorage() {
  let inputsData = localStorage.getItem('inputs');
  return inputsData ? JSON.parse(inputsData) : [];
}
// Clear inputs function
function clearInputs() {
  // const successInputs = document.querySelectorAll('.success');
  const errorInputs = document.querySelectorAll('.error');

  if (errorInputs.length === 0) {
    // Clear all inputs if there are no error messages
    myName.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
  } 
  }


// addAccountToStorage function
function addAccountToStorage() {
 //  Add validation for required fields here if needed...
 checkRequired([myName, email, password, confirmPassword]);
 checkLength(myName, 3, 15);
 checkLength(password,  8,  20);
 checkEmail(email);
 confirmPasswordMatching(password, confirmPassword);
 
// Check if there are any error messages displayed
const errorMessages = document.querySelectorAll('.error');
if(errorMessages.length === 0) {
  const inputs = {
    myName: myName.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
    confirmPassword: confirmPassword.value.trim()
  };

  // Add the inputs object to local storage
  let inputsFromStorage = getInputsFromStorage();
  inputsFromStorage.push(inputs);
  localStorage.setItem('inputs', JSON.stringify(inputsFromStorage));
 // After successfully storing the account details in local storage
window.location.href = "signin.html";
}
 

}

// add event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([myName, email, password, confirmPassword]);
  checkLength(myName, 3, 15);
  checkLength(password,  8,  20);
  checkEmail(email);
  confirmPasswordMatching(password, confirmPassword);
   clearInputs();
});


createBtn.addEventListener('click', addAccountToStorage);
