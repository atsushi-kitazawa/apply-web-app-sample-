# Apply Web App Sample

A Nuxt 3 + TypeScript sample application that implements a simple application flow: create an application, list applications, and view application details.

This project was generated using Codex.

## Features
- Application submission form
- Application list view
- Application detail view
- TypeScript-based backend using Nuxt server routes
- In-memory data store (resets on server restart)

## Tech Stack
- Nuxt 3
- TypeScript

## Project Structure
- `pages/index.vue`: Application list
- `pages/apply/index.vue`: Application form
- `pages/apply/[id].vue`: Application detail
- `server/api/applications/index.get.ts`: List API
- `server/api/applications/index.post.ts`: Create API
- `server/api/applications/[id].get.ts`: Detail API
- `server/storage/applications.ts`: In-memory storage

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open the app at `http://localhost:3000`.

## Notes
- Data is stored in memory. Restarting the server clears all applications.

## License
MIT
