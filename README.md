# PLAYNOVA

A personal, browser-based learning arcade. Play short quizzes and practical challenges across Communication, Business, Analytics, Operations, Finance, Technology and General Knowledge.

## Run locally
1. Extract `PLAYNOVA.zip`.
2. Open `index.html` in a modern browser.
3. No installation, build step, API key or server is required.

## Publish on GitHub Pages
1. Create a new public GitHub repository (for example, `playnova`).
2. Upload `index.html`, `styles.css`, `app.js` and this README to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. Wait for GitHub Pages to publish your site.

## Included
- Responsive dark gaming dashboard
- Seven learning worlds and 15 playable quiz sets
- Communication world: English Arena, Conversation Quest and Interview Simulator
- Multiple-choice questions with instant explanations
- XP, levels, daily streak and recent activity
- Local progress persistence using browser `localStorage`

## Notes
- Progress is stored locally in the browser on the device where you play. It does not sync between devices.
- Google Fonts are loaded from Google when internet access is available; the site uses fallback fonts if not.
- This is a functional starter release. Review educational content and expand question banks as you use it.
- Clear browser site data to reset saved progress.


## Version 3.0 additions
- SpeakUp Voice Coach: microphone speech-to-text where supported and browser text-to-speech for prompts; typed fallback always available.
- Mock Interview Arena: multi-question interview practice with a structured local feedback checklist.
- Excel Formula Playground: sample spreadsheet data and a safe mini formula evaluator for SUM, AVERAGE, MIN, MAX, COUNT and SUMIF.
- SQL Query Lab: sample orders database and a constrained SELECT sandbox supporting WHERE equality, ORDER BY, LIMIT and GROUP BY with SUM/AVG/COUNT.
- Startup Tycoon: four-round business management simulation with cash, demand, service quality and customer trust metrics.

## Browser compatibility
- Core website and labs work in modern browsers without a backend.
- Voice capture uses the browser Web Speech API where available (typically Chrome/Edge with microphone permission). If unavailable, type your response instead.
- Voice feedback is a local checklist, not an AI assessment or pronunciation/accent scoring.
- SQL and spreadsheet tools intentionally support a limited teaching subset, not full Excel or a production database.
