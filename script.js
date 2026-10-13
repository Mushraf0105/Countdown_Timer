// ==============================================================================
// COUNTDOWN TIMER (With LocalStorage Persistence)
// ==============================================================================

// 1. LOCALSTORAGE KEYS & DEFAULT CONFIGURATION
const STORAGE_KEY_DATE = "countdown_target_date";
const STORAGE_KEY_MESSAGE = "countdown_message";

const DEFAULT_TARGET_DATE = "December 31, 2026 23:59:59";
const DEFAULT_MESSAGE = "🎉 Time's up! The countdown has ended. Happy New Year!";

// Load saved values from localStorage (if any), otherwise use defaults
const savedDateStr = localStorage.getItem(STORAGE_KEY_DATE);
const savedMessageStr = localStorage.getItem(STORAGE_KEY_MESSAGE);

let targetDate = savedDateStr && !isNaN(new Date(savedDateStr).getTime())
  ? new Date(savedDateStr)
  : new Date(DEFAULT_TARGET_DATE);

let completionMessage = savedMessageStr || DEFAULT_MESSAGE;
let timerInterval = null;

// 2. DOM Elements
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const messageEl = document.getElementById("message");
const targetDateTextEl = document.getElementById("target-date-text");
const datetimeInput = document.getElementById("datetime-input");
const messageInput = document.getElementById("message-input");
const setDateBtn = document.getElementById("set-date-btn");
const resetBtn = document.getElementById("reset-btn");

/**
 * Formats a Date object to 'YYYY-MM-DDTHH:MM' for the datetime-local input
 * @param {Date} date
 * @returns {string}
 */
function formatDateForInput(date) {
  const pad = (n) => String(n).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Pads single-digit numbers with a leading zero (e.g., 5 -> "05")
 * @param {number} time
 * @returns {string}
 */
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

/**
 * Main function: Calculates remaining time and updates the DOM every second
 */
function updateCountdown() {
  const now = new Date();
  
  // 1. Calculate the difference between two Date objects (in milliseconds)
  const difference = targetDate - now;

  // 2. Check if countdown reached zero (or has already passed)
  if (difference <= 0) {
    // Clear the interval when the countdown ends
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    // Set all digits to 00
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";

    // Show dynamic completion message
    messageEl.textContent = completionMessage;
    messageEl.classList.remove("hidden");
    return;
  }

  // 3. Convert milliseconds into days, hours, minutes, seconds
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // 4. Update the DOM elements
  daysEl.textContent = formatTime(days);
  hoursEl.textContent = formatTime(hours);
  minutesEl.textContent = formatTime(minutes);
  secondsEl.textContent = formatTime(seconds);
}

/**
 * Starts or restarts the countdown timer for a given target Date and custom message
 * @param {Date} newDate
 * @param {string} [newMessage]
 */
function startTimer(newDate, newMessage) {
  // Clear any existing active interval
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  targetDate = newDate;
  if (newMessage) {
    completionMessage = newMessage;
  }

  // Update header text
  if (targetDateTextEl) {
    targetDateTextEl.textContent = targetDate.toLocaleString();
  }

  // Hide previous completion message
  messageEl.classList.add("hidden");

  // Run update immediately to avoid 1-second delay
  updateCountdown();

  // If the target is in the future, start the 1-second interval
  if (targetDate - new Date() > 0) {
    timerInterval = setInterval(updateCountdown, 1000);
  }
}

// 3. Event Listeners for Dynamic Input & LocalStorage
if (datetimeInput) {
  // Pre-fill inputs with current active (or loaded from localStorage) values
  datetimeInput.value = formatDateForInput(targetDate);
}
if (messageInput) {
  messageInput.value = completionMessage;
}

if (setDateBtn && datetimeInput) {
  setDateBtn.addEventListener("click", () => {
    if (!datetimeInput.value) {
      alert("Please select a valid date and time!");
      return;
    }

    const userSelectedDate = new Date(datetimeInput.value);
    const customMessage = messageInput && messageInput.value.trim() 
      ? messageInput.value.trim() 
      : DEFAULT_MESSAGE;

    // Save to localStorage so it persists on page refresh
    try {
      localStorage.setItem(STORAGE_KEY_DATE, userSelectedDate.toISOString());
      localStorage.setItem(STORAGE_KEY_MESSAGE, customMessage);
    } catch (err) {
      console.warn("Could not save to localStorage:", err);
    }

    startTimer(userSelectedDate, customMessage);
  });
}

// Reset Button: Clears localStorage and restores defaults
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    try {
      localStorage.removeItem(STORAGE_KEY_DATE);
      localStorage.removeItem(STORAGE_KEY_MESSAGE);
    } catch (err) {
      console.warn("Could not clear localStorage:", err);
    }

    targetDate = new Date(DEFAULT_TARGET_DATE);
    completionMessage = DEFAULT_MESSAGE;

    if (datetimeInput) datetimeInput.value = formatDateForInput(targetDate);
    if (messageInput) messageInput.value = completionMessage;

    startTimer(targetDate, completionMessage);
  });
}

// 4. Initial Timer Start
startTimer(targetDate, completionMessage);
