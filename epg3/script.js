const urlForm = document.getElementById('urlForm');
const downloadButtons = document.getElementById('downloadButtons');
const submitBtn = document.getElementById('submitBtn');
const skipBtn = document.getElementById('skipBtn');
const downloadEPGBtn = document.getElementById('downloadEPGBtn');
const downloadM3UBtn = document.getElementById('downloadM3UBtn');
const uploadForm = document.getElementById('uploadForm');
const uploadBtn = document.getElementById('uploadBtn');
const backButton = document.getElementById('backButton');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const uploadConfirmation = document.getElementById('uploadConfirmation');
const uploadConfirmationMessage = document.getElementById('uploadConfirmationMessage');
const searchBox = document.getElementById('searchBox');
const searchTerm = document.getElementById('searchTerm');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

// Function to parse XML data
function parseXML(xmlString) {
    const parser = new DOMParser();
    return parser.parseFromString(xmlString, "text/xml");
}

submitBtn.addEventListener('click', () => {
    const xtremeUrl = document.getElementById('xtremeUrl').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (xtremeUrl && username && password) {
        // Show the download buttons
        downloadButtons.style.display = 'block';

        // Show Step 2 after a delay (adjust as needed)
        setTimeout(() => {
            step1.style.display = 'none';
            step2.style.display = 'block';
        }, 1000); // 1 second delay
    }
});

skipBtn.addEventListener('click', () => {
    // Show Step 2 immediately
    step1.style.display = 'none';
    step2.style.display = 'block';
});

uploadBtn.addEventListener('click', () => {
    const xmlFile = document.getElementById('xmlFile').files[0];
    const m3uFile = document.getElementById('m3uFile').files[0];

    if (xmlFile && m3uFile) {
        // Process the uploaded files (e.g., send to server, store locally)
        console.log('XML File:', xmlFile);
        console.log('M3U File:', m3uFile);

        // Show confirmation message
        uploadConfirmation.style.display = 'block';

        // Add file names to confirmation message
        uploadConfirmationMessage.textContent = `Upload Successful! XML: ${xmlFile.name}, M3U: ${m3uFile.name}`;

        // Show search box
        searchBox.style.display = 'block';

        // Enable submit and skip buttons
        submitBtn.disabled = false;
        skipBtn.disabled = false;

        // Read the XML file content
        const reader = new FileReader();
        reader.onload = function(e) {
            const xmlData = e.target.result;

            // Parse XML data
            const xmlDoc = parseXML(xmlData);

            // Store parsed XML data for later use
            window.parsedXMLData = xmlDoc;
        };
        reader.readAsText(xmlFile);
    } else {
        alert('Please select both XML and M3U files.');
    }
});

backButton.addEventListener('click', () => {
    // Show Step 1 and hide Step 2
    step1.style.display = 'block';
    step2.style.display = 'none';

    // Reset upload confirmation
    uploadConfirmation.style.display = 'none';
});

searchBtn.addEventListener('click', () => {
    const searchQuery = searchTerm.value.toLowerCase();

    if (window.parsedXMLData) {
        const filteredPrograms = Array.from(window.parsedXMLData.getElementsByTagName('programme'))
            .filter(program => program.getElementsByTagName('title')[0].textContent.toLowerCase().includes(searchQuery));

        if (filteredPrograms.length > 0) {
            // Build search results table
            let resultsHtml = '<table><tr><th>Channel</th><th>Title</th><th>Description</th><th>Start Time</th><th>End Time</th></tr>';
            for (const program of filteredPrograms) {
                const channel = program.getAttribute('channel');
                const title = program.getElementsByTagName('title')[0].textContent;
                const desc = program.getElementsByTagName('desc')[0].textContent;
                const startTime = program.getAttribute('start_timestamp');
                const endTime = program.getAttribute('stop_timestamp');

                const humanReadableStartTime = new Date(startTime * 1000).toLocaleString();
                const humanReadableEndTime = new Date(endTime * 1000).toLocaleString();

                resultsHtml += `<tr><td>${channel}</td><td>${title}</td><td>${desc}</td><td>${humanReadableStartTime}</td><td>${humanReadableEndTime}</td></tr>`;
            }
            resultsHtml += '</table>';

            searchResults.innerHTML = resultsHtml;
            searchResults.style.display = 'block';
        } else {
            searchResults.textContent = 'No programs found matching your search.';
            searchResults.style.display = 'block';
        }
    } else {
        console.error('Error parsing XML data.');
    }
});
