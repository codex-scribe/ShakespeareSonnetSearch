# Shakespeare Sonnet Search

A beautiful, interactive website for searching and exploring Shakespeare's complete collection of 154 sonnets. Search by themes, imagery, or any text within the sonnets.

## Features

- **Text Search**: Search for any word or phrase across all sonnets
- **Theme Filtering**: Filter sonnets by themes such as death, love, beauty, time, age, youth, immortality, grief, war, fortune, memory, and loss
- **Imagery Filtering**: Find sonnets containing specific imagery like flowers, jewels, body parts, nature, water, birds, fire, stars, seasons, monuments, and war
- **Active Filter Management**: See and remove active filters with a single click
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Modern UI**: Clean, elegant interface with smooth animations

## Local Development

To view the website locally:

1. **Using Python** (recommended):
   ```bash
   python3 -m http.server 8000
   ```
   Then open http://localhost:8000 in your browser

2. **Using Node.js**:
   ```bash
   npx http-server -p 8000
   ```

3. **Using PHP**:
   ```bash
   php -S localhost:8000
   ```

## Deployment to GitHub Pages

### Method 1: Using GitHub's Web Interface

1. Create a new repository on GitHub (e.g., `ShakespeareSonnetSearch`)

2. Upload all files to the repository:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `sonnets-data.js`
   - `README.md`

3. Go to your repository settings

4. Navigate to **Pages** in the left sidebar

5. Under **Source**, select the branch (usually `main` or `master`) and folder (`/ (root)`)

6. Click **Save**

7. Your site will be available at: `https://[your-username].github.io/ShakespeareSonnetSearch/`

### Method 2: Using Git Command Line

1. Initialize a git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Shakespeare Sonnet Search"
   ```

2. Create a repository on GitHub and add it as a remote:
   ```bash
   git remote add origin https://github.com/[your-username]/ShakespeareSonnetSearch.git
   git branch -M main
   git push -u origin main
   ```

3. Follow steps 3-7 from Method 1 above

### Important Notes

- GitHub Pages serves static files only (HTML, CSS, JavaScript)
- The site uses client-side JavaScript, so no backend is needed
- All sonnet data is included in `sonnets-data.js`
- The site will automatically update when you push changes to the repository

## Project Structure

```
ShakespeareSonnetSearch/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── app.js             # Search functionality and UI logic
├── sonnets-data.js    # Sonnet data with themes and imagery metadata
└── README.md          # This file
```

## Adding More Sonnets

The current `sonnets-data.js` file includes a sample of sonnets. To add all 154 sonnets:

1. Each sonnet should follow this structure:
   ```javascript
   {
     number: 1,
     text: `Full sonnet text here...`,
     themes: ['theme1', 'theme2'],
     imagery: ['imagery1', 'imagery2']
   }
   ```

2. Add all sonnets to the `sonnetsData` array in `sonnets-data.js`

3. Tag each sonnet with relevant themes and imagery for better searchability

## Customization

### Adding New Themes or Imagery Types

1. Add new filter buttons in `index.html`:
   - For themes: Add to the `#theme-tab .filter-buttons` section
   - For imagery: Add to the `#imagery-tab .filter-buttons` section

2. Tag sonnets in `sonnets-data.js` with the new categories

3. The search functionality will automatically work with the new filters

### Styling

Modify `styles.css` to customize:
- Colors (see CSS variables at the top)
- Fonts
- Layout and spacing
- Animations

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## License

This project is open source and available for educational and personal use.

## Credits

- Sonnets by William Shakespeare
- Built for GitHub Pages deployment

