// Include sonnetsData variable from SonnetSample.js (required)
// Original application logic for Shakespeare Sonnet Search preserved

let currentFilters = {
  text: "",
  themes: [],
  imagery: [],
  characters: [],
};

let allSonnets = [];

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  allSonnets = sonnetsData;
  initializeFilters();
  displaySonnets(allSonnets);
  setupCheckboxToggles();
});

// Set up checkbox list visibility toggles
function setupCheckboxToggles() {
  const themeToggle = document.getElementById("theme-toggle");
  const imageryToggle = document.getElementById("imagery-toggle");
  const characterToggle = document.getElementById("character-toggle");
  const themeList = document.getElementById("theme-checkboxes");
  const imageryList = document.getElementById("imagery-checkboxes");
  const characterList = document.getElementById("character-checkboxes");

  // Update visibility based on checkbox state
  function updateVisibility(toggle, list) {
    if (toggle && list) {
      if (toggle.checked) list.classList.add("visible");
      else list.classList.remove("visible");
    }
  }

  // Set initial state
  updateVisibility(themeToggle, themeList);
  updateVisibility(imageryToggle, imageryList);
  updateVisibility(characterToggle, characterList);

  // Add event listeners
  themeToggle.addEventListener("change", () =>
    updateVisibility(themeToggle, themeList),
  );
  imageryToggle.addEventListener("change", () =>
    updateVisibility(imageryToggle, imageryList),
  );
  if (characterToggle)
    characterToggle.addEventListener("change", () =>
      updateVisibility(characterToggle, characterList),
    );
}

// Extract unique categories and build the UI
function initializeFilters() {
  const uniqueThemes = new Set();
  const uniqueImagery = new Set();
  const uniqueCharacters = new Set(); // In case you want a character filter later!

  // Loop through all sonnets and harvest the tags
  allSonnets.forEach((sonnet) => {
    if (sonnet.themes) {
      sonnet.themes.forEach((theme) => uniqueThemes.add(theme.toLowerCase()));
    }
    if (sonnet.imagery) {
      sonnet.imagery.forEach((img) => uniqueImagery.add(img.toLowerCase()));
    }
    if (sonnet.characters) {
      sonnet.characters.forEach((char) => uniqueCharacters.add(char));
    }
  });

  // Convert Sets to alphabetized arrays
  const sortedThemes = Array.from(uniqueThemes).sort();
  const sortedImagery = Array.from(uniqueImagery).sort();
  const sortedCharacters = Array.from(uniqueCharacters).sort();

  // Render the HTML
  renderFilterBubbles("theme-checkboxes", sortedThemes, "theme");
  renderFilterBubbles("imagery-checkboxes", sortedImagery, "imagery");
  renderFilterBubbles("character-checkboxes", sortedCharacters, "character");

  // We must set up the event listeners AFTER the HTML is injected!
  setupEventListeners();
}

// Generate the HTML for the word bubbles
function renderFilterBubbles(containerId, items, type) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items
    .map(
      (item) => `
        <button type="button" class="filter-bubble" data-type="${type}" data-filter="${item}">
            ${capitalizeFirstLetter(item)}
        </button>
    `,
    )
    .join("");
}

// Helper function to make the bubbles look nice (e.g., "imperative to procreation" -> "Imperative to procreation")
function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Set up all event listeners
function setupEventListeners() {
  // Text search
  const textSearchInput = document.getElementById("text-search");
  const textSearchBtn = document.getElementById("text-search-btn");

  if (textSearchInput) {
    textSearchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performTextSearch();
      }
    });
  }

  if (textSearchBtn) {
    textSearchBtn.addEventListener("click", performTextSearch);
  }

  // Filter checkboxes
  document.querySelectorAll(".filter-bubble").forEach((bubble) => {
    bubble.addEventListener("click", function () {
      const filterType = this.getAttribute("data-type");
      const filterValue = this.getAttribute("data-filter");

      // Toggle the visual 'selected' class
      this.classList.toggle("selected");

      // Check if it is currently selected to update the logic
      const isSelected = this.classList.contains("selected");

      toggleFilter(filterType, filterValue, isSelected);
    });
  });
}

// Perform text search
function performTextSearch() {
  const searchTermInput = document.getElementById("text-search");
  if (searchTermInput) {
    const searchTerm = searchTermInput.value.trim().toLowerCase();
    currentFilters.text = searchTerm;
    performSearch();
  }
}

