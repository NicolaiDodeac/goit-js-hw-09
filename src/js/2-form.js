const STORAGE_KEY = 'feedback-form-state';
let formData = { email: '', message: '' };

const feedbackFormRef = document.querySelector('.feedback-form');

// Load data from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const userData = loadFromLs(STORAGE_KEY);

  if (userData) {
    formData = userData;
    feedbackFormRef.elements.email.value = userData.email ?? '';
    feedbackFormRef.elements.message.value = userData.message ?? '';
  }
});

// Handle input event to update formData and save to local storage
feedbackFormRef.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
  saveToLs(STORAGE_KEY, formData);
});

// Handle form submission
feedbackFormRef.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  e.target.reset();
});

function saveToLs(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

function loadFromLs(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return null;
  }
}
