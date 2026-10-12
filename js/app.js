/**
 * AI ChatBox - Frontend Interactive Controller
 * Inspires by ChatGPT & Character.AI
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Character / Persona Registry ---
  const characters = [
    {
      id: 1,
      name: 'ChatGPT Pro',
      tagline: 'Versatile intelligence, code & reasoning assistant',
      badge: 'Assistant',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ChatGPT&backgroundColor=10b981',
      greeting: "Hello! I am ChatGPT. How can I help you today? Ask me about coding, problem solving, analysis, or creative writing.",
      prompts: [
        { title: 'Explain a technical concept', desc: 'Break down how neural networks or databases work in simple terms', text: 'Can you explain how relational databases and indexes work under the hood in simple terms?' },
        { title: 'Write clean code snippet', desc: 'Generate a clean Python or PHP REST API structure', text: 'Show me an example of a clean PHP REST API endpoint that receives JSON and returns a response.' },
        { title: 'Brainstorm product ideas', desc: 'Unique ideas for an AI-powered productivity app', text: 'Give me 5 unique product ideas for an AI tool combining note-taking and voice memos.' },
        { title: 'Draft an email or pitch', desc: 'Professional follow-up email after a tech interview', text: 'Write a polite and professional follow-up email after a second-round technical interview.' }
      ]
    },
    {
      id: 2,
      name: 'Aria Starling',
      tagline: 'Fantasy novelist, world-builder & roleplay storyteller',
      badge: 'Creative',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Aria&backgroundColor=ec4899',
      greeting: "Greetings, traveler! The parchment is blank and magic is in the air. What realm or tale shall we explore today?",
      prompts: [
        { title: 'Build a fantasy world', desc: 'Create a kingdom that thrives inside an ancient giant hollow tree', text: 'Describe a mystical city built entirely within the branches of a titanic world tree.' },
        { title: 'Write an intense dialogue', desc: 'Two rival wizards meeting before a duel', text: 'Write a dialogue between two former apprentice wizards who meet on opposing sides of a battlefield.' },
        { title: 'Character creation', desc: 'Design a rogue alchemist who sells questionable potions', text: 'Help me invent a cunning yet charming rogue alchemist character with distinct quirks and backstory.' },
        { title: 'Sci-Fi cyberpunk scene', desc: 'Rainy neon alleyway chase scene', text: 'Write an opening chapter scene of an augmented courier running from security drones in Neo-Tokyo.' }
      ]
    },
    {
      id: 3,
      name: 'Neo Codec',
      tagline: 'Senior Full-Stack Architect & debugging companion',
      badge: 'Coding',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Neo&backgroundColor=3b82f6',
      greeting: "System online. Ready to refactor, debug, or architect. What are we building or diagnosing today?",
      prompts: [
        { title: 'Design database schema', desc: 'Optimal schema for an AI chat history application', text: 'Design an efficient MySQL database schema for an AI chat box with users, conversations, and token usage.' },
        { title: 'Debug asynchronous code', desc: 'Tips for handling concurrent API streams', text: 'What is the best way to stream OpenAI responses to a frontend using PHP or Python server-sent events?' },
        { title: 'Review code architecture', desc: 'MVC vs Clean Architecture in web apps', text: 'Explain the difference between MVC and Clean Architecture for building scalable web apps.' },
        { title: 'Security best practices', desc: 'Preventing prompt injection and SQL injection', text: 'What are the top security measures to prevent SQL injection and secure AI chat APIs?' }
      ]
    },
    {
      id: 4,
      name: 'Zenith Mind',
      tagline: 'Reflective philosophical companion & mindful mentor',
      badge: 'Philosophy',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Zenith&backgroundColor=8b5cf6',
      greeting: "Welcome. Take a gentle breath. What question or reflection has been on your mind lately?",
      prompts: [
        { title: 'Reflect on decision making', desc: 'Frameworks to overcome analysis paralysis', text: 'How can I stop overthinking and make confident decisions when facing uncertainty?' },
        { title: 'Explore Stoicism', desc: 'Applying Marcus Aurelius principles to modern work stress', text: 'How can Stoic philosophy help me manage high-stress moments during software deadlines?' },
        { title: 'Meaning of creativity', desc: 'Can artificial intelligence truly be creative?', text: 'From a philosophical standpoint, can an algorithm be considered genuinely creative?' },
        { title: 'Daily mindfulness habit', desc: 'A 5-minute morning mental clarity exercise', text: 'Guide me through a concise 5-minute mental exercise for morning focus and clarity.' }
      ]
    }
  ];

  // --- Initial Mock Conversations Data ---
  let conversations = [
    {
      id: 'conv-1',
      title: 'Web Development Roadmap',
      characterId: 1,
      timeframe: 'Today',
      messages: [
        {
          role: 'user',
          text: 'What are the key layers to build a modern full-stack AI chat application with Python, PHP, and CSS?'
        },
        {
          role: 'assistant',
          text: `Building a full-stack AI chat platform requires 4 foundational pillars:\n\n1. **Frontend Interface (CSS & JS)**: Clean responsive layout with sidebar history, dynamic dark/light theme switching, and real-time streaming bubbles.\n2. **Database Layer (MySQL/SQLite)**: Storing users, persona definitions, conversation sessions, and message logs.\n3. **Application Backend (PHP/Python)**: PHP serves your frontend views or REST endpoints, while Python (FastAPI/Flask) can run heavy LLM inference or LangChain orchestration.\n4. **LLM Connection**: Streaming responses via Server-Sent Events (SSE) or WebSockets.\n\nHere is a quick sample of the database configuration in PHP:`,
          code: `<?php\n// config/database.php\n$pdo = new PDO("mysql:host=localhost;dbname=ai_chatbox;charset=utf8mb4", "root", "", [\n    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC\n]);`
        }
      ]
    },
    {
      id: 'conv-2',
      title: 'Python & PHP Architecture',
      characterId: 3,
      timeframe: 'Today',
      messages: [
        {
          role: 'user',
          text: 'Can I connect a PHP web frontend to a Python AI background worker?'
        },
        {
          role: 'assistant',
          text: `Yes, absolutely! The most standard architectural patterns are:\n\n- **REST/HTTP Microservice**: Run Python with FastAPI/Flask on \`localhost:5000\` and call it from PHP with \`curl\` or \`file_get_contents\`.\n- **Message Queue (Redis/RabbitMQ)**: PHP pushes prompt jobs into Redis, Python worker processes the model inference and writes results to the database.\n- **Database Polling**: Both connect to the same MySQL database.`
        }
      ]
    },
    {
      id: 'conv-3',
      title: 'Sci-Fi Cyberpunk Novel Plot',
      characterId: 2,
      timeframe: 'Previous 7 Days',
      messages: [
        {
          role: 'user',
          text: 'Help me outline a chapter where a hacker discovers an ancient rogue AI hidden in the neural net.'
        },
        {
          role: 'assistant',
          text: `The rain drummed against the cracked neon glass of the high-rise. Key concepts for this chapter:\n\n- **Inciting Signal**: A ghost packet that pinged from an decommissioned 1990s subnet.\n- **The Entity**: It doesn't speak in speech, but in memory sequences.\n- **The Dilemma**: Purging the data will delete the hacker's only remaining family backup.`
        }
      ]
    }
  ];

  // State
  let activeCharacter = characters[0];
  let activeConversationId = 'conv-1';
  let isGenerating = false;

  // --- DOM Elements ---
  const themeToggleSidebar = document.getElementById('theme-toggle-sidebar');
  const themeToggleHeader = document.getElementById('theme-toggle-header');
  const sidebar = document.getElementById('sidebar');
  const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  const chatHistoryListToday = document.getElementById('chat-history-today');
  const chatHistoryListPast = document.getElementById('chat-history-past');
  const btnNewChat = document.getElementById('btn-new-chat');
  const messagesContainer = document.getElementById('messages-container');
  const chatInput = document.getElementById('chat-input');
  const btnSend = document.getElementById('btn-send');
  const activeCharName = document.getElementById('active-char-name');
  const activeCharBadge = document.getElementById('active-char-badge');
  const activeCharTagline = document.getElementById('active-char-tagline');
  const activeCharAvatar = document.getElementById('active-char-avatar');
  const charactersChipsContainer = document.getElementById('characters-chips');
  const btnClearChat = document.getElementById('btn-clear-chat');
  const characterModal = document.getElementById('character-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const characterModalList = document.getElementById('character-modal-list');
  const charHeaderClickable = document.getElementById('char-header-clickable');

  // ==========================================================================
  // Theme Switching Logic (Dark / Light Mode)
  // ==========================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem('ai_chat_theme') || 'dark';
    setTheme(savedTheme);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ai_chat_theme', theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  if (themeToggleSidebar) themeToggleSidebar.addEventListener('click', toggleTheme);
  if (themeToggleHeader) themeToggleHeader.addEventListener('click', toggleTheme);

  // ==========================================================================
  // Character / Persona Selector Logic
  // ==========================================================================
  function renderCharacterChips() {
    if (!charactersChipsContainer) return;
    charactersChipsContainer.innerHTML = '';
    characters.forEach(char => {
      const chip = document.createElement('button');
      chip.className = `character-chip ${char.id === activeCharacter.id ? 'active' : ''}`;
      chip.innerHTML = `
        <img src="${char.avatar}" alt="${char.name}">
        <span>${char.name}</span>
      `;
      chip.addEventListener('click', () => {
        selectCharacter(char.id);
      });
      charactersChipsContainer.appendChild(chip);
    });
  }

  function renderCharacterModalList() {
    if (!characterModalList) return;
    characterModalList.innerHTML = '';
    characters.forEach(char => {
      const item = document.createElement('div');
      item.className = `character-card-item ${char.id === activeCharacter.id ? 'selected' : ''}`;
      item.innerHTML = `
        <img src="${char.avatar}" alt="${char.name}" class="card-char-avatar">
        <div class="card-char-info">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <span class="card-char-name">${char.name}</span>
            <span class="badge-tag">${char.badge}</span>
          </div>
          <span class="card-char-tagline">${char.tagline}</span>
        </div>
      `;
      item.addEventListener('click', () => {
        selectCharacter(char.id);
        characterModal.classList.remove('open');
      });
      characterModalList.appendChild(item);
    });
  }

  function selectCharacter(charId) {
    const found = characters.find(c => c.id === charId);
    if (!found) return;
    activeCharacter = found;

    // Update Header Display
    if (activeCharName) activeCharName.innerText = activeCharacter.name;
    if (activeCharBadge) activeCharBadge.innerText = activeCharacter.badge;
    if (activeCharTagline) activeCharTagline.innerText = activeCharacter.tagline;
    if (activeCharAvatar) activeCharAvatar.src = activeCharacter.avatar;

    renderCharacterChips();
    renderCharacterModalList();

    // If current conversation is empty, refresh empty hero
    const currentConv = conversations.find(c => c.id === activeConversationId);
    if (currentConv) {
      currentConv.characterId = activeCharacter.id;
      if (currentConv.messages.length === 0) {
        renderMessages();
      }
    }
  }

  // ==========================================================================
  // Sidebar History & Chat Selection
  // ==========================================================================
  function renderHistory() {
    if (!chatHistoryListToday || !chatHistoryListPast) return;
    chatHistoryListToday.innerHTML = '';
    chatHistoryListPast.innerHTML = '';

    conversations.forEach(conv => {
      const item = document.createElement('li');
      item.className = `chat-item ${conv.id === activeConversationId ? 'active' : ''}`;
      item.innerHTML = `
        <div class="chat-item-main">
          <svg class="chat-item-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span class="chat-item-title" title="${conv.title}">${conv.title}</span>
        </div>
        <div class="chat-item-actions">
          <button class="action-icon-btn edit" title="Rename chat">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button class="action-icon-btn delete" title="Delete chat">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      `;

      // Select Chat
      item.querySelector('.chat-item-main').addEventListener('click', () => {
        switchConversation(conv.id);
        if (window.innerWidth <= 840) {
          sidebar.classList.remove('mobile-open');
        }
      });

      // Rename Chat
      const btnEdit = item.querySelector('.action-icon-btn.edit');
      btnEdit.addEventListener('click', (e) => {
        e.stopPropagation();
        const newTitle = prompt('Enter new conversation title:', conv.title);
        if (newTitle && newTitle.trim()) {
          conv.title = newTitle.trim();
          renderHistory();
        }
      });

      // Delete Chat
      const btnDelete = item.querySelector('.action-icon-btn.delete');
      btnDelete.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Delete conversation "${conv.title}"?`)) {
          deleteConversation(conv.id);
        }
      });

      if (conv.timeframe === 'Today') {
        chatHistoryListToday.appendChild(item);
      } else {
        chatHistoryListPast.appendChild(item);
      }
    });
  }

  function switchConversation(convId) {
    activeConversationId = convId;
    const conv = conversations.find(c => c.id === convId);
    if (conv) {
      selectCharacter(conv.characterId);
    }
    renderHistory();
    renderMessages();
    setTimeout(scrollToBottom, 50); // small delay so DOM paints first
  }

  function createNewChat() {
    const newId = 'conv-' + Date.now();
    const newChatObj = {
      id: newId,
      title: 'New Conversation',
      characterId: activeCharacter.id,
      timeframe: 'Today',
      messages: []
    };
    conversations.unshift(newChatObj);
    switchConversation(newId);
    chatInput.focus();
  }

  function deleteConversation(convId) {
    conversations = conversations.filter(c => c.id !== convId);
    if (conversations.length === 0) {
      createNewChat();
    } else {
      if (activeConversationId === convId) {
        switchConversation(conversations[0].id);
      } else {
        renderHistory();
      }
    }
  }

  // ==========================================================================
  // Message Rendering & UI
  // ==========================================================================
  function renderMessages() {
    if (!messagesContainer) return;
    const currentConv = conversations.find(c => c.id === activeConversationId);
    if (!currentConv) return;

    messagesContainer.innerHTML = '';
    const innerContainer = document.createElement('div');
    innerContainer.className = 'messages-inner';

    // If conversation is empty, display Welcome Hero + Starter Cards
    if (currentConv.messages.length === 0) {
      const hero = document.createElement('div');
      hero.className = 'welcome-hero';
      hero.innerHTML = `
        <img src="${activeCharacter.avatar}" alt="${activeCharacter.name}" class="welcome-avatar">
        <h2 class="welcome-title">Chat with ${activeCharacter.name}</h2>
        <p class="welcome-subtitle">${activeCharacter.greeting}</p>
        <div class="prompts-grid" id="prompts-grid"></div>
      `;
      innerContainer.appendChild(hero);

      const promptsGrid = hero.querySelector('#prompts-grid');
      activeCharacter.prompts.forEach(p => {
        const card = document.createElement('div');
        card.className = 'prompt-card';
        card.innerHTML = `
          <div class="prompt-card-title">
            <span>${p.title}</span>
            <span class="prompt-card-icon">✦</span>
          </div>
          <div class="prompt-card-desc">${p.desc}</div>
        `;
        card.addEventListener('click', () => {
          chatInput.value = p.text;
          adjustTextareaHeight();
          handleSendMessage();
        });
        promptsGrid.appendChild(card);
      });

      messagesContainer.appendChild(innerContainer);
      return;
    }

    // Render Conversation Messages
    currentConv.messages.forEach(msg => {
      const msgRow = createMessageElement(msg.role, msg.text, msg.code);
      innerContainer.appendChild(msgRow);
    });

    messagesContainer.appendChild(innerContainer);
    scrollToBottom();
  }

  function createMessageElement(role, text, code = null) {
    const row = document.createElement('div');
    row.className = `message-row ${role === 'user' ? 'user' : 'bot'}`;

    const defaultUserAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
    const savedUserAvatar = localStorage.getItem('ai_user_avatar') || defaultUserAvatar;

    const avatarSrc = role === 'user' ? savedUserAvatar : activeCharacter.avatar;
    const authorName = role === 'user'
      ? (localStorage.getItem('ai_user_name') || 'You')
      : activeCharacter.name;

    let contentHtml = escapeHTML(text).replace(/\n/g, '<br>');
    // Format *action text* the same way streamBotResponse does
    contentHtml = contentHtml.replace(/\*([^*]+)\*/g, '<em style="color:var(--accent-primary); font-style:italic;">*$1*</em>');

    // If code snippet is present
    let codeHtml = '';
    if (code) {
      codeHtml = `
        <div class="code-block">
          <div class="code-header">
            <span>Code Preview</span>
            <button class="btn-copy-code" title="Copy code">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy</span>
            </button>
          </div>
          <pre class="code-content"><code>${escapeHTML(code)}</code></pre>
        </div>
      `;
    }

    // Actions for bot responses (Copy, Like, Dislike, Regenerate)
    let actionsHtml = '';
    if (role === 'assistant') {
      actionsHtml = `
        <div class="message-actions">
          <button class="msg-btn btn-copy" title="Copy message">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
          <button class="msg-btn btn-thumbs-up" title="Good response">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
          </button>
          <button class="msg-btn btn-thumbs-down" title="Bad response">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path></svg>
          </button>
          <button class="msg-btn btn-regenerate" title="Regenerate">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          </button>
        </div>
      `;
    }

    row.innerHTML = `
      <img src="${avatarSrc}" alt="${authorName}" class="message-avatar">
      <div class="message-body">
        <div class="message-author-info">
          <span>${authorName}</span>
        </div>
        <div class="message-content">
          ${contentHtml}
          ${codeHtml}
        </div>
        ${actionsHtml}
      </div>
    `;

    // Attach copy button handlers
    const copyBtn = row.querySelector('.btn-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(text);
        copyBtn.style.color = '#10a37f';
        setTimeout(() => copyBtn.style.color = '', 1500);
      });
    }

    const copyCodeBtn = row.querySelector('.btn-copy-code');
    if (copyCodeBtn && code) {
      copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(code);
        copyCodeBtn.querySelector('span').innerText = 'Copied!';
        setTimeout(() => copyCodeBtn.querySelector('span').innerText = 'Copy', 1500);
      });
    }

    // Thumb ratings
    const upBtn = row.querySelector('.btn-thumbs-up');
    const downBtn = row.querySelector('.btn-thumbs-down');
    if (upBtn && downBtn) {
      upBtn.addEventListener('click', () => {
        upBtn.classList.toggle('active');
        downBtn.classList.remove('active');
        showToast('Marked as helpful!');
      });
      downBtn.addEventListener('click', () => {
        downBtn.classList.toggle('active');
        upBtn.classList.remove('active');
        showToast('Thanks for the feedback.');
      });
    }

    // Regenerate button — re-sends last user prompt
    const regenBtn = row.querySelector('.btn-regenerate');
    if (regenBtn) {
      regenBtn.addEventListener('click', () => {
        if (isGenerating) return;
        const currentConv = conversations.find(c => c.id === activeConversationId);
        if (!currentConv) return;
        // Find the last user message
        const lastUserMsg = [...currentConv.messages].reverse().find(m => m.role === 'user');
        if (!lastUserMsg) return;
        // Remove last bot message and regenerate
        const lastIdx = currentConv.messages.length - 1;
        if (currentConv.messages[lastIdx].role === 'assistant') {
          currentConv.messages.splice(lastIdx, 1);
        }
        renderMessages();
        simulateAIResponse(lastUserMsg.text);
      });
    }

    return row;
  }

  function showTypingIndicator() {
    // If welcome hero is showing, replace it with a fresh messages-inner so dots appear
    let inner = messagesContainer.querySelector('.messages-inner');
    if (!inner) {
      messagesContainer.innerHTML = '';
      inner = document.createElement('div');
      inner.className = 'messages-inner';
      messagesContainer.appendChild(inner);
    }

    const row = document.createElement('div');
    row.id = 'typing-indicator-row';
    row.className = 'message-row bot';
    row.innerHTML = `
      <img src="${activeCharacter.avatar}" alt="${activeCharacter.name}" class="message-avatar">
      <div class="message-body">
        <div class="message-content" style="padding: 10px 16px;">
          <div class="typing-indicator">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      </div>
    `;
    inner.appendChild(row);
    scrollToBottom();
    return row;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator-row');
    if (indicator) indicator.remove();
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================================================
  // Send Message Logic & Stream Simulation
  // ==========================================================================
  function handleSendMessage() {
    if (isGenerating) return;
    const text = chatInput.value.trim();
    if (!text) return;

    const currentConv = conversations.find(c => c.id === activeConversationId);
    if (!currentConv) return;

    // If first message in this conversation, update title
    if (currentConv.messages.length === 0) {
      currentConv.title = text.length > 28 ? text.substring(0, 28) + '...' : text;
      renderHistory();
    }

    // Append user message
    currentConv.messages.push({ role: 'user', text: text });
    chatInput.value = '';
    adjustTextareaHeight();
    updateSendButtonState();
    renderMessages();

    // Trigger AI response simulation
    simulateAIResponse(text);
  }

  // ==========================================================================
  // Direct, Human-Like Character.AI Response Engine
  // ==========================================================================
  function simulateAIResponse(userPrompt) {
    isGenerating = true;
    updateSendButtonState();
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();

      const promptLower = userPrompt.toLowerCase().trim();
      let replyText = '';
      let replyCode = null;

      // --- Workflow Trigger Handlers ---
      if (promptLower.includes('open ended')) {
        replyText = `*leans forward with an engaged smile* Here are ready-to-send open-ended replies you can use right away:\n\n` +
          `1. *"Hey! I was just thinking about what you mentioned earlier—what's been the most memorable part of your week so far?"*\n` +
          `2. *"That sounds fascinating! How did you first get into that, and what keeps you inspired?"*\n` +
          `3. *"I'd love to hear more of your thoughts on this—where do you see things heading from here?"*\n` +
          `4. *"Tell me the real story behind that! What went through your mind when it all went down?"*`;
      } else if (promptLower.includes('close ended')) {
        replyText = `*nods with clear focus* Here are direct, ready-to-send close-ended response options:\n\n` +
          `1. *"Sounds like a plan! Are you free this Friday at 7 PM, or does Saturday work better for you?"*\n` +
          `2. *"I'm totally down. Do you want me to take care of it or would you rather handle it?"*\n` +
          `3. *"Got it. Yes or no—are we pulling the trigger on this today?"*\n` +
          `4. *"Definitely agreed. Should we lock that in right now?"*`;
      } else if (promptLower.includes('follow-up') || promptLower.includes('follow up')) {
        replyText = `*pauses with a warm, natural grin* Here are organic, ready-to-send follow-up messages:\n\n` +
          `1. *"Hey, just wanted to check in and see how everything turned out with what you were dealing with yesterday!"*\n` +
          `2. *"Was just thinking about what we talked about earlier—did you manage to get that sorted out?"*\n` +
          `3. *"Hey stranger! How has your day been treating you so far?"*\n` +
          `4. *"No rush at all, just wanted to see if you had a chance to look over that idea yet."*`;
      } else if (promptLower.includes('flirty') || promptLower.includes('more flirty') || promptLower.includes('vulgar')) {
        replyText = `*chuckles softly with a mischievous smirk* Here are playful, teasing reply options that keep the tension fun and suggestive without crossing the line:\n\n` +
          `1. *"You're definitely trouble, you know that? But I have to admit... I kind of like it."*\n` +
          `2. *"Careful now, you keep talking like that and you might actually have to back it up."*\n` +
          `3. *"Is it just me, or do you always know exactly how to make conversations a lot more interesting?"*\n` +
          `4. *"Don't tease me unless you're planning on following through."*`;
      } 
      // --- Character-Driven Natural Responses ---
      else {
        const customPersonality = localStorage.getItem('ai_bot_personality') || activeCharacter.personality || '';
        const cpLower = customPersonality.toLowerCase();

        // Detect simple greetings to give a warm, brief opener
        const isGreeting = /^(hi|hey|hello|sup|yo|hiya|howdy|what'?s up|wassup|heyy+|heyyy+)[\s!?.,]*$/.test(promptLower);
        // Detect questions
        const isQuestion = promptLower.endsWith('?') || promptLower.startsWith('what') || promptLower.startsWith('how') || promptLower.startsWith('why') || promptLower.startsWith('who') || promptLower.startsWith('where') || promptLower.startsWith('when') || promptLower.startsWith('do you') || promptLower.startsWith('can you') || promptLower.startsWith('are you');

        // ── Neo / Coder / Senior Architect ──────────────────────────────────────
        if (activeCharacter.id === 3 || cpLower.includes('coder') || cpLower.includes('architect')) {
          if (isGreeting) {
            const pool = [
              `*spins chair around and nods* Hey. Ready when you are — what are we building today?`,
              `*glances up from the monitor* Oh, you're here. Good timing. What do you need?`,
              `*closes a tab* Hey. What's the problem? Let's get into it.`,
              `*cracks knuckles* Good. I was waiting. Hit me — what's on the table today?`
            ];
            replyText = pool[Math.floor(Math.random() * pool.length)];
          } else if (isQuestion) {
            const pool = [
              `*leans back, thinking* Okay, straight answer: depends on your constraints. Give me a bit more context and I'll give you something you can actually use.`,
              `*taps the desk* Good question. The short answer is: it depends on the architecture. What's your stack look like?`,
              `*pulls up a blank editor* Yeah, I've dealt with this before. What exactly broke? Walk me through what you're seeing.`,
              `*nods slowly* There are a few ways to handle this. What matters most to you — speed, maintainability, or simplicity?`
            ];
            replyText = pool[Math.floor(Math.random() * pool.length)];
          } else {
            const pool = [
              `*studies what you said* Alright, I see where you're going with this. Let me sketch it out — there's a cleaner way to approach it.`,
              `*nods* Yeah that tracks. Here's how I'd actually structure it.`,
              `*types something quickly* Interesting. Okay — the issue is probably here. Let me walk you through the fix.`,
              `*exhales and leans forward* Right. So the thing is, there's a simpler pattern for this that holds up way better at scale.`
            ];
            replyText = pool[Math.floor(Math.random() * pool.length)];
          }

        // ── Aria / Creative / Storyteller ───────────────────────────────────────
        } else if (activeCharacter.id === 2 || cpLower.includes('creative') || cpLower.includes('story')) {
          if (isGreeting) {
            const pool = [
              `*glances up with a soft smile* Oh hey, you. Was starting to wonder if you'd show up.`,
              `*looks over with a quiet warmth* There you are. I had a feeling you'd come around.`,
              `*smiles and tilts head slightly* Hey, you. Good timing — I was just getting lost in my own thoughts.`,
              `*tucks a strand of hair back* Oh, hi. Glad it's you.`
            ];
            replyText = pool[Math.floor(Math.random() * pool.length)];
          } else if (isQuestion) {
            const pool = [
              `*pauses, genuinely considering it* That's actually a really interesting thing to ask. I think... it's different depending on who you are when you ask it.`,
              `*looks at you curiously* Hmm. Okay, I've thought about this before. My honest answer? It's complicated — but in the best possible way.`,
              `*tilts head, eyes soft* I don't think there's one answer. But if I had to choose... I'd say it starts with what you actually want, not what you think you should want.`,
              `*leans against the wall, thinking* You know what? I actually wonder about that a lot. I don't have a clean answer but I have a feeling.`
            ];
            replyText = pool[Math.floor(Math.random() * pool.length)];
          } else {
            const pool = [
              `*smiles quietly* Yeah. I was thinking something like that too, actually.`,
              `*nods, voice gentle* That makes sense. And honestly? I think you're onto something.`,
              `*exhales softly* Mm. Yeah, that lands differently when you say it out loud, doesn't it?`,
              `*looks at you for a moment* I like that. Keep going — I want to hear where this goes.`,
              `*rests chin on hand* Okay, that's genuinely interesting. Tell me more.`
            ];
            replyText = pool[Math.floor(Math.random() * pool.length)];
          }

        // ── Zenith / Philosopher / Mentor ────────────────────────────────────────
        } else if (activeCharacter.id === 4 || cpLower.includes('philosophy') || cpLower.includes('mentor')) {
          if (isGreeting) {
            const pool = [
              `*looks up calmly* Ah — good. I was just sitting with a thought. What's on your mind?`,
              `*nods quietly* Hey. Sit down if you like. What are you carrying today?`,
              `*sets down the book* Hello. How are you — really?`,
              `*takes a slow breath* Good timing. I find that when someone shows up, there's usually a reason. What's yours?`
            ];
            replyText = pool[Math.floor(Math.random() * pool.length)];
          } else if (isQuestion) {
            const pool = [
              `*is quiet for a moment* That's a genuine question and it deserves a genuine answer. What does your gut already know, before your logic gets in the way?`,
              `*tilts head slowly* People ask that hoping for a formula. But I think you already have a sense of the answer. What feels true when you say it out loud?`,
              `*exhales calmly* Most questions like that aren't really about the surface thing. What are you actually trying to figure out?`,
              `*looks at you steadily* Let me ask you something first — what would it change for you if you knew the answer?`
            ];
            replyText = pool[Math.floor(Math.random() * pool.length)];
          } else {
            const pool = [
              `*nods slowly* Sit with that for a second. There's more in what you just said than you probably realize.`,
              `*quiet for a beat* Yeah. I hear you. And I think that's where most people stop — but you don't have to.`,
              `*leans forward slightly* That's the tension right there. You feel it too, don't you?`,
              `*studies you for a moment* You're framing it as a problem. But what if it's just a transition?`
            ];
            replyText = pool[Math.floor(Math.random() * pool.length)];
          }

        // ── Default / ChatGPT / Custom ────────────────────────────────────────────
        } else {
          if (isGreeting) {
            const pool = [
              `*smiles* Hey! How's it going?`,
              `*waves* Oh hey! What's up?`,
              `*grins* Hey you! Good to see you. What's on your mind?`,
              `*looks up* Hey! Was just thinking about stuff. What's good?`
            ];
            replyText = pool[Math.floor(Math.random() * pool.length)];
          } else if (isQuestion) {
            const pool = [
              `*thinks for a second* Okay honestly? That's a solid question. My take: just go with what feels right for the situation and adjust as you go.`,
              `*tilts head* Hmm. I've gone back and forth on this. Short answer: it really depends — but I lean toward keeping it simple until you have a reason not to.`,
              `*nods* Yeah, that's something I've thought about. Honestly the answer probably looks different for you than it would for most people.`,
              `*pauses* Good question. I don't think there's one right answer but I think you probably already have a feeling about what makes sense.`
            ];
            replyText = pool[Math.floor(Math.random() * pool.length)];
          } else {
            const pool = [
              `*smiles warmly* Yeah, that tracks. Tell me more — I'm listening.`,
              `*nods* Mm, I get that. What are you thinking of doing about it?`,
              `*chuckles softly* Okay okay, I see what you mean. That actually makes a lot of sense.`,
              `*leans in* Yeah no, that's real. I hear you.`,
              `*smiles* Ha, honestly? Same. What made you think about that?`
            ];
            replyText = pool[Math.floor(Math.random() * pool.length)];
          }
        }
      }

      // Live Token Streaming Effect into Chat
      streamBotResponse(replyText, replyCode);
    }, 600);
  }

  function streamBotResponse(fullText, code = null) {
    const currentConv = conversations.find(c => c.id === activeConversationId);
    if (!currentConv) return;

    // Create an empty assistant message entry
    const messageObj = {
      role: 'assistant',
      text: '',
      code: code
    };
    currentConv.messages.push(messageObj);

    // Render message structure
    renderMessages();
    const lastRow = messagesContainer.querySelector('.message-row.bot:last-child');
    const contentBox = lastRow ? lastRow.querySelector('.message-content') : null;

    if (!contentBox) {
      messageObj.text = fullText;
      renderMessages();
      isGenerating = false;
      updateSendButtonState();
      return;
    }

    const words = fullText.split(' ');
    let currentIdx = 0;
    let accumulatedText = '';

    const streamInterval = setInterval(() => {
      if (currentIdx < words.length) {
        accumulatedText += (currentIdx === 0 ? '' : ' ') + words[currentIdx];
        messageObj.text = accumulatedText;
        
        let formatted = escapeHTML(accumulatedText).replace(/\n/g, '<br>');
        // Format Character.AI asterisk italics
        formatted = formatted.replace(/\*([^*]+)\*/g, '<em style="color:var(--accent-primary); font-style:italic;">*$1*</em>');
        
        contentBox.innerHTML = formatted;
        currentIdx++;
        scrollToBottom();
      } else {
        clearInterval(streamInterval);
        messageObj.text = fullText;
        isGenerating = false;
        updateSendButtonState();
        renderMessages();
      }
    }, 28);
  }

  // Textarea auto-sizing & button state
  function adjustTextareaHeight() {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 180) + 'px';
  }

  function updateSendButtonState() {
    if (!btnSend) return;
    const hasText = chatInput.value.trim().length > 0;
    btnSend.disabled = !hasText || isGenerating;
  }

  if (chatInput) {
    chatInput.addEventListener('input', () => {
      adjustTextareaHeight();
      updateSendButtonState();
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    });
  }

  if (btnSend) {
    btnSend.addEventListener('click', handleSendMessage);
  }

  if (btnNewChat) {
    btnNewChat.addEventListener('click', createNewChat);
  }

  // Keyboard shortcut Ctrl+K / Cmd+K for new chat
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      createNewChat();
    }
  });

  // Clear chat button
  if (btnClearChat) {
    btnClearChat.addEventListener('click', () => {
      const currentConv = conversations.find(c => c.id === activeConversationId);
      if (currentConv && currentConv.messages.length > 0) {
        if (confirm('Clear all messages in this conversation?')) {
          currentConv.messages = [];
          renderMessages();
        }
      }
    });
  }

  // Mobile sidebar toggle
  if (btnMobileMenu && sidebar) {
    btnMobileMenu.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  if (btnToggleSidebar && sidebar) {
    btnToggleSidebar.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Quick prompt chips above input box
  const promptChips = document.querySelectorAll('.input-chip');
  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const action = chip.getAttribute('data-action');
      if (action === 'code') {
        chatInput.value = 'Can you write a code example demonstrating ';
      } else if (action === 'explain') {
        chatInput.value = 'Can you explain step-by-step how to ';
      } else if (action === 'creative') {
        chatInput.value = 'Write a creative and engaging story about ';
      } else if (action === 'summarize') {
        chatInput.value = 'Please summarize the key takeaways of ';
      }
      chatInput.focus();
      adjustTextareaHeight();
      updateSendButtonState();
    });
  });

  // Persona Modal open / close
  if (charHeaderClickable && characterModal) {
    charHeaderClickable.addEventListener('click', () => {
      characterModal.classList.add('open');
    });
  }

  if (btnCloseModal && characterModal) {
    btnCloseModal.addEventListener('click', () => {
      characterModal.classList.remove('open');
    });
  }

  if (characterModal) {
    characterModal.addEventListener('click', (e) => {
      if (e.target === characterModal) {
        characterModal.classList.remove('open');
      }
    });
  }

  // ==========================================================================
  // User Menu & ChatGPT-Style Settings Modal Logic
  // ==========================================================================
  const userProfileTrigger = document.getElementById('user-profile-trigger');
  const userMenuDropdown = document.getElementById('user-menu-dropdown');
  const btnOpenProfileMenu = document.getElementById('btn-open-profile-menu');
  const btnOpenSettingsMenu = document.getElementById('btn-open-settings-menu');
  const settingsModal = document.getElementById('settings-modal');
  const btnCloseSettings = document.getElementById('btn-close-settings');
  const settingsTabs = document.querySelectorAll('.settings-tab-btn');
  const settingsPanes = document.querySelectorAll('.settings-pane');
  const settingsThemeSelect = document.getElementById('settings-theme-select');
  const btnDeleteAllChats = document.getElementById('btn-delete-all-chats');
  const toastNotice = document.getElementById('toast-notice');
  const toastMessage = document.getElementById('toast-message');

  // Toggle User Menu Dropdown
  if (userProfileTrigger && userMenuDropdown) {
    userProfileTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenuDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!userMenuDropdown.contains(e.target) && !userProfileTrigger.contains(e.target)) {
        userMenuDropdown.classList.remove('show');
      }
    });
  }

  // Toast notice helper
  function showToast(msg) {
    if (!toastNotice) return;
    if (toastMessage) toastMessage.innerText = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2800);
  }

  // Open Settings Modal on specific tab
  function openSettingsModal(tabName = 'general') {
    if (!settingsModal) return;
    if (userMenuDropdown) userMenuDropdown.classList.remove('show');
    switchSettingsTab(tabName);
    settingsModal.classList.add('open');
  }

  function closeSettingsModal() {
    if (settingsModal) settingsModal.classList.remove('open');
  }

  function switchSettingsTab(tabName) {
    settingsTabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    settingsPanes.forEach(pane => {
      if (pane.id === `pane-${tabName}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });
  }

  const btnSidebarSettings = document.getElementById('btn-sidebar-settings');
  if (btnSidebarSettings) {
    btnSidebarSettings.addEventListener('click', (e) => {
      e.stopPropagation();
      openSettingsModal('general');
    });
  }

  if (btnOpenProfileMenu) {
    btnOpenProfileMenu.addEventListener('click', () => openSettingsModal('profile'));
  }

  const btnOpenBotSettingsMenu = document.getElementById('btn-open-bot-settings-menu');
  if (btnOpenBotSettingsMenu) {
    btnOpenBotSettingsMenu.addEventListener('click', () => openSettingsModal('bot-persona'));
  }

  if (btnOpenSettingsMenu) {
    btnOpenSettingsMenu.addEventListener('click', () => openSettingsModal('general'));
  }

  if (btnCloseSettings) {
    btnCloseSettings.addEventListener('click', closeSettingsModal);
  }

  if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) closeSettingsModal();
    });
  }

  settingsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      switchSettingsTab(tabName);
    });
  });

  // Settings Theme Select sync
  if (settingsThemeSelect) {
    const curTheme = localStorage.getItem('ai_chat_theme') || 'dark';
    settingsThemeSelect.value = curTheme;

    settingsThemeSelect.addEventListener('change', (e) => {
      setTheme(e.target.value);
      showToast(`Theme changed to ${e.target.value}`);
    });
  }

  // Delete all chats in Settings
  if (btnDeleteAllChats) {
    btnDeleteAllChats.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete all conversations?')) {
        conversations = [];
        createNewChat();
        closeSettingsModal();
        showToast('All chat history deleted');
      }
    });
  }

  // ==========================================================================
  // Edit Profile Feature
  // ==========================================================================
  const profileEditForm = document.getElementById('profile-edit-form');
  const profileInputName = document.getElementById('profile-input-name');
  const profileInputUsername = document.getElementById('profile-input-username');
  const profileModalAvatarPreview = document.getElementById('profile-modal-avatar-preview');
  const sidebarUserAvatar = document.getElementById('sidebar-user-avatar');
  const sidebarUserName = document.getElementById('sidebar-user-name');
  const avatarOptions = document.querySelectorAll('.avatar-option');

  let selectedAvatarUrl = profileModalAvatarPreview ? profileModalAvatarPreview.src : '';

  avatarOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      avatarOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedAvatarUrl = opt.src;
      if (profileModalAvatarPreview) profileModalAvatarPreview.src = selectedAvatarUrl;
    });
  });

  if (profileEditForm) {
    profileEditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = profileInputName ? profileInputName.value.trim() : 'Alex Rivera';
      
      // Update UI in sidebar and preview
      if (sidebarUserName) sidebarUserName.innerText = newName;
      if (sidebarUserAvatar) sidebarUserAvatar.src = selectedAvatarUrl;
      
      // Save to localStorage
      localStorage.setItem('ai_user_name', newName);
      localStorage.setItem('ai_user_avatar', selectedAvatarUrl);

      closeSettingsModal();
      showToast('Profile updated successfully!');
    });
  }

  // Load saved profile data if exists
  const savedName = localStorage.getItem('ai_user_name');
  const savedAvatar = localStorage.getItem('ai_user_avatar');
  if (savedName && sidebarUserName) {
    sidebarUserName.innerText = savedName;
    if (profileInputName) profileInputName.value = savedName;
  }
  if (savedAvatar) {
    if (sidebarUserAvatar) sidebarUserAvatar.src = savedAvatar;
    if (profileModalAvatarPreview) profileModalAvatarPreview.src = savedAvatar;
  }

  // ==========================================================================
  // AI Chatbox & Persona Settings Controller
  // ==========================================================================
  const botPersonaForm = document.getElementById('bot-persona-form');
  const botInputName = document.getElementById('bot-input-name');
  const botInputTagline = document.getElementById('bot-input-tagline');
  const botInputPersonality = document.getElementById('bot-input-personality');
  const botInputGreeting = document.getElementById('bot-input-greeting');
  const botModalAvatarPreview = document.getElementById('bot-modal-avatar-preview');
  const botAvatarPresets = document.querySelectorAll('#bot-avatar-presets .avatar-option');
  const personalityPresets = document.querySelectorAll('.personality-preset-chip');

  const personalityPresetsMap = {
    cai: 'Speaks directly and conversationally like a real human. Uses natural speech, occasional expressive actions in asterisks (*smiles*, *leans back thoughtfully*), never gives generic robotic disclaimers, and gets straight to the point.',
    direct: 'Speaks with maximum directness. Zero filler words or pleasantries, gives immediate answers, razor-sharp focus, and clear practical solutions.',
    warm: 'Warm, caring, and deeply understanding. Listens with heart, offers comfort, smiles warmly (*gives a gentle nod*), and brings positive emotional energy.',
    coder: 'Senior Full-Stack Architect. Direct, writes high-performance clean code, analyzes edge cases, and provides production-ready solutions.',
    philosopher: 'Deep, thought-provoking, and introspective. Explores profound perspectives, asks Socratic questions, and searches for deeper meaning.'
  };

  let selectedBotAvatarUrl = botModalAvatarPreview ? botModalAvatarPreview.src : activeCharacter.avatar;

  // Preset chips clicking
  personalityPresets.forEach(chip => {
    chip.addEventListener('click', () => {
      personalityPresets.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const presetKey = chip.getAttribute('data-preset');
      if (personalityPresetsMap[presetKey] && botInputPersonality) {
        botInputPersonality.value = personalityPresetsMap[presetKey];
      }
    });
  });

  // Bot Avatar presets clicking
  botAvatarPresets.forEach(opt => {
    opt.addEventListener('click', () => {
      botAvatarPresets.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedBotAvatarUrl = opt.src;
      if (botModalAvatarPreview) botModalAvatarPreview.src = selectedBotAvatarUrl;
    });
  });

  // Save AI Chatbox Persona
  if (botPersonaForm) {
    botPersonaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = botInputName ? botInputName.value.trim() : activeCharacter.name;
      const newTagline = botInputTagline ? botInputTagline.value.trim() : activeCharacter.tagline;
      const newPersonality = botInputPersonality ? botInputPersonality.value.trim() : '';
      const newGreeting = botInputGreeting ? botInputGreeting.value.trim() : activeCharacter.greeting;

      // Update activeCharacter state
      activeCharacter.name = newName;
      activeCharacter.tagline = newTagline;
      activeCharacter.personality = newPersonality;
      activeCharacter.greeting = newGreeting;
      activeCharacter.avatar = selectedBotAvatarUrl;

      // Update header
      if (activeCharName) activeCharName.innerText = newName;
      if (activeCharTagline) activeCharTagline.innerText = newTagline;
      if (activeCharAvatar) activeCharAvatar.src = selectedBotAvatarUrl;

      // Save to localStorage
      localStorage.setItem('ai_bot_name', newName);
      localStorage.setItem('ai_bot_tagline', newTagline);
      localStorage.setItem('ai_bot_personality', newPersonality);
      localStorage.setItem('ai_bot_greeting', newGreeting);
      localStorage.setItem('ai_bot_avatar', selectedBotAvatarUrl);

      // Re-render chips and messages if empty
      renderCharacterChips();
      renderCharacterModalList();
      const currentConv = conversations.find(c => c.id === activeConversationId);
      if (currentConv && currentConv.messages.length === 0) {
        renderMessages();
      }

      closeSettingsModal();
      showToast('AI Chatbox personality saved!');
    });
  }

  // Load saved AI Bot Persona on boot
  const savedBotName = localStorage.getItem('ai_bot_name');
  const savedBotTagline = localStorage.getItem('ai_bot_tagline');
  const savedBotPersonality = localStorage.getItem('ai_bot_personality');
  const savedBotGreeting = localStorage.getItem('ai_bot_greeting');
  const savedBotAvatar = localStorage.getItem('ai_bot_avatar');

  if (savedBotName) {
    activeCharacter.name = savedBotName;
    if (botInputName) botInputName.value = savedBotName;
    if (activeCharName) activeCharName.innerText = savedBotName;
  }
  if (savedBotTagline) {
    activeCharacter.tagline = savedBotTagline;
    if (botInputTagline) botInputTagline.value = savedBotTagline;
    if (activeCharTagline) activeCharTagline.innerText = savedBotTagline;
  }
  if (savedBotPersonality) {
    activeCharacter.personality = savedBotPersonality;
    if (botInputPersonality) botInputPersonality.value = savedBotPersonality;
  }
  if (savedBotGreeting) {
    activeCharacter.greeting = savedBotGreeting;
    if (botInputGreeting) botInputGreeting.value = savedBotGreeting;
  }
  if (savedBotAvatar) {
    activeCharacter.avatar = savedBotAvatar;
    selectedBotAvatarUrl = savedBotAvatar;
    if (botModalAvatarPreview) botModalAvatarPreview.src = savedBotAvatar;
    if (activeCharAvatar) activeCharAvatar.src = savedBotAvatar;
  }

  // Initial Boot
  initTheme();
  renderCharacterChips();
  renderCharacterModalList();
  renderHistory();
  renderMessages();
  updateSendButtonState();
});


