# 🎭 AvatarPro Studio

A premium, high-fidelity Avatar Generator built with **React**, **Vite**, and **Tailwind CSS v4**. Create, customize, and mix unique avatars for your projects with a professional glassmorphism interface.

![AvatarPro Preview](https://raw.githubusercontent.com/dicebear/brand/main/src/logo.svg)

## ✨ Features

- **🚀 Multiple Styles**: Seamlessly toggle between **DiceBear (SVG)** illustrations and **RandomUser (Photo)** portraits.
- **🎨 Color Hub (Generator)**: Generate random accent themes and apply them globally in real-time. Copy HEX/RGB codes instantly.
- **🧪 Avatar Mixer**: Combine two different seeds with a weighted slider to create unique hybrid avatars.
- **🌟 Mood Profiles**: Quick-access curated presets for different "vibes" (Hacker, Mystic, Professional, etc.).
- **💾 Persistence**: Built-in **Favorites** and **History** systems using `localStorage`.
- **⚡ Public-Ready API**: Every avatar has a persistent API URL ready for use in your personal or commercial projects.
- **💎 Premium UX**: Features glassmorphism, noise texture overlays, and smooth Framer Motion animations.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://reactjs.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **APIs**: [DiceBear](https://dicebear.com/), [RandomUser](https://randomuser.me/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/avatar-generator.git
   cd avatar-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
src/
 ├── components/       # UI Elements (Buttons, History, Favorites, etc.)
 ├── hooks/            # Custom logic (useAvatar for state management)
 ├── utils/            # Helper functions (getAvatarUrl, generateSeed)
 ├── App.jsx           # Main Dashboard Layout
 └── index.css         # Global styles & Tailwind v4 config
```

## 📜 Credits

- [DiceBear](https://dicebear.com/) - For the amazing SVG avatar styles.
- [RandomUser](https://randomuser.me/) - For the high-quality real-life portraits.
- [Lucide](https://lucide.dev/) - For the beautiful iconography.

---

Designed with ❤️ for Builders & Designers.
