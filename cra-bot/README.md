# Claim Remedy AI Bot — Setup Instructions

## Files
- `system-prompt.js` — The bot's brain. Built from your actual process docs.
- `api/chat.js` — Vercel serverless function. This is the backend.
- `chat-frontend.js` — Drop into your site's JS. Handles sending/receiving messages.

---

## Setup (5 steps)

### 1. Install the Anthropic SDK
In your project root:
```bash
npm install @anthropic-ai/sdk
```

### 2. Add your API key to Vercel
In your Vercel dashboard → Project Settings → Environment Variables:
```
ANTHROPIC_API_KEY = sk-ant-...your key here...
```
Get your key at: https://console.anthropic.com/

### 3. Add the files to your project
```
your-project/
  api/
    chat.js          ← paste this file here
  system-prompt.js   ← paste this file here
  chat-frontend.js   ← paste or import into your existing JS
```

### 4. Update the selectors in chat-frontend.js
Find the lines that say things like:
```js
document.querySelector('.chat-input textarea')
```
And replace with whatever CSS classes your chat widget actually uses.

### 5. Deploy
Push to GitHub — Vercel will auto-deploy. The `/api/chat` endpoint will be live.

---

## Testing
Once deployed, open your site, open the chat, and ask:
- "What does Claim Remedy do?"
- "How long does a claim take?"
- "What is ACV vs RCV?"
- "What happens after the inspection?"

The bot knows your full process.
