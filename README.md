# 🌌 Code Reviewer IDE

A high-fidelity, web-based Progressive AI Code Reviewer featuring a **Glassmorphism aesthetic**, a dark **Dracula** theme, and an interactive **3D Three.js** background.

![Code Reviewer Preview](file://C:/Users/acer/.gemini/antigravity/brain/e5bb81cc-3afa-4312-b470-21c5f4e4de17/final_ai_review_output_1774463625877.png)

## ✨ Features

- **🧠 Multi-Engine AI Review**: Powered by Groq (Llama-3) and Google Gemini for deep code analysis.
- **🛡️ Industry Standard Themes**: Fully responsive Dracula and Light modes.
- **🖱️ Draggable Workspace**: Floating, interactive editor window for a personalized layout.
- **✨ Retro Terminal**: Real-time cyberpunk-style AI logs and feedback.
- **🚀 Unified Launcher**: Single-command startup for both Frontend and Backend.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A valid **Groq API Key** (Get it at [console.groq.com](https://console.groq.com/))
- A valid **Google Gemini API Key** (Get it at [aistudio.google.com](https://aistudio.google.com/))

---

## 🚀 Installation & Setup

### 1. Clone the Project
```bash
git clone https://github.com/vashuvermamarch/Code-Reviewer.git
cd Code-Reviewer
```

### 2. Install Dependencies
Run the install command in both the `FrontEnd` and `BackEnd` directories:

```bash
# Install Backend dependencies
cd BackEnd && npm install && cd ..

# Install Frontend dependencies
cd FrontEnd && npm install && cd ..
```

### 3. Configure Environment Variables
Create a `.env` file inside the `BackEnd` directory:

```bash
# BackEnd/.env
GROQ_API_KEY=your_groq_key_here
GOOGLE_GEMINI_KEY=your_gemini_key_here
```

---

## 🏃 How to Run

We've provided a **Unified Launcher** to make starting the project seamless.

### Windows (Easiest)
Simply double-click:
- `launch.bat`

### Linux / macOS
Run the build script:
```bash
chmod +x build.sh
./build.sh
```

### Manual Command
You can also run the unified launcher directly using Node:
```bash
node launcher.js
```

The IDE will be available at: **http://localhost:5173**

---

## 📂 Project Structure

- `FrontEnd/`: React + Vite + Tailwind CSS v4 application.
- `BackEnd/`: Express.js server interfacing with AI SDKs.
- `launcher.js`: Unified process manager for single-terminal execution.
- `launch.bat`: Windows shortcut for the launcher.

---

## ⚙️ IDE Customization

Open the **Settings** (Gear icon in Sidebar) to:
- Change Font Size.
- Toggle between **Dracula** and **Light** themes.
- Select your preferred AI Model.

---

## 🤝 Contributing
Feel free to fork this project and submit PRs for any features (like the upcoming History and Search modules!).

---

## 📄 License
This project is licensed under the MIT License.
