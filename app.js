// Main application logic for Shakespeare Sonnet Search

// Define hierarchical category structure
const imageryHierarchy = {
    'body parts': {
        children: ['face', 'hair', 'arms', 'hands', 'legs'],
        allDescendants: ['face', 'hair', 'arms', 'hands', 'legs', 'brow', 'eyes', 'nose', 'cheeks', 'lips', 'mouth']
    },
    'face': {
        children: ['brow', 'eyes', 'nose', 'cheeks', 'lips', 'mouth'],
        allDescendants: ['brow', 'eyes', 'nose', 'cheeks', 'lips', 'mouth']
    }
};

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
            const isParent = this.getAttribute('data-parent') === 'true';
            
            toggleFilter(filterType, filterValue, this.checked, isParent);
            
            // Handle parent checkbox - show/hide nested items
            if (isParent && filterType === 'imagery') {
                const nestedCategory = this.closest('.nested-category');
                if (nestedCategory) {
                    const nestedList = nestedCategory.querySelector('.nested-checkbox-list');
                    if (nestedList) {
                        if (this.checked) {
                            nestedList.classList.add('visible');
                        } else {
                            nestedList.classList.remove('visible');
                        }
                    }
                }
            }
        });
    });
    
    // Handle nested parent checkboxes (like "face" within "body parts")
    document.querySelectorAll('.nested-item input[data-parent="true"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const parentItem = this.closest('.nested-item');
            if (parentItem) {
                const nestedList = parentItem.nextElementSibling;
                if (nestedList && nestedList.classList.contains('nested-checkbox-list')) {
                    if (this.checked) {
                        nestedList.classList.add('visible');
                    } else {
                        nestedList.classList.remove('visible');
                    }
                }
            }
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
function toggleFilter(filterType, filterValue, isChecked, isParent = false) {
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
            // If unchecking a parent, also uncheck all its descendants
            if (isParent && imageryHierarchy[filterValue]) {
                imageryHierarchy[filterValue].allDescendants.forEach(desc => {
                    const idx = currentFilters.imagery.indexOf(desc);
                    if (idx > -1) {
                        currentFilters.imagery.splice(idx, 1);
                        // Uncheck the checkbox
                        const checkbox = document.querySelector(`[data-type="imagery"][data-filter="${desc}"]`);
                        if (checkbox) checkbox.checked = false;
                    }
                });
            }
        } else {
            currentFilters.imagery = currentFilters.imagery.filter(i => i !== filterValue);
            // If unchecking a parent, also uncheck all its descendants
            if (isParent && imageryHierarchy[filterValue]) {
                imageryHierarchy[filterValue].allDescendants.forEach(desc => {
                    const idx = currentFilters.imagery.indexOf(desc);
                    if (idx > -1) {
                        currentFilters.imagery.splice(idx, 1);
                        // Uncheck the checkbox
                        const checkbox = document.querySelector(`[data-type="imagery"][data-filter="${desc}"]`);
                        if (checkbox) checkbox.checked = false;
                    }
                });
            }
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

    // Filter by themes (conjunctive: ALL selected themes must be present)
    if (currentFilters.themes.length > 0) {
        results = results.filter(sonnet => {
            return sonnet.themes && 
                   currentFilters.themes.every(theme => 
                       sonnet.themes.includes(theme)
                   );
        });
    }

    // Filter by imagery (conjunctive: ALL selected imagery must be present)
    // Handle hierarchical categories: parent categories match any child, specific children match only themselves
    if (currentFilters.imagery.length > 0) {
        results = results.filter(sonnet => {
            if (!sonnet.imagery) return false;
            
            const expandedFilters = [];
            
            // Process each selected filter
            for (const filter of currentFilters.imagery) {
                if (imageryHierarchy[filter]) {
                    // This is a parent category (e.g., "face" or "body parts")
                    const hierarchy = imageryHierarchy[filter];
                    
                    // Check if any specific children of this parent are also selected
                    const selectedChildren = hierarchy.children.filter(child => 
                        currentFilters.imagery.includes(child)
                    );
                    
                    if (selectedChildren.length > 0) {
                        // Specific children are selected - use only those (ignore parent)
                        selectedChildren.forEach(child => {
                            if (!expandedFilters.includes(child)) {
                                expandedFilters.push(child);
                            }
                        });
                    } else {
                        // No specific children - parent matches itself OR any of its descendants
                        // Create a function to check if sonnet matches this parent category
                        const parentMatch = (sonnetImagery, parent, hierarchy) => {
                            // Check if sonnet has the parent category itself
                            if (sonnetImagery.includes(parent)) {
                                return true;
                            }
                            // Or check if sonnet has any of the parent's descendants
                            return hierarchy.allDescendants.some(desc => 
                                sonnetImagery.includes(desc)
                            );
                        };
                        
                        // Store the parent and its hierarchy for later matching
                        expandedFilters.push({
                            type: 'parent',
                            value: filter,
                            hierarchy: hierarchy,
                            matchFn: (sonnetImagery) => parentMatch(sonnetImagery, filter, hierarchy)
                        });
                    }
                } else {
                    // This is not a parent category
                    // Check if it's a child that's already covered by a selected parent
                    let coveredByParent = false;
                    for (const [parent, hierarchy] of Object.entries(imageryHierarchy)) {
                        if (currentFilters.imagery.includes(parent) && 
                            hierarchy.allDescendants.includes(filter)) {
                            // Check if specific children of this parent are selected
                            const hasSpecificChildren = hierarchy.children.some(child => 
                                currentFilters.imagery.includes(child)
                            );
                            if (!hasSpecificChildren) {
                                // Parent is selected without specific children, so it covers this child
                                coveredByParent = true;
                                break;
                            }
                        }
                    }
                    
                    // Check if this filter is already in expandedFilters
                    const alreadyAdded = expandedFilters.some(f => {
                        if (typeof f === 'string') {
                            return f === filter;
                        } else if (f && typeof f === 'object') {
                            return f.value === filter;
                        }
                        return false;
                    });
                    
                    if (!coveredByParent && !alreadyAdded) {
                        expandedFilters.push(filter);
                    }
                }
            }
            
            // Check if sonnet matches ALL expanded filters (conjunctive)
            if (expandedFilters.length === 0) {
                return false; // No filters to match
            }
            
            return expandedFilters.every(filter => {
                if (typeof filter === 'string') {
                    // Regular category - check if sonnet includes it
                    return sonnet.imagery.includes(filter);
                } else if (filter && filter.type === 'parent') {
                    // Parent category - use the match function
                    return filter.matchFn(sonnet.imagery);
                }
                return false;
            });
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

