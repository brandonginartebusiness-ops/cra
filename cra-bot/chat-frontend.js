// ============================================================
// CLAIM REMEDY — AI CHAT WIDGET FRONTEND
// Drop this into your existing chat JS or replace handleSend
// ============================================================

// Generate a session ID so the bot remembers context within a visit
const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);

// Track full conversation for display
const chatMessages = [];

// ---- Replace your existing handleSend with this ----
async function handleSend() {
  const input = document.querySelector('.chat-input textarea')
             || document.querySelector('#chat-input')
             || document.querySelector('[data-chat-input]');

  const messageText = input ? input.value.trim() : '';
  if (!messageText) return;

  // Clear input
  if (input) {
    input.value = '';
    input.style.height = 'auto'; // reset textarea height if auto-expanding
  }

  // Update char count if you have one
  const charCount = document.querySelector('.char-count')
                 || document.querySelector('[data-char-count]');
  if (charCount) charCount.textContent = '0 / 2000';

  // Display user message in chat
  appendMessage('user', messageText);

  // Show typing indicator
  const typingIndicator = showTyping();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: messageText, sessionId }),
    });

    const data = await response.json();

    // Remove typing indicator
    if (typingIndicator) typingIndicator.remove();

    if (data.reply) {
      appendMessage('assistant', data.reply);
    } else {
      appendMessage('assistant', data.error || 'Something went wrong. Please try again.');
    }
  } catch (err) {
    if (typingIndicator) typingIndicator.remove();
    appendMessage('assistant', 'Connection issue. Please try again or call us at (786) 223-7867.');
    console.error('Chat error:', err);
  }
}

// ---- Append a message bubble to the chat window ----
function appendMessage(role, text) {
  // Find your chat messages container — update the selector to match your HTML
  const container = document.querySelector('.chat-messages')
                 || document.querySelector('.messages-container')
                 || document.querySelector('[data-messages]');

  if (!container) {
    console.warn('Chat message container not found. Update the selector in chat-frontend.js');
    return;
  }

  const bubble = document.createElement('div');
  bubble.classList.add('chat-bubble', role === 'user' ? 'user-bubble' : 'bot-bubble');

  // Convert line breaks and basic markdown-style bold to HTML
  const formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  bubble.innerHTML = formatted;
  container.appendChild(bubble);

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

// ---- Typing indicator (three dots) ----
function showTyping() {
  const container = document.querySelector('.chat-messages')
                 || document.querySelector('.messages-container')
                 || document.querySelector('[data-messages]');
  if (!container) return null;

  const indicator = document.createElement('div');
  indicator.classList.add('chat-bubble', 'bot-bubble', 'typing-indicator');
  indicator.innerHTML = '<span></span><span></span><span></span>';
  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
  return indicator;
}

// ---- Wire up the send button and Enter key ----
document.addEventListener('DOMContentLoaded', () => {
  // Update these selectors to match your existing HTML
  const sendBtn = document.querySelector('.send-btn')
               || document.querySelector('[data-send]')
               || document.querySelector('#send-button');

  const input = document.querySelector('.chat-input textarea')
             || document.querySelector('#chat-input')
             || document.querySelector('[data-chat-input]');

  if (sendBtn) {
    sendBtn.addEventListener('click', handleSend);
  }

  if (input) {
    input.addEventListener('keydown', (e) => {
      // Enter sends, Shift+Enter adds a new line
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
  }

  // Send an opening message from the bot when chat opens
  const chatPanel = document.querySelector('.chat-panel')
                 || document.querySelector('[data-chat-panel]');

  if (chatPanel) {
    const observer = new MutationObserver(() => {
      const isOpen = chatPanel.classList.contains('open')
                  || chatPanel.style.display !== 'none';
      if (isOpen && chatMessages.length === 0) {
        setTimeout(() => {
          appendMessage('assistant',
            "Hi! I'm the Claim Remedy AI assistant. I can walk you through the insurance claims process, explain your rights as a homeowner, and help you understand what to expect. What questions do you have?"
          );
        }, 400);
      }
    });
    observer.observe(chatPanel, { attributes: true, attributeFilter: ['class', 'style'] });
  }
});

// ============================================================
// CSS TO ADD TO YOUR STYLESHEET (or <style> tag)
// ============================================================
/*
.chat-bubble {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 16px;
  margin-bottom: 10px;
  line-height: 1.5;
  font-size: 14px;
  word-break: break-word;
}

.user-bubble {
  background: var(--accent, #d4af37);
  color: #000;
  margin-left: auto;
  border-bottom-right-radius: 4px;
}

.bot-bubble {
  background: rgba(255,255,255,0.08);
  color: var(--text-primary, #fff);
  margin-right: auto;
  border-bottom-left-radius: 4px;
}

.typing-indicator span {
  display: inline-block;
  width: 7px;
  height: 7px;
  background: #aaa;
  border-radius: 50%;
  margin: 0 2px;
  animation: bounce 1.2s infinite ease-in-out;
}
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}
*/
