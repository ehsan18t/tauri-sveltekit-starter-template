# Tauri + SvelteKit Starter Template

A modern, full-featured starter template for building desktop applications with Tauri 2 and SvelteKit.

## Features

- 🚀 **Tauri 2** - Build smaller, faster, and more secure desktop applications.
- ⚡ **SvelteKit** - The fastest way to build svelte apps.
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework.
- 🌟 **Icons**: Easily use thousands of icons from [Iconify](https://iconify.design/).
- 🌙 **Dark/Light Theme** - Built-in theme switching with system preference detection.
- 🎭 **Custom Titlebar** - Beautiful, native-feeling window controls.
- 🔧 **TypeScript** - Full type safety.
- 📦 **Modern Build Tools** - Vite, ESLint, Prettier.

## Quick Start

1. **Clone and install**
   ```bash
   git clone https://github.com/yourusername/tauri-sveltekit-starter.git
   cd tauri-sveltekit-starter
   bun install
   ```

2. **Development**
   ```bash
   bun run tauri:dev
   ```

3. **Build**
   ```bash
   bun run tauri:build
   ```

## Development

### Commands

This template comes with a set of pre-configured scripts to help you with development and maintenance.

| Command                | Description                                                                           |
| :--------------------- | :------------------------------------------------------------------------------------ |
| `bun run dev`          | Starts the Tauri development server with hot-reloading for both frontend and backend. |
| `bun run build`        | Builds and bundles the application for production.                                    |
| `bun run build:debug`  | Creates a debug build of the application.                                             |
|                        |                                                                                       |
| `bun run format`       | Formats all source files with Prettier.                                               |
| `bun run format:check` | Checks for formatting errors without modifying files.                                 |
| `bun run lint`         | Lints the source files using ESLint.                                                  |
| `bun run lint:fix`     | Lints and automatically fixes problems.                                               |
| `bun run check`        | Runs the Svelte type-checker.                                                         |
| `bun run validate`     | Runs all quality checks: format, lint, and type-check.                                |
|                        |                                                                                       |
| `bun run clean`        | Removes all build artifacts and temporary directories.                                |
| `bun run prepare`      | SvelteKit's command to generate types                                                 |

### Project Structure
```
├── src/                   # Frontend source
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
Modify `src-tauri/tauri.conf.json` and `src-tauri/Cargo.toml` for window behavior and permissions.

## License

MIT License - see LICENSE file for details.