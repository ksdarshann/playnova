# PLAYNOVA 4.0

A client-side, game-based learning arcade built with vanilla HTML, CSS and JavaScript. Designed for GitHub Pages.

## Game worlds
- Operations & Supply Chain: Warehouse Rush and Last-Mile Dispatch
- Business Management: Startup Sprint and Market Strategy
- Data & Analytics: Data Detective and Formula Forge
- Communication & Career: Client Quest and Interview RPG
- Finance: Budget Builder and Cashflow Crisis

## Gameplay
This is intentionally not a quiz-first website. Missions use inventory allocation, route selection, business resource management, dataset investigation, formula construction, branching dialogue, interview response practice and budget allocation.

## Deploy to GitHub Pages
1. Extract the ZIP.
2. Upload `index.html`, `styles.css`, `app.js`, and `README.md` to the root of your repository, replacing the old files.
3. Commit the changes to the `main` branch.
4. In GitHub, open **Settings → Pages** and ensure deployment is from `main` and `/ (root)`.
5. Wait for Pages to publish, then hard refresh your site with `Ctrl + F5`.

## Data and browser support
- No backend, API key or build step is required.
- Progress and XP are saved in browser `localStorage` on the current device/browser.
- Interview question playback uses the browser Speech Synthesis API when available. Typing always works.
- The activities are designed as compact learning simulations. They are not full commercial games or AI tutors.

## Customisation
Edit the world definitions and mission content in `app.js`. Styles are in `styles.css`.
