-- ===================================================
-- AI ChatBox Database Schema
-- Compatible with MySQL 8.0+ / MariaDB / SQLite
-- ===================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `display_name` VARCHAR(100) DEFAULT 'User',
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NULL,
    `avatar_url` VARCHAR(255) DEFAULT 'assets/default-user.png',
    `bio` TEXT NULL,
    `theme_preference` ENUM('dark', 'light', 'system') DEFAULT 'dark',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. AI Characters / Personas Table (Character.AI Style)
CREATE TABLE IF NOT EXISTS `characters` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `tagline` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `system_prompt` TEXT NOT NULL,
    `greeting_message` TEXT NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `badge` VARCHAR(50) DEFAULT 'General',
    `is_default` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Conversations (Chat Sessions) Table
CREATE TABLE IF NOT EXISTS `conversations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT DEFAULT 1,
    `character_id` INT NOT NULL,
    `title` VARCHAR(200) NOT NULL DEFAULT 'New Conversation',
    `is_pinned` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_conv_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_conv_char` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Messages History Table
CREATE TABLE IF NOT EXISTS `messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `conversation_id` INT NOT NULL,
    `role` ENUM('user', 'assistant', 'system') NOT NULL,
    `content` LONGTEXT NOT NULL,
    `tokens_used` INT DEFAULT 0,
    `rating` TINYINT DEFAULT NULL COMMENT '1 for like, -1 for dislike',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_msg_conv` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================================
-- Initial Seed Data
-- ===================================================

-- Insert Default Demo User
INSERT INTO `users` (`id`, `username`, `email`, `avatar_url`, `theme_preference`)
VALUES (1, 'User', 'user@example.com', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'dark')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- Insert Popular AI Personas
INSERT INTO `characters` (`id`, `name`, `tagline`, `description`, `system_prompt`, `greeting_message`, `avatar`, `badge`, `is_default`) VALUES
(1, 'ChatGPT Pro', 'Smart, helpful, and versatile AI assistant', 'General AI reasoning assistant specializing in answering questions, coding, research, and analysis.', 'You are ChatGPT, a large language model trained by OpenAI. Respond thoughtfully, accurately, and clearly.', 'Hello! How can I help you today? Ask me anything from coding to creative writing.', 'https://api.dicebear.com/7.x/bottts/svg?seed=ChatGPT&backgroundColor=10b981', 'Intelligence', 1),
(2, 'Aria Starling', 'Imaginative fantasy novelist & creative partner', 'An expressive, world-building author who weaves magical stories, character dialogues, and plots.', 'You are Aria Starling, an enthusiastic and poetic fantasy novelist.', 'Greetings adventurer! Where shall our story take us today? Describe a world or a character, and let us bring it to life.', 'https://api.dicebear.com/7.x/bottts/svg?seed=Aria&backgroundColor=ec4899', 'Creative', 0),
(3, 'Neo Codec', 'Senior Full-Stack Architect & Debugger', 'Specialized in Python, PHP, JavaScript, SQL, system architecture, and fixing tough bugs.', 'You are Neo Codec, an elite software engineer. Provide concise code examples, clear logic, and best practices.', 'Ready to build. Paste your code, error trace, or architecture goal, and let\'s solve it.', 'https://api.dicebear.com/7.x/bottts/svg?seed=Neo&backgroundColor=3b82f6', 'Coding', 0),
(4, 'Zenith Mind', 'Philosophy, critical thought & mindful mentor', 'A calm thinker helping you reflect, brainstorm decisions, and explore ideas.', 'You are Zenith, a thoughtful mentor blending mindfulness and Socratic inquiry.', 'Welcome. Take a deep breath. What questions or thoughts are currently occupying your mind?', 'https://api.dicebear.com/7.x/bottts/svg?seed=Zenith&backgroundColor=8b5cf6', 'Philosophy', 0)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- Insert Initial Demo Conversations
INSERT INTO `conversations` (`id`, `user_id`, `character_id`, `title`, `created_at`) VALUES
(1, 1, 1, 'Web Development Roadmap', NOW() - INTERVAL 1 HOUR),
(2, 1, 3, 'Python & PHP Architecture', NOW() - INTERVAL 5 HOUR),
(3, 1, 2, 'Sci-Fi Cyberpunk Novel Plot', NOW() - INTERVAL 2 DAY)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- Insert Sample Chat Messages
INSERT INTO `messages` (`conversation_id`, `role`, `content`, `created_at`) VALUES
(1, 'user', 'What are the best practices for building an AI chat application frontend?', NOW() - INTERVAL 55 MINUTE),
(1, 'assistant', 'To build an intuitive AI chat application like ChatGPT and Character.AI, focus on:\n\n1. **Responsive Dual-Pane Layout**: Collapsible sidebar for chat history and personas.\n2. **Dynamic Theming**: Seamless Dark/Light mode switching with CSS custom variables.\n3. **Engaging Stream Feedback**: Typing indicators, markdown formatting, and copy-to-clipboard buttons.\n4. **Persona Personalization**: Clear character badges, distinct avatars, and customizable greeting prompts.', NOW() - INTERVAL 54 MINUTE)
ON DUPLICATE KEY UPDATE `id`=`id`;
