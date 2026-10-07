# ITDA Paderu — Official Reference Web Portal & AI Assistant

An official-style, fully static informational website and local RAG AI Assistant for the **Integrated Tribal Development Agency (ITDA) Paderu**, Alluri Sitharama Raju (ASR) District, Andhra Pradesh.

Built using **ONLY Vanilla HTML5, CSS3, JavaScript, and Direct Frontend Ollama API Integration** — No React, No Angular, No Node.js backend, No Express, No PHP, and No Database.

---

## 📁 Project Directory Structure

```text
ITDA-PADERU/
│
├── index.html                     # Main portal homepage
│
├── templates/                     # All section & sector pages
│   ├── about.html                 # About ITDA, Vision & Mission
│   ├── administration.html        # Administrative Structure & PO role
│   ├── departments.html           # 12 Coordinated Line Departments
│   ├── education.html             # Ashram Schools, Super 50 & Hostels
│   ├── health.html                # Healthcare & Maternal Nutrition
│   ├── agriculture.html           # Organic Agriculture & Minimuluru Coffee
│   ├── tribal-welfare.html        # Community Welfare & PVTG Groups
│   ├── women-child-welfare.html   # Anganwadi & Child Nutrition
│   ├── rural-development.html     # Rural Roads & MGNREGA Works
│   ├── infrastructure.html        # TWEW School Buildings & Quarters
│   ├── land-records.html          # LTR 1/70 & RoFR Forest Rights
│   ├── forest-environment.html    # Biodiversity & Minor Forest Produce
│   ├── skill-development.html     # YTC Paderu Vocational Training
│   ├── schemes.html               # Welfare & Agricultural Schemes
│   ├── scholarships.html          # Jnanabhumi Scholarship Guidance
│   ├── services.html              # Citizen Services Directory
│   ├── officers.html              # Key Officers Directory (Placeholders)
│   ├── contact.html               # Office Location & Hours
│   ├── grievance.html             # Public Grievance Demo Form
│   └── faq.html                   # Frequently Asked Questions Accordion
│
├── css/                           # Modular CSS Files
│   ├── style.css                  # Global tokens, reset, typography, buttons
│   ├── navbar.css                 # Government bar, branding, header navigation
│   ├── footer.css                 # Government footer & disclaimers
│   ├── pages.css                  # Hero banners, card grids, org tree, forms
│   ├── responsive.css             # Tablet & mobile media query breakpoints
│   └── chatbot.css                # AI Chatbot widget, dialog window & chips
│
├── js/                            # Modular JavaScript Files
│   ├── data.js                    # Nav links, UI strings, knowledge base RAG
│   ├── navbar.js                  # Dynamic header loading & relative paths
│   ├── footer.js                  # Dynamic footer loading
│   ├── search.js                  # Fast client-side website search modal
│   ├── ollama.js                  # Direct browser fetch to Ollama API
│   ├── chatbot.js                 # Floating chat widget & RAG retriever
│   └── main.js                    # Component & accordion event initializer
│
├── assets/                        # Static Assets
│   ├── images/                    # Photo galleries & hero sliders
│   ├── icons/                     # Vector icons
│   └── logos/                     # Government emblems & logos
│
└── README.md                      # Documentation & Setup Guide
```

---

## 🚀 How to Run the Website

Because this project is built with static web standards, you can view it directly in any modern browser:

### Option 1: Using a Local Web Server (Recommended)
Running through a local web server resolves browser `file://` security origin restrictions:

**Using Python:**
```bash
cd itda-site
python -m http.server 8000
```
Open your browser at: `http://localhost:8000`

**Using Node `serve`:**
```bash
npx serve .
```

**Using VS Code:**
Install the **Live Server** extension, right-click `index.html`, and select **Open with Live Server**.

---

## 🤖 Ollama AI Chatbot Setup Guide

The website features an AI Chatbot widget available on all pages. It communicates directly from your browser to a local **Ollama** LLM server running on your computer.

### Step 1: Install Ollama
Download and install Ollama for your operating system from:
[https://ollama.com/download](https://ollama.com/download)

### Step 2: Enable CORS for Browser Access
Since the frontend JavaScript calls `http://localhost:11434/api/chat` directly from the browser, Ollama must allow Cross-Origin Resource Sharing (CORS):

**On Windows (PowerShell / Command Prompt):**
```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

**On Linux / macOS:**
```bash
OLLAMA_ORIGINS="*" ollama serve
```

### Step 3: Pull the Required Model
Open your terminal and run:
```bash
ollama pull llama3.2
```

### Step 4: Configure Model in Code (Optional)
If you wish to use a different model (e.g., `mistral`, `gemma2`, `phi3`), update `js/ollama.js`:
```javascript
const OLLAMA_CONFIG = {
  baseUrl: "http://localhost:11434",
  model: "llama3.2" // Change to your installed model
};
```

---

## 💡 How the AI Chatbot Works

1. **RAG Context Grounding:** Before sending a question to Ollama, `js/chatbot.js` extracts verified context from `itdaKnowledge` in `js/data.js`.
2. **System Prompt Protection:** Ensures the AI answers *only* using provided ITDA Paderu facts and never fabricates officer names, contact details, or scheme eligibility rules.
3. **Bilingual Support:** Automatically responds in **Telugu** when queried in Telugu, and **English** when queried in English.
4. **Offline Fallback:** If Ollama is offline or not installed, the chatbot automatically switches to the built-in local Knowledge Base matcher so users always receive helpful answers!

---

## 🌐 Language Switching (English / Telugu)

All pages support dynamic language toggling without page rewrites:
- Language preferences (`'en'` or `'te'`) are stored in `localStorage.getItem('itda_lang')`.
- UI strings and navigation titles are populated dynamically via `UI_STRINGS` in `js/data.js`.

To add new Telugu translations:
1. Open `js/data.js`.
2. Add your new key under `UI_STRINGS.te` or inside the `itdaKnowledge` object.

---

## 📌 Important Security & Disclaimer Notes

- **No Fake Official Data:** No real officer phone numbers, personal email IDs, or specific land survey numbers are fabricated. Official placeholders like `[Official Name]` and `[Official Contact]` are used.
- **Grievance Form:** The grievance page contains a frontend demo form with an explicit notice: *"Demo form only — backend integration required for actual submission."*
