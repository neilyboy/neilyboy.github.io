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

const searchBox = document.getElementById('searchBox');
const searchTerm = document.getElementById('searchTerm');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

uploadBtn.addEventListener('click', () => {
    // ... (existing upload logic) ...

    // Show search box after successful upload
    searchBox.style.display = 'block';
});

searchBtn.addEventListener('click', () => {
    const searchQuery = searchTerm.value.toLowerCase();
    const xmlData = /* Logic to access and parse the uploaded XML file */; // Replace with your logic

    if (xmlData) {
        const filteredPrograms = xmlData.getElementsByTagName('programme')
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

                const humanReadableStartTime = new Date(startTime * 1000).toLocaleString(); // Convert timestamp to human readable format
                const humanReadableEndTime = new Date(endTime * 1000).toLocaleString();

                resultsHtml += `<tr><td><span class="math-inline">\{channel\}</td\><td\></span>{title}</td><td><span class="math-inline">\{desc\}</td\><td\></span>{humanReadableStartTime}</td><td>${humanReadableEndTime}</td></tr>`;
            }
            resultsHtml += '</table>';

            searchResults.innerHTML = resultsHtml;
            searchResults.style.display = 'block';
        } else {
            searchResults.textContent = 'No programs found matching your search.';
            searchResults.style.display = 'block';
        }
    }
