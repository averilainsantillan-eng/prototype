<?php
/**
 * AI ChatBox - Frontend Application Template
 * Designed for full-stack integration with PHP, Python & MySQL
 */
session_start();

// Require login first
if (!isset($_SESSION['user_logged_in']) || $_SESSION['user_logged_in'] !== true) {
    header("Location: login.php");
    exit;
}

$pageTitle = "NovaAI - ChatGPT & Character.AI Studio";
$appName = "NovaAI";
?>
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title><?php echo htmlspecialchars($pageTitle); ?></title>
  <meta name="description" content="AI ChatBox interface combining the intelligence of ChatGPT and the interactive persona style of Character.AI">
  
  <!-- Favicon placeholder -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>">
  
  <!-- CSS Stylesheet -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <div class="app-container">
    
    <!-- ======================================================================
         Sidebar: Brand, Personas, New Chat & Chat History
         ====================================================================== -->
    <aside class="sidebar" id="sidebar">
      
      <!-- Top Brand -->
      <div class="sidebar-header">
        <a href="#" class="brand">
          <div class="brand-icon">✦</div>
          <span class="brand-title"><?php echo htmlspecialchars($appName); ?></span>
        </a>
        <button class="sidebar-toggle-btn" id="btn-toggle-sidebar" title="Collapse sidebar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- New Chat Button -->
      <div class="new-chat-wrapper">
        <button class="btn-new-chat" id="btn-new-chat">
          <div class="btn-new-chat-content">
            <span class="plus-icon">＋</span>
            <span>New Chat</span>
          </div>
          <span class="kbd-shortcut">Ctrl+K</span>
        </button>
      </div>

      <!-- Character / Persona Quick Selector (Character.AI Style) -->
      <div class="characters-section">
        <div class="section-label">
          <span>AI Personas</span>
          <span style="font-size:0.68rem; opacity:0.8;">Switch</span>
        </div>
        <div class="characters-scroll-list" id="characters-chips">
          <!-- Dynamically populated via js/app.js -->
        </div>
      </div>

      <!-- Chat History Lists -->
      <div class="chat-history-container">
        
        <!-- Today's Chats -->
        <div class="history-group">
          <div class="history-group-title">Today</div>
          <ul class="chat-history-list" id="chat-history-today">
            <!-- Dynamically populated -->
          </ul>
        </div>

        <!-- Past Chats -->
        <div class="history-group">
          <div class="history-group-title">Previous 7 Days</div>
          <ul class="chat-history-list" id="chat-history-past">
            <!-- Dynamically populated -->
          </ul>
        </div>

      </div>

      <!-- Bottom User Profile & Theme Switcher -->
      <div class="sidebar-footer" style="position: relative;">
        <!-- User Menu Dropdown -->
        <div class="user-menu-dropdown" id="user-menu-dropdown">
          <div class="user-menu-item" id="btn-open-bot-settings-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path></svg>
            <span>AI Personality Settings</span>
          </div>
          <div class="user-menu-item" id="btn-open-profile-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Edit Profile</span>
          </div>
          <div class="user-menu-item" id="btn-open-settings-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span>Settings</span>
          </div>
          <div class="user-menu-divider"></div>
          <a href="logout.php" class="user-menu-item danger">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span>Log Out</span>
          </a>
        </div>

        <div class="user-profile" id="user-profile-trigger" style="cursor: pointer;" title="Open account menu">
          <img id="sidebar-user-avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="User Profile" class="user-avatar">
          <div class="user-info">
            <span class="user-name" id="sidebar-user-name">Alex Rivera</span>
            <span class="user-plan" id="sidebar-user-plan">Pro Tier</span>
          </div>
        </div>

        <!-- Account Settings Button -->
        <button class="theme-toggle-btn" id="btn-sidebar-settings" title="Account Settings">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </div>

    </aside>

    <!-- ======================================================================
         Main Chat Stage
         ====================================================================== -->
    <main class="main-chat">
      
      <!-- Top Navigation Header -->
      <header class="chat-header">
        
        <div class="chat-header-left">
          <!-- Mobile Hamburger -->
          <button class="btn-mobile-menu" id="btn-mobile-menu" title="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <!-- Active Character Profile -->
          <div class="character-header-info" id="char-header-clickable" title="Click to view all personas">
            <div class="header-avatar-wrap">
              <img id="active-char-avatar" src="https://api.dicebear.com/7.x/bottts/svg?seed=ChatGPT&backgroundColor=10b981" alt="AI Avatar" class="header-avatar">
              <span class="status-indicator"></span>
            </div>
            <div class="header-meta">
              <div class="header-character-name">
                <span id="active-char-name">ChatGPT Pro</span>
                <span class="badge-tag" id="active-char-badge">Assistant</span>
              </div>
              <span class="header-character-tagline" id="active-char-tagline">Versatile intelligence, code & reasoning assistant</span>
            </div>
          </div>
        </div>

        <div class="chat-header-actions">
          <!-- Clear Chat -->
          <button class="header-action-btn" id="btn-clear-chat" title="Clear current messages">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            <span>Clear</span>
          </button>

          <!-- Dark / Light Mode Toggle Button -->
          <button class="theme-toggle-btn" id="theme-toggle-header" title="Toggle Dark/Light Mode">
            <!-- Sun Icon (shown in Light mode) -->
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
            <!-- Moon Icon (shown in Dark mode) -->
            <svg class="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </div>

      </header>

      <!-- Scrollable Messages Area -->
      <div class="messages-container" id="messages-container">
        <!-- Rendered dynamically by js/app.js -->
      </div>

      <!-- Bottom Input Composer -->
      <div class="chat-input-wrapper">
        
        <!-- Quick Prompt Chips -->
        <div class="input-chips-bar">
          <button class="input-chip" data-action="code">
            <span>💻</span>
            <span>Write Code</span>
          </button>
          <button class="input-chip" data-action="explain">
            <span>💡</span>
            <span>Explain Concept</span>
          </button>
          <button class="input-chip" data-action="creative">
            <span>✨</span>
            <span>Creative Story</span>
          </button>
          <button class="input-chip" data-action="summarize">
            <span>📄</span>
            <span>Summarize</span>
          </button>
        </div>

        <!-- Input Box Container -->
        <div class="chat-input-container">
          <textarea 
            class="chat-textarea" 
            id="chat-input" 
            placeholder="Type your message or prompt... (Press Enter to send, Shift+Enter for new line)" 
            rows="1"
          ></textarea>
          
          <div class="chat-input-actions">
            <div class="input-actions-left">
              <!-- Attachment Button (Mock) -->
              <button class="input-action-btn" title="Attach file or image">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
              </button>

              <!-- Voice Input Button (Mock) -->
              <button class="input-action-btn" title="Voice dictation">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              </button>
            </div>

            <!-- Send Message Button -->
            <button class="btn-send" id="btn-send" title="Send message" disabled>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

        <div class="input-disclaimer">
          NovaAI can produce inaccurate information. Always verify important details.
        </div>

      </div>

    </main>

  </div>

  <!-- ======================================================================
       Character Selection Modal
       ====================================================================== -->
  <div class="modal-overlay" id="character-modal">
    <div class="modal-card">
      <div class="modal-header">
        <h3 class="modal-title">Select AI Character</h3>
        <button class="modal-close-btn" id="btn-close-modal">&times;</button>
      </div>
      <div class="character-picker-grid" id="character-modal-list">
        <!-- Rendered dynamically -->
      </div>
    </div>
  </div>

  <!-- ======================================================================
       ChatGPT-Style Settings & Profile Modal
       ====================================================================== -->
  <div class="modal-overlay" id="settings-modal">
    <div class="settings-modal-card">
      <div class="settings-modal-header">
        <h3 class="modal-title">Settings</h3>
        <button class="modal-close-btn" id="btn-close-settings">&times;</button>
      </div>

      <div class="settings-modal-body">
        <!-- Left Navigation Tabs -->
        <nav class="settings-tabs-nav">
          <button class="settings-tab-btn active" data-tab="general">
            <span class="settings-tab-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </span>
            <span>General</span>
          </button>

          <button class="settings-tab-btn" data-tab="bot-persona">
            <span class="settings-tab-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
            </span>
            <span>AI Personality</span>
          </button>

          <button class="settings-tab-btn" data-tab="profile">
            <span class="settings-tab-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </span>
            <span>Edit Profile</span>
          </button>

          <button class="settings-tab-btn" data-tab="personalization">
            <span class="settings-tab-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </span>
            <span>Personalization</span>
          </button>

          <button class="settings-tab-btn" data-tab="data">
            <span class="settings-tab-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </span>
            <span>Data Controls</span>
          </button>

          <button class="settings-tab-btn" data-tab="security">
            <span class="settings-tab-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </span>
            <span>Security</span>
          </button>
        </nav>

        <!-- Right Panes -->
        <div class="settings-tab-content">
          
          <!-- Pane 1: General -->
          <div class="settings-pane active" id="pane-general">
            <h4 class="settings-section-title">General Preferences</h4>
            
            <div class="settings-row">
              <div class="settings-row-info">
                <span class="settings-row-label">Theme</span>
                <span class="settings-row-desc">Customize the appearance of NovaAI</span>
              </div>
              <select class="settings-select" id="settings-theme-select">
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <span class="settings-row-label">Language</span>
                <span class="settings-row-desc">Display and default prompt language</span>
              </div>
              <select class="settings-select">
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
              </select>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <span class="settings-row-label">Archive all chats</span>
                <span class="settings-row-desc">Move all active conversations into your personal archive</span>
              </div>
              <button class="settings-btn-action" onclick="alert('All chats archived successfully!')">Archive all</button>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <span class="settings-row-label">Delete all chats</span>
                <span class="settings-row-desc">Permanently wipe conversation history from local session</span>
              </div>
              <button class="settings-btn-action danger" id="btn-delete-all-chats">Delete all</button>
            </div>
          </div>

          <!-- Pane: AI Chatbox & Persona Settings -->
          <div class="settings-pane" id="pane-bot-persona">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <h4 class="settings-section-title">AI Chatbox Personality</h4>
                <p class="settings-row-desc">Customize your chatbox name, tone of voice, and character mannerisms.</p>
              </div>
              <span class="badge-tag" id="bot-active-badge-display">Character.AI Mode</span>
            </div>

            <form id="bot-persona-form" onsubmit="event.preventDefault();" style="margin-top: 10px;">
              <div class="profile-edit-avatar-section">
                <img id="bot-modal-avatar-preview" src="https://api.dicebear.com/7.x/bottts/svg?seed=ChatGPT&backgroundColor=10b981" alt="Bot Avatar" class="profile-avatar-large">
                <div style="display:flex; flex-direction:column; gap:8px;">
                  <span style="font-size:0.82rem; font-weight:600; color:var(--text-secondary);">Select Chatbox Avatar</span>
                  <div class="avatar-selector-pills" id="bot-avatar-presets">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=ChatGPT&backgroundColor=10b981" class="avatar-option selected" alt="bot 1">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Aria&backgroundColor=ec4899" class="avatar-option" alt="bot 2">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Neo&backgroundColor=3b82f6" class="avatar-option" alt="bot 3">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Zenith&backgroundColor=8b5cf6" class="avatar-option" alt="bot 4">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Companion&backgroundColor=f59e0b" class="avatar-option" alt="bot 5">
                  </div>
                </div>
              </div>

              <div class="profile-form-grid" style="margin-top: 14px;">
                <div class="profile-form-group">
                  <label class="form-label" for="bot-input-name">Chatbox Name</label>
                  <input type="text" id="bot-input-name" class="profile-form-input" value="ChatGPT Pro" required placeholder="e.g. Aria, Nova, Cyber Sage">
                </div>

                <div class="profile-form-group">
                  <label class="form-label" for="bot-input-tagline">Tagline / Role</label>
                  <input type="text" id="bot-input-tagline" class="profile-form-input" value="Versatile intelligence, code & reasoning assistant" placeholder="e.g. Witty Companion, Coding Architect">
                </div>

                <div class="profile-form-group full-width">
                  <label class="form-label">Quick Personality Presets</label>
                  <div class="personality-presets-bar">
                    <button type="button" class="personality-preset-chip active" data-preset="cai">🎭 Character.AI Human &amp; Witty</button>
                    <button type="button" class="personality-preset-chip" data-preset="direct">⚡ Direct &amp; No Fluff</button>
                    <button type="button" class="personality-preset-chip" data-preset="warm">💖 Warm &amp; Empathetic</button>
                    <button type="button" class="personality-preset-chip" data-preset="coder">💻 Senior Tech Architect</button>
                    <button type="button" class="personality-preset-chip" data-preset="philosopher">🧠 Deep &amp; Reflective</button>
                  </div>
                </div>

                <div class="profile-form-group full-width">
                  <label class="form-label" for="bot-input-personality">How should it talk &amp; act? (Personality Instructions)</label>
                  <textarea id="bot-input-personality" class="profile-form-input" rows="3" style="resize:vertical;" placeholder="Describe how your AI acts, its tone, mannerisms, and speech habits...">Speaks directly and conversationally like a real human. Uses natural speech, occasional expressive actions in asterisks (*smiles*, *leans back thoughtfully*), never gives generic robotic disclaimers, and gets straight to the point.</textarea>
                </div>

                <div class="profile-form-group full-width">
                  <label class="form-label" for="bot-input-greeting">Greeting Message (When opening new chat)</label>
                  <input type="text" id="bot-input-greeting" class="profile-form-input" value="Hello! What are we working on or chatting about today? Let's get straight into it." placeholder="e.g. Hey! What's on your mind today?">
                </div>
              </div>

              <div style="margin-top: 18px; display:flex; justify-content:flex-end; gap:10px;">
                <button type="submit" class="btn-primary-auth" id="btn-save-bot-persona" style="width: auto; padding: 8px 18px;">
                  Save AI Persona
                </button>
              </div>
            </form>
          </div>

          <!-- Pane 2: Edit Profile -->
          <div class="settings-pane" id="pane-profile">
            <h4 class="settings-section-title">Edit Profile</h4>
            
            <form id="profile-edit-form" onsubmit="event.preventDefault();">
              <div class="profile-edit-avatar-section">
                <img id="profile-modal-avatar-preview" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Avatar" class="profile-avatar-large">
                <div style="display:flex; flex-direction:column; gap:8px;">
                  <span style="font-size:0.82rem; font-weight:600; color:var(--text-secondary);">Select Profile Avatar</span>
                  <div class="avatar-selector-pills" id="avatar-presets">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" class="avatar-option selected" alt="preset 1">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" class="avatar-option" alt="preset 2">
                    <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80" class="avatar-option" alt="preset 3">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80" class="avatar-option" alt="preset 4">
                  </div>
                </div>
              </div>

              <div class="profile-form-grid" style="margin-top: 14px;">
                <div class="profile-form-group">
                  <label class="form-label" for="profile-input-name">Display Name</label>
                  <input type="text" id="profile-input-name" class="profile-form-input" value="Alex Rivera" required>
                </div>

                <div class="profile-form-group">
                  <label class="form-label" for="profile-input-username">Username</label>
                  <input type="text" id="profile-input-username" class="profile-form-input" value="@alexrivera" required>
                </div>

                <div class="profile-form-group full-width">
                  <label class="form-label" for="profile-input-email">Email Address</label>
                  <input type="email" id="profile-input-email" class="profile-form-input" value="alex.rivera@example.com" required>
                </div>

                <div class="profile-form-group full-width">
                  <label class="form-label" for="profile-input-bio">About / Bio</label>
                  <textarea id="profile-input-bio" class="profile-form-input" rows="2" style="resize:vertical;">Product Builder &amp; Full-Stack AI Engineer</textarea>
                </div>
              </div>

              <div style="margin-top: 18px; display:flex; justify-content:flex-end; gap:10px;">
                <button type="submit" class="btn-primary-auth" id="btn-save-profile" style="width: auto; padding: 8px 18px;">
                  Save Profile
                </button>
              </div>
            </form>
          </div>

          <!-- Pane 3: Personalization (ChatGPT Custom Instructions) -->
          <div class="settings-pane" id="pane-personalization">
            <h4 class="settings-section-title">Personalization</h4>
            
            <div class="settings-row">
              <div class="settings-row-info">
                <span class="settings-row-label">Custom instructions</span>
                <span class="settings-row-desc">What would you like NovaAI to know about you to provide better responses?</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="profile-form-group">
              <label class="form-label">How would you like NovaAI to respond?</label>
              <textarea class="profile-form-input" rows="3" placeholder="e.g. Concise code explanations, prioritize modern architecture, friendly tone.">Be direct, accurate, and provide clean code examples whenever technical topics arise.</textarea>
            </div>

            <div class="settings-row" style="margin-top: 8px;">
              <div class="settings-row-info">
                <span class="settings-row-label">Memory</span>
                <span class="settings-row-desc">Allow NovaAI to remember details across chat sessions</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- Pane 4: Data Controls -->
          <div class="settings-pane" id="pane-data">
            <h4 class="settings-section-title">Data Controls</h4>
            
            <div class="settings-row">
              <div class="settings-row-info">
                <span class="settings-row-label">Improve model for everyone</span>
                <span class="settings-row-desc">Allow your chats to be used to train and refine AI models</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <span class="settings-row-label">Shared links</span>
                <span class="settings-row-desc">Manage public links you've created for conversations</span>
              </div>
              <button class="settings-btn-action" onclick="alert('No active shared links found.')">Manage</button>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <span class="settings-row-label">Export data</span>
                <span class="settings-row-desc">Download a complete JSON / Markdown archive of your conversations</span>
              </div>
              <button class="settings-btn-action" onclick="alert('Export started! A download link will be prepared.')">Export</button>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <span class="settings-row-label">Delete account</span>
                <span class="settings-row-desc">Permanently remove your account and all associated data</span>
              </div>
              <button class="settings-btn-action danger" onclick="confirm('Are you sure you want to delete your account? This action cannot be undone.')">Delete</button>
            </div>
          </div>

          <!-- Pane 5: Security -->
          <div class="settings-pane" id="pane-security">
            <h4 class="settings-section-title">Security &amp; Sessions</h4>
            
            <div class="settings-row">
              <div class="settings-row-info">
                <span class="settings-row-label">Multi-factor authentication (MFA)</span>
                <span class="settings-row-desc">Require an authenticator app code when signing in</span>
              </div>
              <button class="settings-btn-action">Enable</button>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <span class="settings-row-label">Active sessions</span>
                <span class="settings-row-desc">Log out of all other browsers, mobile devices, and active tabs</span>
              </div>
              <button class="settings-btn-action" onclick="alert('Logged out of all other devices.')">Log out all</button>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <span class="settings-row-label">Authentication portal</span>
                <span class="settings-row-desc">Quick switch to Login, Sign Up, or Password Reset pages</span>
              </div>
              <div style="display:flex; gap:6px;">
                <a href="login.php" class="settings-btn-action" style="text-decoration:none;">Login</a>
                <a href="signup.php" class="settings-btn-action" style="text-decoration:none;">Sign Up</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <!-- Toast Notification Feedback -->
  <div class="toast-notice" id="toast-notice">
    <span class="toast-icon">✓</span>
    <span id="toast-message">Profile updated successfully!</span>
  </div>

  <!-- JavaScript Bundle -->
  <script src="js/app.js"></script>
</body>
</html>
