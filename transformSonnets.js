const fs = require('fs');

// Import your source file
const { poems: sonnets } = require('./oldSonnetData/sonnetsComplete.js');

// Transform the data
const transformedSonnets = sonnets.map(sonnet => {
  // Extract the number from the title
  const number = parseInt(sonnet.title.match(/Sonnet (\d+)/)[1]);
  
  return {
    number,
    text: sonnet.lines.join('\n').replace(/'/g, '’'),
    themes: [],
    imagery: [],
    characters: []
  };
});

// Format as JavaScript object with template literals
let output = 'const sonnetsData = [\n';

transformedSonnets.forEach((sonnet, index) => {
  output += `  {\n`;
  output += `    number: ${sonnet.number},\n`;
  output += `    text: \`${sonnet.text}\`,\n`;
  output += `    themes: [],\n`;
  output += `    imagery: [],\n`;
  output += `    characters: []\n`;
  output += `  }${index < transformedSonnets.length - 1 ? ',' : ''}\n`;
});

output += `];\n\n`;
output += `if (typeof module !== 'undefined' && module.exports) {\n`;
output += `  module.exports = { sonnetsData };\n`;
output += `}\n`;

fs.writeFileSync('./sonnets-transformed.js', output);
console.log('Transformation complete! File saved as sonnets-transformed.js');