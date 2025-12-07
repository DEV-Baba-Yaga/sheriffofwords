# Sheriff of Words - Poems & Quotes Website

A beautiful, responsive static website for displaying romantic and motivational poems and quotes with an interactive playground feature.

## ✨ Features

### Core Features
- **Clean, Elegant Design**: Beautiful typography with smooth animations and 3D card effects
- **Dark Mode**: Toggle between light and dark themes with persistent localStorage
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Category Filtering**: Dropdown automatically populated with all categories from your content
- **Search & Filter**: Real-time debounced search across title, content, author, and category
- **Copy to Clipboard**: Copy poems and quotes with toast notifications
- **Keyboard Shortcuts**:
  - `Alt + 1`: Show all categories
  - `Alt + 2`: Filter Romantic
  - `Alt + 3`: Filter Motivational
  - `Alt + D`: Toggle dark mode
  - `Ctrl/Cmd + K`: Focus search

### Interactive Features
- **3D Card Effects**: Mouse-tracking tilt effects on hover
- **Staggered Animations**: Beautiful entry animations for cards
- **Poet's Playground**: Interactive sandbox where visitors can experiment with adding their own content (stored in localStorage only)

## 🚀 Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: JSON file (`data/content.json`)
- **Hosting**: GitHub Pages compatible
- **No Dependencies**: Pure vanilla code, no frameworks needed

## 📁 Project Structure

```
sheriffofwords/
├── index.html              # Main website page
├── playground.html         # Poet's Playground (interactive sandbox)
├── css/
│   ├── styles.css         # Main website styles with dark mode
│   └── playground.css     # Playground styles
├── js/
│   ├── app.js             # Main website logic
│   └── playground.js      # Playground logic
├── data/
│   └── content.json       # Content storage (poems & quotes)
├── README.md              # This file
├── POETS_PLAYGROUND_GUIDE.md    # Guide for the playground feature
└── HYBRID_MODE_GUIDE.md         # Technical guide for hybrid mode
```

## 🎯 Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your browser, or use a local server:

   **Using Python:**
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Using Node.js:**
   ```bash
   npx http-server
   ```

   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. Visit `http://localhost:8000` in your browser

### Managing Content

You can update your content by editing `data/content.json` directly:

```json
{
  "poems": [
    {
      "id": 1,
      "title": "Your Poem Title",
      "content": "Your poem content\nMultiple lines supported",
      "category": "romantic",
      "author": "Your Name",
      "date": "2025-01-15"
    }
  ],
  "quotes": [
    {
      "id": 1,
      "text": "Your inspirational quote",
      "category": "motivational",
      "author": "Author Name",
      "date": "2025-01-15"
    }
  ]
}
```

**Dynamic Categories**: Any category you add (like "inspirational", "friendship", etc.) will automatically appear in the dropdown filter!

## 🌐 Deploying to GitHub Pages

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it (e.g., "sheriff-of-words" or "my-poems")
3. Keep it **Public** (required for free GitHub Pages)
4. Don't initialize with README

### 2. Push Your Code

```bash
# Navigate to your project directory
cd sheriffofwords

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Sheriff of Words website"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes for deployment

### 4. Access Your Website

Your site will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

### Updating Your Website

To update content after deployment:

```bash
# Edit data/content.json with your changes

# Stage and commit
git add data/content.json
git commit -m "Update poems and quotes"

# Push to GitHub
git push
```

Changes will be live in 1-2 minutes!

## 🎨 Customization

### Change Colors

Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #e74c3c;          /* Red */
    --secondary-color: #3498db;        /* Blue */
    --romantic-color: #ff6b9d;         /* Pink */
    --motivational-color: #f39c12;     /* Orange */
}
```

### Change Site Title

Edit in `index.html`:
```html
<h1 class="site-title">Sheriff of Words</h1>
<p class="site-subtitle">A collection of thoughts presented to you in words.</p>
```

### Add New Categories

Simply add poems/quotes with new category names in `data/content.json`:
```json
{
  "id": 4,
  "title": "New Dawn",
  "content": "Your inspirational poem...",
  "category": "inspirational",
  "author": "Your Name",
  "date": "2025-01-16"
}
```

The "Inspirational" category will automatically appear in the dropdown!

## 🧩 Features in Detail

### Dynamic Category Dropdown
- Automatically extracts unique categories from your content
- No need to manually update HTML when adding new categories
- Alphabetically sorted
- Capitalized display names

### View Toggle
- **Poems**: Show only poems
- **Quotes**: Show only quotes
- Default: Shows both on page load

### Poet's Playground
- Interactive sandbox for visitors to experiment with adding their own poems and quotes
- Changes stored in browser's localStorage only (temporary and private)
- Original content remains safe and protected
- **Submit for Publication**: Visitors can email their creations to **sampleEmail@gmail.com** for review and potential permanent publication on the site
- Download JSON feature to save work locally
- Reset button to restore original content
- See [POETS_PLAYGROUND_GUIDE.md](./POETS_PLAYGROUND_GUIDE.md) for details

### Hybrid Mode
- Original content is protected (read-only)
- User-added content is editable/deletable
- Clear visual distinction with badges
- See [HYBRID_MODE_GUIDE.md](./HYBRID_MODE_GUIDE.md) for technical details

## 📮 Community Submissions

Visitors can submit their poems and quotes for permanent publication on the site!

### How to Submit

1. Visit the **Poet's Playground** on the live site
2. Create your poem or quote using the forms
3. Email your work to: **sampleEmail@gmail.com**
4. Include in your email:
   - Subject: "Poem Submission" or "Quote Submission"
   - The full text of your poem/quote
   - Category (Romantic or Motivational)
   - Your name or pen name (for author credit)

### Review Process

- All submissions are reviewed for quality and appropriateness
- Content must be free from explicit material and offensive language
- If approved, submissions are added to `data/content.json` and deployed
- Once published, they become permanent "ORIGINAL" content on the site

## 🔧 Browser Compatibility

- ✅ Chrome/Edge (Modern)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers
- ✅ Tablets

## 📝 License

Free to use for personal projects. Feel free to customize and make it your own!

## 💬 Support

For questions or issues:
1. Check the guides in this repository
2. Review the code comments
3. Create an issue on GitHub

---

Made with ❤️ for poetry and quotes lovers
