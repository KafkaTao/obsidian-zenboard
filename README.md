# Habit Tracker – Zenboard

Track, visualize, and maintain your daily habits directly in Obsidian. Build streaks, stay consistent, and keep everything in your vault.

## Features

- 📅 **Flexible habit types** – daily, weekly, or custom intervals
- 📊 **Progress tracking** – streak counters and visual charts
- ⚡ **Quick logging** – via ribbon icon, dashboard, or command palette
- 🗂 **Vault-first storage** – all data is saved locally in your vault
- 🌗 **Obsidian theme support**

## How to Use

1. Install and enable **Habit Tracker – Zenboard** from  
   **Settings → Community plugins → Browse**.
2. Open the dashboard via the ribbon icon or:
   - Command Palette → `Open zenboard`
3. Add your first habit with **+ Add Habit**.
4. Log progress daily and watch your streak grow.

> **Tip:** You can pin the dashboard as a side pane for quick access.

## Screenshots

### Dashboard
![Zenboard Dashboard](docs/screenshot-dashboard.png)

### Monthly Analytics 
![Zenboard Monthly Overview](docs/screenshot-monthly-overview.png)

### Yearly Analytics 
![Zenboard Yearly Overview](docs/screenshot-yearly-overview.png)

### All Habits View 
![Zenboard All Habits ](docs/screenshot-all-habits.png)



## For Developers

If you want to contribute or customize the plugin:

```bash
# Clone the repository into your vault’s plugins folder
git clone https://github.com/shadabdullah/obsidian-zenboard .obsidian/plugins/zenboard

cd .obsidian/plugins/zenboard
npm install

# Development: watch JS + Tailwind CSS for live updates
npm run dev:watch

# Build once for production (generates JS + CSS)
npm run build

# Clean build: remove old files and rebuild everything
npm run clean-build
