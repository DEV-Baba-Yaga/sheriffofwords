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

### Updating content

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

## 🧩 Features in Detail

### Dynamic Category Dropdown

- Automatically extracts unique categories from your content
- No need to manually update HTML when adding new categories

### View Toggle

- **Poems**: Show only poems
- **Quotes**: Show only quotes
- Default: Shows both on page load

### Poet's Playground

- Interactive sandbox for visitors to experiment with adding their own poems and quotes
- Original content remains safe and protected

## 📮 Community Submissions

Visitors can submit their poems and quotes for permanent publication on the site!

## 📝 License

Free to use for personal projects. Feel free to customize and make it your own!

---

Made with ❤️ for poetry and quotes.
