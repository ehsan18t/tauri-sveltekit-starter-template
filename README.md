# Tauri + SvelteKit Starter Template

A modern, full-featured starter template for building desktop applications with Tauri 2 and SvelteKit.

## Features

- 🚀 **Tauri 2** - Build smaller, faster, and more secure desktop applications
- ⚡ **SvelteKit** - The fastest way to build svelte apps
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🌙 **Dark/Light Theme** - Built-in theme switching with system preference detection
- 🎭 **Custom Titlebar** - Beautiful, native-feeling window controls
- 🔧 **TypeScript** - Full type safety
- 📦 **Modern Build Tools** - Vite, ESLint, Prettier

## Quick Start

1. **Clone and install**
   ```bash
   git clone https://github.com/yourusername/tauri-sveltekit-starter.git
   cd tauri-sveltekit-starter
   npm install
   ```

2. **Development**
   ```bash
   npm run tauri:dev
   ```

3. **Build**
   ```bash
   npm run tauri:build
   ```

## Development

### Commands
- `npm run dev` - Start frontend development server
- `npm run tauri:dev` - Start Tauri development with hot reload
- `npm run build` - Build frontend for production
- `npm run tauri:build` - Build Tauri app for production
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint

### Project Structure
```
├── src/                    # Frontend source
│   ├── lib/               # Shared components and utilities
│   │   ├── components/    # Reusable components
│   │   ├── stores/        # Svelte stores
│   │   └── config/        # App configuration
│   ├── routes/            # SvelteKit routes
│   └── app.html           # HTML template
├── src-tauri/             # Tauri backend
├── static/                # Static assets
└── README.md
```

## Customization

### Theme
Edit `src/app.css` to customize colors and design tokens.

### App Configuration
Update `src/lib/config/app.ts` for app metadata and settings.

### Window Settings
Modify `src-tauri/tauri.conf.json` for window behavior and permissions.

## License

MIT License - see LICENSE file for details.