// Toggle a filter (theme or imagery)
function toggleFilter(filterType, filterValue, isSelected) {
  let targetArray;
  if (filterType === "theme") targetArray = currentFilters.themes;
  else if (filterType === "imagery") targetArray = currentFilters.imagery;
  else if (filterType === "character") targetArray = currentFilters.characters; // Route character types

  if (isSelected) {
    if (!targetArray.includes(filterValue)) {
      targetArray.push(filterValue);
    }
  } else {
    const index = targetArray.indexOf(filterValue);
    if (index > -1) {
      targetArray.splice(index, 1);
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
    results = results.filter((sonnet) => {
      return (
        sonnet.text.toLowerCase().includes(searchTerm) ||
        sonnet.number.toString().includes(searchTerm)
      );
    });
  }

  // Filter by themes (conjunctive: ALL selected themes must be present)
  if (currentFilters.themes.length > 0) {
    results = results.filter((sonnet) => {
      return (
        sonnet.themes &&
        currentFilters.themes.every((theme) => sonnet.themes.includes(theme))
      );
    });
  }

  // Filter by imagery (conjunctive: ALL selected imagery must be present)
  if (currentFilters.imagery.length > 0) {
    results = results.filter((sonnet) => {
      return (
        sonnet.imagery &&
        currentFilters.imagery.every((image) => sonnet.imagery.includes(image))
      );
    });
  }

  // Filter by characters (ALL selected characters must be present)
  if (currentFilters.characters.length > 0) {
    results = results.filter((sonnet) => {
      return (
        sonnet.characters &&
        currentFilters.characters.every((char) =>
          sonnet.characters.includes(char),
        )
      );
    });
  }

  displaySonnets(results);
  updateResultsHeader(results);
}

// Display sonnets in the results container
function displaySonnets(sonnets) {
  const container = document.getElementById("results-container");
  if (!container) return;

  if (sonnets.length === 0) {
    container.innerHTML = `
            <div class="no-results">
                <h3>No sonnets found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
    return;
  }

  container.innerHTML = sonnets
    .map((sonnet) => {
      const highlightedText = currentFilters.text
        ? highlightText(sonnet.text, currentFilters.text)
        : sonnet.text;

      return `
            <div class="sonnet-card">
                <div class="sonnet-header">
                    <div class="sonnet-number">Sonnet ${sonnet.number}</div>
                </div>
                <div class="sonnet-text">${highlightedText}</div>
            </div>
        `;
    })
    .join("");
}

// Highlight search terms in text
function highlightText(text, searchTerm) {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${escapeRegex(searchTerm)})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
}

// Escape special regex characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Update the results header
function updateResultsHeader(results) {
  const title = document.getElementById("results-title");
  const count = document.getElementById("results-count");

  if (!title || !count) return;

  const hasFilters =
    currentFilters.text ||
    currentFilters.themes.length > 0 ||
    currentFilters.imagery.length > 0;

  if (hasFilters) {
    title.textContent = "Search Results";
  } else {
    title.textContent = "All Sonnets";
  }

  count.textContent = `${results.length} sonnet${results.length !== 1 ? "s" : ""} found`;
}

// Update active filters display
function updateActiveFilters() {
  const container = document.getElementById("active-filters");
  if (!container) return;

  const allActiveFilters = [];

  if (currentFilters.text) {
    allActiveFilters.push({
      type: "text",
      value: currentFilters.text,
      display: `"${currentFilters.text}"`,
    });
  }

  currentFilters.themes.forEach((theme) => {
    allActiveFilters.push({
      type: "theme",
      value: theme,
      display: theme,
    });
  });

  currentFilters.imagery.forEach((img) => {
    allActiveFilters.push({
      type: "imagery",
      value: img,
      display: img,
    });
  });

  currentFilters.characters.forEach((char) => {
    allActiveFilters.push({
      type: "character",
      value: char,
      display: char,
    });
  });

  if (allActiveFilters.length === 0) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML =
    "<span>Active filters:</span>" +
    allActiveFilters
      .map(
        (filter) => `
            <span class="filter-tag">
                ${filter.display}
                <span class="remove" data-type="${filter.type}" data-value="${filter.value}">×</span>
            </span>
        `,
      )
      .join("");

  // Add event listeners to remove buttons
  container.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", function () {
      const type = this.getAttribute("data-type");
      const value = this.getAttribute("data-value");

      if (type === "text") {
        currentFilters.text = "";
        const searchInput = document.getElementById("text-search");
        if (searchInput) searchInput.value = "";
      } else if (type === "theme") {
        currentFilters.themes = currentFilters.themes.filter(
          (t) => t !== value,
        );
        const bubble = document.querySelector(
          `.filter-bubble[data-type="theme"][data-filter="${value}"]`,
        );
        if (bubble) bubble.classList.remove("selected");
      } else if (type === "imagery") {
        currentFilters.imagery = currentFilters.imagery.filter(
          (i) => i !== value,
        );
        const bubble = document.querySelector(
          `.filter-bubble[data-type="imagery"][data-filter="${value}"]`,
        );
        if (bubble) bubble.classList.remove("selected");
      } else if (type === "character") {
        currentFilters.characters = currentFilters.characters.filter(
          (c) => c !== value,
        );
        const bubble = document.querySelector(
          `.filter-bubble[data-type="character"][data-filter="${value}"]`,
        );
        if (bubble) bubble.classList.remove("selected");
      }

      performSearch();
      updateActiveFilters();
    });
  });
}
