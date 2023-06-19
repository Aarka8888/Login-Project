const form = document.getElementById('form');
const imgUrl = document.getElementById('imgUrl');
const title = document.getElementById('title');
const article = document.getElementById('article');
const addPost = document.querySelector('.addPost');
const posts = document.getElementById('posts');

// showError message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'control-form error';
  const small = formControl.querySelector('small');
  small.style.visibility = 'visible';
  small.innerText = message;
}

// showSuccess message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'control-form success';
  const small = formControl.querySelector('small');
  small.style.visibility = 'hidden';
}

// checkRequired function will check if the field is empty
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// getFieldName and change the first letter to upperCase
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// add post function
function createPost(imgUrl, title, article) {
  // Check if there are any error messages displayed
  const errorMessages = document.querySelectorAll('.error');
  if (errorMessages.length === 0) {
      const postElement = document.createElement('div');
      postElement.className = 'post';
      postElement.innerHTML  += `
        <img class="post-img" src="${imgUrl}" alt="please insert the correct url">
        <h1 class="title">${title}</h1>
        <p class="post-text">${article}</p>
        <button class="delete">Delete</button>
      `;
      posts.appendChild(postElement);
  }
}

// Clear inputs function
function clearInputs() {
  imgUrl.value = '';
  title.value = '';
  article.value = '';
}

// checking image url function
function checkImageUrl(imgUrl) {
  if (imgUrl.value.trim() !== '') {
    if (!imgUrl.value.trim().startsWith('https://')) {
      showError(imgUrl, `${getFieldName(imgUrl)} must start with 'https://'`);
    } else {
      showSuccess(imgUrl);
    }
  }
}

// get inputs from local storage
function getInputsFromStorage() {
  let inputsData = localStorage.getItem('inputs');
  return inputsData ? JSON.parse(inputsData) : [];
}

// Add posts to local storage
function addPostsToLocalStorage(newPost) {
  // Add validation for each input
  checkRequired([imgUrl, title, article]);
  checkImageUrl(imgUrl);

  // Check if there are any error messages displayed
  const errorMessages = document.querySelectorAll('.error');
  if (errorMessages.length === 0) {
    //  add inputs object to local storage
    const postsFromStorage = getInputsFromStorage();
    postsFromStorage.push(newPost);

    // convert object to string to store the inputs to local storage
    localStorage.setItem('inputs', JSON.stringify(postsFromStorage));

    // Clear inputs after successful submission
    clearInputs();

    // Create the post on the page
    createPost(newPost.imgUrl, newPost.title, newPost.article);
  }
}

// Load posts from local storage
function loadPosts() {
  const postsFromStorage = getInputsFromStorage();
  postsFromStorage.forEach((post) => {
    createPost(post.imgUrl, post.title, post.article);
  });
}


// Call loadPosts when the page loads
window.addEventListener('load', loadPosts);

// add event listener to the form upon submitting to execute the invoked functions
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([imgUrl, title, article]);
  checkImageUrl(imgUrl);

  // Add the post to local storage and create it on the page
  const newPost = {
    imgUrl: imgUrl.value.trim(),
    title: title.value.trim(),
    article: article.value.trim(),
  };
  addPostsToLocalStorage(newPost);
});

// Retrieve the email from session storage
const email = sessionStorage.getItem('email');

// Display the modified email if it exists
if (email) {
  const emailWithoutDomain = email.split('@')[0];
  const greetingElement = document.createElement('p');
  greetingElement.innerText = `${emailWithoutDomain}, you have successfully logged in`;
  document.getElementById('login-message').prepend(greetingElement);

  // Show the logout icon
  const logoutIcon = document.getElementById('logout-icon');
  logoutIcon.style.display = 'block';
}
