// Main application logic for Shakespeare Sonnet Search

let currentFilters = {
    text: '',
    themes: [],
    imagery: []
};

let allSonnets = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    allSonnets = sonnetsData;
    displaySonnets(allSonnets);
    setupEventListeners();
    setupCheckboxToggles();
});

// Set up checkbox list visibility toggles
function setupCheckboxToggles() {
    const themeToggle = document.getElementById('theme-toggle');
    const imageryToggle = document.getElementById('imagery-toggle');
    const themeList = document.getElementById('theme-checkboxes');
    const imageryList = document.getElementById('imagery-checkboxes');

    // Update visibility based on checkbox state
    function updateVisibility(toggle, list) {
        if (toggle.checked) {
            list.classList.add('visible');
        } else {
            list.classList.remove('visible');
        }
    }

    // Set initial state
    updateVisibility(themeToggle, themeList);
    updateVisibility(imageryToggle, imageryList);

    // Add event listeners
    themeToggle.addEventListener('change', () => updateVisibility(themeToggle, themeList));
    imageryToggle.addEventListener('change', () => updateVisibility(imageryToggle, imageryList));
}

// Set up all event listeners
function setupEventListeners() {
    // Text search
    const textSearchInput = document.getElementById('text-search');
    const textSearchBtn = document.getElementById('text-search-btn');

    textSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performTextSearch();
        }
    });

    textSearchBtn.addEventListener('click', performTextSearch);

    // Filter checkboxes
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const filterType = this.getAttribute('data-type');
            const filterValue = this.getAttribute('data-filter');
            toggleFilter(filterType, filterValue, this.checked);
        });
    });
}

// Perform text search
function performTextSearch() {
    const searchTerm = document.getElementById('text-search').value.trim().toLowerCase();
    currentFilters.text = searchTerm;
    performSearch();
}

// Toggle a filter (theme or imagery)
function toggleFilter(filterType, filterValue, isChecked) {
    if (filterType === 'theme') {
        if (isChecked) {
            if (!currentFilters.themes.includes(filterValue)) {
                currentFilters.themes.push(filterValue);
            }
        } else {
            currentFilters.themes = currentFilters.themes.filter(t => t !== filterValue);
        }
    } else if (filterType === 'imagery') {
        if (isChecked) {
            if (!currentFilters.imagery.includes(filterValue)) {
                currentFilters.imagery.push(filterValue);
            }
        } else {
            currentFilters.imagery = currentFilters.imagery.filter(i => i !== filterValue);
        }
    }

    performSearch();
    updateActiveFilters();
}

// Perform the search based on current filters
function performSearch() {
    let results = allSonnets;

    // Filter by text search
    if (currentFilters.text) {
        const searchTerm = currentFilters.text.toLowerCase();
        results = results.filter(sonnet => {
            return sonnet.text.toLowerCase().includes(searchTerm) ||
                   sonnet.number.toString().includes(searchTerm);
        });
    }

    // Filter by themes
    if (currentFilters.themes.length > 0) {
        results = results.filter(sonnet => {
            return currentFilters.themes.some(theme => 
                sonnet.themes && sonnet.themes.includes(theme)
            );
        });
    }

    // Filter by imagery
    if (currentFilters.imagery.length > 0) {
        results = results.filter(sonnet => {
            return currentFilters.imagery.some(img => 
                sonnet.imagery && sonnet.imagery.includes(img)
            );
        });
    }

    displaySonnets(results);
    updateResultsHeader(results);
}

// Display sonnets in the results container
function displaySonnets(sonnets) {
    const container = document.getElementById('results-container');
    
    if (sonnets.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>No sonnets found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }

    container.innerHTML = sonnets.map(sonnet => {
        const highlightedText = currentFilters.text 
            ? highlightText(sonnet.text, currentFilters.text)
            : sonnet.text;

        const themeTags = sonnet.themes ? sonnet.themes.map(theme => 
            `<span class="tag">${theme}</span>`
        ).join('') : '';

        const imageryTags = sonnet.imagery ? sonnet.imagery.map(img => 
            `<span class="tag">${img}</span>`
        ).join('') : '';

        return `
            <div class="sonnet-card">
                <div class="sonnet-header">
                    <div class="sonnet-number">Sonnet ${sonnet.number}</div>
                    <div class="sonnet-tags">
                        ${themeTags}
                        ${imageryTags}
                    </div>
                </div>
                <div class="sonnet-text">${highlightedText}</div>
            </div>
        `;
    }).join('');
}

// Highlight search terms in text
function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Escape special regex characters
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Update the results header
function updateResultsHeader(results) {
    const title = document.getElementById('results-title');
    const count = document.getElementById('results-count');

    const hasFilters = currentFilters.text || 
                      currentFilters.themes.length > 0 || 
                      currentFilters.imagery.length > 0;

    if (hasFilters) {
        title.textContent = 'Search Results';
    } else {
        title.textContent = 'All Sonnets';
    }

    count.textContent = `${results.length} sonnet${results.length !== 1 ? 's' : ''} found`;
}

// Update active filters display
function updateActiveFilters() {
    const container = document.getElementById('active-filters');
    const allActiveFilters = [];

    if (currentFilters.text) {
        allActiveFilters.push({
            type: 'text',
            value: currentFilters.text,
            display: `"${currentFilters.text}"`
        });
    }

    currentFilters.themes.forEach(theme => {
        allActiveFilters.push({
            type: 'theme',
            value: theme,
            display: theme
        });
    });

    currentFilters.imagery.forEach(img => {
        allActiveFilters.push({
            type: 'imagery',
            value: img,
            display: img
        });
    });

    if (allActiveFilters.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = '<span>Active filters:</span>' + 
        allActiveFilters.map(filter => `
            <span class="filter-tag">
                ${filter.display}
                <span class="remove" data-type="${filter.type}" data-value="${filter.value}">×</span>
            </span>
        `).join('');

    // Add event listeners to remove buttons
    container.querySelectorAll('.remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const value = this.getAttribute('data-value');

            if (type === 'text') {
                currentFilters.text = '';
                document.getElementById('text-search').value = '';
            } else if (type === 'theme') {
                currentFilters.themes = currentFilters.themes.filter(t => t !== value);
                const checkbox = document.querySelector(`[data-type="theme"][data-filter="${value}"]`);
                if (checkbox) checkbox.checked = false;
            } else if (type === 'imagery') {
                currentFilters.imagery = currentFilters.imagery.filter(i => i !== value);
                const checkbox = document.querySelector(`[data-type="imagery"][data-filter="${value}"]`);
                if (checkbox) checkbox.checked = false;
            }

            performSearch();
            updateActiveFilters();
        });
    });
}

