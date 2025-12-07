// State management
let state = {
    poems: [],
    quotes: [],
    currentFilter: 'all',
    currentView: 'both',
    searchQuery: '',
    theme: localStorage.getItem('theme') || 'light'
};

// DOM elements
const poemsContainer = document.getElementById('poemsContainer');
const quotesContainer = document.getElementById('quotesContainer');
const poemsSection = document.getElementById('poemsSection');
const quotesSection = document.getElementById('quotesSection');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const viewButtons = document.querySelectorAll('.view-btn');
const themeToggle = document.getElementById('themeToggle');

// Initialize app
async function init() {
    initTheme();
    await loadContent();
    populateCategoryDropdown();
    setupEventListeners();
    renderContent();
}

// Initialize theme
function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
}

// Load content from localStorage (if available) or JSON file
async function loadContent() {
    try {
        // Check if there's saved data from Poet's Playground in localStorage
        const savedData = localStorage.getItem('poemsQuotesData');

        if (savedData) {
            // Load from localStorage (user's temporary playground data)
            const data = JSON.parse(savedData);
            state.poems = data.poems || [];
            state.quotes = data.quotes || [];
        } else {
            // Load from JSON file (original website content)
            const response = await fetch('data/content.json');
            const data = await response.json();
            state.poems = data.poems || [];
            state.quotes = data.quotes || [];
        }
    } catch (error) {
        console.error('Error loading content:', error);
        showError('Failed to load content. Please try again later.');
    }
}

// Populate category dropdown with unique categories from poems and quotes
function populateCategoryDropdown() {
    // Get all unique categories from both poems and quotes
    const allItems = [...state.poems, ...state.quotes];
    const categories = [...new Set(allItems.map(item => item.category))].sort();

    // Clear existing options except "All Categories"
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Add each category as an option (capitalized)
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryFilter.appendChild(option);
    });
}

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Setup event listeners
function setupEventListeners() {
    // Search input with debouncing
    const debouncedSearch = debounce((value) => {
        state.searchQuery = value.toLowerCase();
        renderContent();
    }, 300);

    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });

    // Category filter dropdown
    categoryFilter.addEventListener('change', (e) => {
        state.currentFilter = e.target.value;
        renderContent();
    });

    // View toggle buttons
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            state.currentView = button.dataset.view;
            updateViewVisibility();
            renderContent();
        });
    });

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Add 3D tilt effect on mouse move for cards
    setup3DCardEffects();

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Alt + 1/2/3 for filter shortcuts (using dropdown)
    if (e.altKey && !e.shiftKey && !e.ctrlKey) {
        if (e.key === '1') {
            e.preventDefault();
            categoryFilter.value = 'all';
            categoryFilter.dispatchEvent(new Event('change'));
        } else if (e.key === '2') {
            e.preventDefault();
            categoryFilter.value = 'romantic';
            categoryFilter.dispatchEvent(new Event('change'));
        } else if (e.key === '3') {
            e.preventDefault();
            categoryFilter.value = 'motivational';
            categoryFilter.dispatchEvent(new Event('change'));
        } else if (e.key === 'd' || e.key === 'D') {
            e.preventDefault();
            toggleTheme();
        }
    }

    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
}

// Toggle theme
function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
}

// Setup 3D card effects
function setup3DCardEffects() {
    const addCardListeners = () => {
        const cards = document.querySelectorAll('.poem-card, .quote-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'none';
            });

            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                this.style.transform = `
                    translateY(-10px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.02)
                `;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            });
        });
    };

    // Initial setup
    addCardListeners();

    // Re-apply after content changes (using MutationObserver)
    const observer = new MutationObserver(addCardListeners);
    observer.observe(poemsContainer, { childList: true });
    observer.observe(quotesContainer, { childList: true });
}

// Update section visibility based on view
function updateViewVisibility() {
    if (state.currentView === 'poems') {
        poemsSection.style.display = 'block';
        quotesSection.style.display = 'none';
    } else if (state.currentView === 'quotes') {
        poemsSection.style.display = 'none';
        quotesSection.style.display = 'block';
    } else if (state.currentView === 'both') {
        poemsSection.style.display = 'block';
        quotesSection.style.display = 'block';
    }
}

