// --- 2. STATE MANAGEMENT ---
let currentIndex = 0;

// Helper to collect all unique tags used across ALL sonnets 
// This ensures that if you add "Beauty" in Sonnet 1, it appears as an option in Sonnet 2.
function getGlobalCategories(type) {
  const allTags = new Set();
  sonnetsData.forEach(sonnet => {
    if (sonnet[type]) {
      sonnet[type].forEach(tag => allTags.add(tag));
    }
  });
  return Array.from(allTags).sort(); // Alphabetical order
}

// --- 3. RENDERING ---
function renderApp() {
  const currentSonnet = sonnetsData[currentIndex];

  // Render Text
  const textDisplay = document.getElementById('sonnet-text-area');
  textDisplay.innerHTML = `<div class="sonnet-title">Sonnet ${currentSonnet.number}</div>${currentSonnet.text}`;

  // Render Inputs & Controls
  document.getElementById('jump-input').value = currentSonnet.number;

  // Render Categories
  renderCategorySection('themes', currentSonnet.themes);
  renderCategorySection('imagery', currentSonnet.imagery);
  renderCategorySection('characters', currentSonnet.characters);
}

function renderCategorySection(type, currentSelectedArray) {
  const container = document.getElementById(`container-${type}`);
  container.innerHTML = ''; // Clear current bubbles

  // Get all available tags (Global list)
  const availableTags = getGlobalCategories(type);

  availableTags.forEach(tag => {
    const bubble = document.createElement('div');
    bubble.className = 'tag';
    bubble.textContent = tag;

    // Check if this tag is currently selected for this sonnet
    if (currentSelectedArray.includes(tag)) {
      bubble.classList.add('selected');
    }

    // Click handler to toggle
    bubble.onclick = () => toggleTag(type, tag);

    container.appendChild(bubble);
  });
}

// --- 4. INTERACTION HANDLERS ---

function toggleTag(type, tag) {
  const currentSonnet = sonnetsData[currentIndex];
  const index = currentSonnet[type].indexOf(tag);

  if (index === -1) {
    // Add tag
    currentSonnet[type].push(tag);
  } else {
    // Remove tag (De-select)
    currentSonnet[type].splice(index, 1);
  }

  // Re-render to show color change
  renderApp();
}

function addNewCategory(type) {
  const inputId = `input-${type}`;
  const input = document.getElementById(inputId);
  const value = input.value.trim();

  if (!value) return;

  // Add to current sonnet instantly
  const currentSonnet = sonnetsData[currentIndex];
  if (!currentSonnet[type].includes(value)) {
    currentSonnet[type].push(value);
  }

  // Clear input
  input.value = '';

  // Re-render (this will add the new tag to the global list and select it)
  renderApp();
}

function goToNext() {
  if (currentIndex < sonnetsData.length - 1) {
    currentIndex++;
    renderApp();
  }
}

function goToPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    renderApp();
  }
}

function jumpToSonnet() {
  const val = parseInt(document.getElementById('jump-input').value);
  const foundIndex = sonnetsData.findIndex(s => s.number === val);

  if (foundIndex !== -1) {
    currentIndex = foundIndex;
    renderApp();
  } else {
    alert("Sonnet number not found in data.");
  }
}

// --- 5. EXPORT FUNCTIONALITY ---
function downloadData() {
  // We will manually build the string to match your preferred format
  // (Unquoted keys, Template Literals for text)
  
  let output = 'const sonnetsData = [\n';

  sonnetsData.forEach((sonnet, index) => {
    output += '  {\n';
    output += `    number: ${sonnet.number},\n`;
    // We use backticks for text to preserve the visual structure of the poem
    output += `    text: \`${sonnet.text}\`,\n`; 
    // We use JSON.stringify for the arrays because it's the easiest way to format ["a", "b"]
    output += `    themes: ${JSON.stringify(sonnet.themes)},\n`;
    output += `    imagery: ${JSON.stringify(sonnet.imagery)},\n`;
    output += `    characters: ${JSON.stringify(sonnet.characters)}\n`;
    
    // Add a comma if it's not the last item
    const isLast = index === sonnetsData.length - 1;
    output += `  }${isLast ? '' : ','}\n`;
  });

  output += '];\n\n';
  
  // Add the module export check for compatibility with your other projects
  output += "if (typeof module !== 'undefined' && module.exports) {\n";
  output += "  module.exports = { sonnetsData };\n";
  output += "}\n";

  // Create a blob and trigger download
  const blob = new Blob([output], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = "sonnets-data.js"; // Naming it correctly for direct replacement
  document.body.appendChild(a);
  a.click();

  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


// --- 6. EVENT LISTENERS ---
document.getElementById('btn-next').addEventListener('click', goToNext);
document.getElementById('btn-prev').addEventListener('click', goToPrev);
document.getElementById('btn-jump').addEventListener('click', jumpToSonnet);
document.getElementById('btn-download').addEventListener('click', downloadData);

// Initial Load
renderApp();