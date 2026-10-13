# Countdown Timer

A simple, modern countdown timer built with **HTML5**, **CSS3**, and **JavaScript** for the Veda Technology assessment.

---

## 📌 Approach
- **Vanilla Tech Stack:** Built with pure HTML5, CSS3, and JavaScript with no external dependencies.
- **Date Math:** Uses JavaScript `Date` objects to calculate the time difference in milliseconds and converts them into days, hours, minutes, and seconds.
- **Timing Lifecycle:** Runs via `setInterval(..., 1000)` and clears the timer with `clearInterval()` when time reaches zero.
- **Edge-Case Handling:** If the target date has already passed, the timer stops immediately, displays `00`, and shows the completion message.

---

## 🎯 Outcome
- ✅ **Real-Time Display:** Digits update every second smoothly.
- ✅ **Configurable Date:** Target date can be changed directly in `script.js` or via the UI.
- ✅ **Dynamic User Input:** Users can pick and set any custom target date and time directly from the input field.
- ✅ **Dynamic Custom Message:** Users can customize the completion message displayed when the timer reaches zero.
- ✅ **LocalStorage Persistence:** Saved date and message persist across page refreshes (with a one-click "Reset" button to restore defaults).
- ✅ **Zero State:** Displays the custom message (default: `"🎉 Time's up! The countdown has ended. Happy New Year!"`) when reaching zero.
- ✅ **Responsive Design:** Works cleanly on both mobile and desktop screens.

---

## 🚀 Deployment Configuration

### Local Run
Open `index.html` directly in your browser, or run a local server:
```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx serve .
```

### Hosting (GitHub Pages / Vercel / Netlify)
- **GitHub Pages:** Go to repository **Settings > Pages** and select `main` branch `/root`.
- **Vercel / Netlify:** Import the repository as a static site (Publish directory: `.`).

---

## 🔄 Rollback Evidence

If an issue occurs in production, rollback using Git:
```bash
# 1. View recent commits
git log --oneline -n 5

# 2. Revert the last commit
git revert HEAD --no-edit
git push origin main
```
**Verification Check:**
- Run `node -c script.js` to ensure zero syntax errors.
- Open `index.html` to confirm digits count down properly.

---

## 🧮 Date Math & Configuration

### 1. Configure Target Date ([script.js](file:///c:/Users/pa740/OneDrive/Desktop/Veda-Technology/Countdown_Timer/script.js#L3))
```javascript
const targetDate = new Date("December 31, 2026 23:59:59");
```

### 2. Time Conversion Formula
```javascript
const difference = targetDate - new Date(); // milliseconds

const days = Math.floor(difference / (1000 * 60 * 60 * 24));
const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((difference % (1000 * 60)) / 1000);
```

---

## 💬 Interview Questions & Answers

### 1. How do you calculate the time difference between two dates?
Subtract the current date from the target date (`targetDate - now`). In JavaScript, this converts both dates to milliseconds. Then divide by time constants (1000 ms/s, 60 s/m, 60 m/h, 24 h/d) and use `Math.floor()` and `%` (modulo) to get days, hours, minutes, and seconds.

### 2. Why should an interval be cleared when it is no longer needed?
Because `setInterval` keeps running in the browser event loop. Clearing it with `clearInterval()` prevents **memory leaks**, stops unnecessary **CPU/battery usage**, and prevents displaying **negative numbers**.

### 3. How would you handle a countdown that has already passed?
Check `if (difference <= 0)`. If true, immediately call `clearInterval()`, set the display to `00`, and show a completion message.
