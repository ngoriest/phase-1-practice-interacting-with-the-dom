// DOM Elements
const counter = document.getElementById('counter');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const heartBtn = document.getElementById('heart');
const pauseBtn = document.getElementById('pause');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('list');
const likesList = document.querySelector('.likes');

// App state
let count = 0;
let timer;
let isPaused = false;
let likes = {};

// Start the counter
function startCounter() {
  timer = setInterval(() => {
    count++;
    counter.textContent = count;
  }, 1000);
}

// Handle plus button click
plusBtn.addEventListener('click', () => {
  count++;
  counter.textContent = count;
});

// Handle minus button click
minusBtn.addEventListener('click', () => {
  count--;
  counter.textContent = count;
});

// Handle like button click
heartBtn.addEventListener('click', () => {
  const currentNumber = count;
  
  // Initialize like count if it doesn't exist
  likes[currentNumber] = (likes[currentNumber] || 0) + 1;
  
  // Find or create the like element
  let likeItem = document.querySelector(`[data-number="${currentNumber}"]`);
  
  if (likeItem) {
    // Update existing like count
    likeItem.textContent = `${currentNumber} has been liked ${likes[currentNumber]} time${likes[currentNumber] > 1 ? 's' : ''}`;
  } else {
    // Create new like element
    likeItem = document.createElement('li');
    likeItem.dataset.number = currentNumber;
    likeItem.textContent = `${currentNumber} has been liked 1 time`;
    likesList.appendChild(likeItem);
  }
});

// Handle pause/resume button click
pauseBtn.addEventListener('click', () => {
  if (!isPaused) {
    // Pause the counter
    clearInterval(timer);
    isPaused = true;
    pauseBtn.textContent = 'resume';
    
    // Disable all buttons except pause
    plusBtn.disabled = true;
    minusBtn.disabled = true;
    heartBtn.disabled = true;
  } else {
    // Resume the counter
    startCounter();
    isPaused = false;
    pauseBtn.textContent = 'pause';
    
    // Enable all buttons
    plusBtn.disabled = false;
    minusBtn.disabled = false;
    heartBtn.disabled = false;
  }
});

// Handle comment submission
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const commentText = commentInput.value.trim();
  
  if (commentText) {
    const commentElement = document.createElement('p');
    commentElement.textContent = commentText;
    commentsList.appendChild(commentElement);
    commentInput.value = '';
  }
});

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  startCounter();
});