<?php
/**
 * Forgot Password Page - AI ChatBox (NovaAI)
 */
?>
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password - NovaAI</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/auth.css">
</head>
<body>

  <div class="auth-wrapper">
    <div class="auth-theme-toggle">
      <button class="theme-toggle-btn" id="theme-toggle-auth" title="Toggle Theme">
        <svg class="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg class="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
    </div>

    <div class="auth-card">
      <div class="auth-header">
        <div class="auth-logo">✦</div>
        <h1 class="auth-title">Reset your password</h1>
        <p class="auth-subtitle">Enter your email and we'll send you recovery instructions</p>
      </div>

      <div id="reset-alert" class="auth-alert success" style="display: none;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Password reset link sent! Check your inbox.</span>
      </div>

      <form class="auth-form" id="forgot-form">
        <div class="form-group">
          <label class="form-label" for="reset-email">Email Address</label>
          <div class="input-container">
            <input type="email" id="reset-email" class="auth-input" placeholder="name@example.com" required value="alex.rivera@example.com">
          </div>
        </div>

        <button type="submit" class="btn-primary-auth" id="btn-submit-reset">
          <span>Send Reset Link</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>

      <div class="auth-footer">
        Remembered your password? <a href="login.php" class="auth-link">Back to log in</a>
      </div>
    </div>
  </div>

  <script>
    const savedTheme = localStorage.getItem('ai_chat_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeBtn = document.getElementById('theme-toggle-auth');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('ai_chat_theme', next);
      });
    }

    const form = document.getElementById('forgot-form');
    const alertBox = document.getElementById('reset-alert');
    const submitBtn = document.getElementById('btn-submit-reset');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
      
      setTimeout(() => {
        alertBox.style.display = 'flex';
        submitBtn.innerHTML = 'Link Sent';
      }, 700);
    });
  </script>
</body>
</html>
