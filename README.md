# NovaAI - ChatGPT & Character.AI Style Chat Platform

A sleek, responsive, and aesthetic AI ChatBox interface combining the streamlined intelligence of **ChatGPT** with the immersive persona/character system of **Character.AI**.

---

## ✨ Features Included

- **Authentication System (Frontend)**:
  - Dedicated **Sign Up** page ([`signup.php`](file:///d:/User%20files/Downloads/AI_Chatbox/signup.php) / [`signup.html`](file:///d:/User%20files/Downloads/AI_Chatbox/signup.html)).
  - Dedicated **Log In** page ([`login.php`](file:///d:/User%20files/Downloads/AI_Chatbox/login.php) / [`login.html`](file:///d:/User%20files/Downloads/AI_Chatbox/login.html)) with password show/hide and remember me.
  - Dedicated **Forgot Password** page ([`forgot-password.php`](file:///d:/User%20files/Downloads/AI_Chatbox/forgot-password.php) / [`forgot-password.html`](file:///d:/User%20files/Downloads/AI_Chatbox/forgot-password.html)) with dynamic reset confirmation alerts.
  - Social SSO buttons (Google, GitHub) and theme sync.
- **ChatGPT-Style Settings Modal**:
  - Modal with navigation tabs: **General**, **Edit Profile**, **Personalization** (Custom instructions), **Data Controls**, and **Security**.
  - Toggle switches, dropdown controls, theme selectors, archive/wipe chats, and account deletion prompts.
- **Edit Profile Feature**:
  - Profile avatar selection with visual preset pills.
  - Editable display name, username, email, and bio.
  - Live updating of the sidebar profile card with toast feedback notifications.
- **Dark / Light Mode Toggle**:
  - One-click toggle in both the bottom sidebar, header, and auth pages.
  - Automatically saves preference in `localStorage`.
- **Character.AI Personas**:
  - Switch between distinct AI personalities (**ChatGPT Pro**, **Aria Starling** - Creative Storyteller, **Neo Codec** - Full-Stack Coder, **Zenith Mind** - Philosophy Mentor).
  - Dynamic avatar badges, greetings, custom persona prompt cards, and character selection modal.
- **Chat History & Session Management**:
  - Grouped conversation history (**Today**, **Previous 7 Days**).
  - **"+ New Chat"** button and `Ctrl+K` keyboard shortcut.
  - Rename and Delete actions on each chat session.
- **Responsive Composer & Message Stream**:
  - Auto-resizing textarea up to maximum height.
  - Enter to send, Shift+Enter for newline.
  - Quick prompt cards for instant questions.
  - Quick category chips (`Code`, `Explain`, `Story`, `Summarize`).
  - Realistic typing indicator & animated response stream.
  - Message action tools: **Copy text**, **Copy code block**, **Like / Dislike**, and **Regenerate**.
- **Database Schema Ready (`database.sql`)**:
  - Designed for MySQL, MariaDB, or SQLite.
  - Full relational architecture linking `users`, `characters`, `conversations`, and `messages`.

---

## 🚀 How to Run the Frontend

### Option 1: Using PHP's Built-in Server (Recommended)
Open PowerShell or your terminal in this directory:
```powershell
php -S localhost:8000
```
Then visit **`http://localhost:8000`** in your browser.

### Option 2: Direct Browser Opening
Simply double-click **`index.html`** or right-click &rarr; *Open with Google Chrome / Edge / Firefox*.

---

## 🗄️ Database Structure (`database.sql`)

The database script is pre-built and ready for the backend stage:

| Table | Purpose |
| :--- | :--- |
| **`users`** | Stores user accounts, avatar, and theme preference (`dark`/`light`). |
| **`characters`** | Stores Character.AI personas (name, tagline, greeting, system prompt, avatar). |
| **`conversations`** | Stores chat threads linked to a user and active persona. |
| **`messages`** | Stores conversation history (`role`: user/assistant, `content`, ratings, token counts). |

### Importing to MySQL / phpMyAdmin:
```bash
mysql -u root -p < database.sql
```

---

## 🛠️ Next Step: Backend Implementation

When you are ready to build the backend:
1. **PHP API**: Create REST endpoints (e.g., `api/chat.php`, `api/history.php`, `api/personas.php`) to query MySQL via PDO.
2. **Python Worker / Microservice**: Integrate local LLMs (via Ollama, Hugging Face, or LangChain) or cloud models (OpenAI / Google Gemini) using FastAPI or Flask to stream responses to PHP.