// Filter and search content
function filterContent(items) {
    return items.filter(item => {
        // Apply category filter
        const categoryMatch = state.currentFilter === 'all' || item.category === state.currentFilter;

        // Apply search filter
        let searchMatch = true;
        if (state.searchQuery) {
            const searchableText = [
                item.title || '',
                item.text || '',
                item.content || '',
                item.author || '',
                item.category || ''
            ].join(' ').toLowerCase();

            searchMatch = searchableText.includes(state.searchQuery);
        }

        return categoryMatch && searchMatch;
    });
}

// Render all content
function renderContent() {
    const filteredPoems = filterContent(state.poems);
    const filteredQuotes = filterContent(state.quotes);

    // Render poems
    if (state.currentView === 'poems' || state.currentView === 'both') {
        renderPoems(filteredPoems);
    }

    // Render quotes
    if (state.currentView === 'quotes' || state.currentView === 'both') {
        renderQuotes(filteredQuotes);
    }

    // Show empty state if no results
    const hasResults =
        (state.currentView === 'both' && (filteredPoems.length > 0 || filteredQuotes.length > 0)) ||
        (state.currentView === 'poems' && filteredPoems.length > 0) ||
        (state.currentView === 'quotes' && filteredQuotes.length > 0);

    emptyState.style.display = hasResults ? 'none' : 'block';
}

// Render poems
function renderPoems(poems) {
    if (poems.length === 0) {
        poemsContainer.innerHTML = '';
        return;
    }

    poemsContainer.innerHTML = poems.map(poem => `
        <article class="poem-card ${poem.category}" data-type="poem" data-id="${poem.id}">
            <button class="copy-btn" onclick="copyToClipboard('poem', ${poem.id})" aria-label="Copy poem">
                Copy
            </button>
            <h3 class="poem-title">${escapeHtml(poem.title)}</h3>
            <div class="poem-content">${escapeHtml(poem.content)}</div>
            <div class="poem-meta">
                <div class="meta-left">
                    <span class="category-tag ${poem.category}">${poem.category}</span>
                    <span class="poem-author">by ${escapeHtml(poem.author)}</span>
                </div>
                <span class="poem-date">${formatDate(poem.date)}</span>
            </div>
        </article>
    `).join('');
}

// Render quotes
function renderQuotes(quotes) {
    if (quotes.length === 0) {
        quotesContainer.innerHTML = '';
        return;
    }

    quotesContainer.innerHTML = quotes.map(quote => `
        <article class="quote-card ${quote.category}" data-type="quote" data-id="${quote.id}">
            <button class="copy-btn" onclick="copyToClipboard('quote', ${quote.id})" aria-label="Copy quote">
                Copy
            </button>
            <p class="quote-text">${escapeHtml(quote.text)}</p>
            <div class="quote-meta">
                <div class="meta-left">
                    <span class="category-tag ${quote.category}">${quote.category}</span>
                    <span class="poem-author">— ${escapeHtml(quote.author)}</span>
                </div>
                <span class="poem-date">${formatDate(quote.date)}</span>
            </div>
        </article>
    `).join('');
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function showError(message) {
    emptyState.innerHTML = `<p style="color: #e74c3c;">${message}</p>`;
    emptyState.style.display = 'block';
}

// Copy to clipboard functionality
function copyToClipboard(type, id) {
    const item = type === 'poem'
        ? state.poems.find(p => p.id === id)
        : state.quotes.find(q => q.id === id);

    if (!item) return;

    const text = type === 'poem'
        ? `${item.title}\n\n${item.content}\n\n- ${item.author}`
        : `"${item.text}"\n\n- ${item.author}`;

    navigator.clipboard.writeText(text).then(() => {
        showToast(`${type === 'poem' ? 'Poem' : 'Quote'} copied to clipboard!`);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy. Please try again.');
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Make functions globally accessible for onclick handlers
window.copyToClipboard = copyToClipboard;

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
