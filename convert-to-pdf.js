const markdownpdf = require('markdown-pdf');
const path = require('path');

const inputFile = path.join(__dirname, 'screenshots', 'README_PTBR.md');
const outputFile = path.join(__dirname, 'screenshots', 'README_PTBR.pdf');

markdownpdf()
  .from(inputFile)
  .to(outputFile, function () {
    console.log('PDF generated successfully!');
  }); 