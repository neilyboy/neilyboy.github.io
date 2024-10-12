const urlForm = document.getElementById('urlForm');
const downloadButtons = document.getElementById('downloadButtons');
const submitBtn = document.getElementById('submitBtn');
const nextBtn = document.getElementById('nextBtn');
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

// Function to parse XML data with error handling
function parseXML(xmlString) {
    const parser = new DOMParser();
    try {
        return parser.parseFromString(xmlString, "text/xml");
    } catch (error) {
        console.error("Error parsing XML:", error);
        alert("There was an error processing the uploaded XML file. Please try again.");
        return null; // Return null to indicate parsing failure
    }
}

submitBtn.addEventListener('click', () => {
    const xtremeUrl = document.getElementById('xtremeUrl').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (xtremeUrl && username && password) {
        // Show the download buttons
        downloadButtons.style.display = 'block';

        // Construct download URLs based on user input
        const epgDownloadUrl = `https://<span class="math-inline">\{xtremeUrl\}/epg\.xml?username\=</span>{username}&password=${password}`;
        const m3uDownloadUrl = `https://<span class="math-inline">\{xtremeUrl\}/m3u\.m3u?username\=</span>{username}&password=${password}`;

        // Display the download URLs below the buttons
        const epgDownloadLink = document.createElement('a');
        epgDownloadLink.href = epgDownloadUrl;
        epgDownloadLink.textContent = 'Download EPG XML';
        downloadButtons.appendChild(epgDownloadLink);

        const m3uDownloadLink = document.createElement('a');
        m3uDownloadLink.href = m3uDownloadUrl;
        m3uDownloadLink.textContent = 'Download M3U';
        downloadButtons.appendChild(m3uDownloadLink);
    }
});

nextBtn.addEventListener('click', () => {
    // Show Step 2
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
        nextBtn.disabled = false;

        // Read the XML file content
        const reader = new FileReader();
        reader.onload = function(e) {
            const xmlData = e.target.result;

            // Parse XML data
            const xmlDoc = parseXML(xmlData);

            if (xmlDoc) {
                // Store parsed XML data for later use
                window.parsedXMLData = xmlDoc;

                // Read the M3U file content
                const m3uReader = new FileReader();
                m3uReader.onload = function(e) {
                    const m3uData = e.target.result;

                    // Parse M3U data
                    window.parsedM3UData = parseM3U(m3uData);
                };
                m3uReader.readAsText(m3uFile);
            } else {
                // Handle XML parsing error
                console.error("Error parsing XML data.");
                alert("There was an error parsing the XML data. Please try again.");
            }
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

function parseM3U(m3uData) {
    const channels = [];
    const lines = m3uData.split(/\r?\n/); // Split by line breaks (CR or LF)

    for (const line of lines) {
        if (line.startsWith('#EXTINF:')) {
            // Extract channel information (assuming format is consistent)
            const info = line.split(',');
            const tvgId = info.find(item => item.startsWith('tvg-id='));
            const tvgName = info.find(item => item.startsWith('tvg-name='));
            const tvgLogo = info.find(item => item.startsWith('tvg-logo='));
            const groupTitle = info.find(item => item.startsWith('group-title='));

            if (tvgId && tvgName) {
                channels.push({
                    tvgId: tvgId.split('=')[1],
                    tvgName: tvgName.split('=')[1],
                    tvgLogo: tvgLogo ? tvgLogo.split('=')[1] : '',
                    groupTitle: groupTitle ? groupTitle.split('=')[1].split(',')[0] : '',
                    url: groupTitle ? groupTitle.split('=')[1].split(',').pop() : '', // Get the last URL
                });
            }
        }
    }

    return channels;
}

searchBtn.addEventListener('click', () => {
    const searchQuery = searchTerm.value.toLowerCase();

    if (window.parsedXMLData && window.parsedM3UData) { // Check for both parsed data
        const filteredPrograms = Array.from(window.parsedXMLData.getElementsByTagName('programme'))
            .filter(program => program.getElementsByTagName('title')[0].textContent.toLowerCase().includes(searchQuery));

        if (filteredPrograms.length > 0) {
            // Build search results table
            let resultsHtml = '<table><tr><th>Logo</th><th>Channel</th><th>Title</th><th>Description</th><th>Start Time</th><th>End Time</th><th>Link</th></tr>';
            for (const program of filteredPrograms) {
                const channel = program.getAttribute('channel');
                const title = program.getElementsByTagName('title')[0].textContent;
                const desc = program.getElementsByTagName('desc')[0].textContent;
                const startTime = program.getAttribute('start_timestamp');
                const endTime = program.getAttribute('stop_timestamp');

                const humanReadableStartTime = new Date(startTime * 1000).toLocaleString();
                const humanReadableEndTime = new Date(endTime * 1000).toLocaleString();

                const matchingChannel = window.parsedM3UData.find(m3uChannel => m3uChannel.tvgId === channel);

                let logoUrl = '';
                let url = '';
                if (matchingChannel) {
                    logoUrl = matchingChannel.tvgLogo;
                    url = matchingChannel.url;
                }

                resultsHtml += `<tr><td><img src="<span class="math-inline">\{logoUrl\}" width\="30" height\="30"\></td\><td\></span>{channel}</td><td><span class="math-inline">\{title\}</td\><td\></span>{desc}</td><td><span class="math-inline">\{humanReadableStartTime\}</td\><td\></span>{humanReadableEndTime}</td><td><a href="${url}" target="_blank">Link</a></td></tr>`;
            }
            resultsHtml += '</table>';

            searchResults.innerHTML = resultsHtml;
            searchResults.style.display = 'block';
        } else {
            searchResults.textContent = 'No programs found matching your search.';
            searchResults.style.display = 'block';
        }
    } else {
        console.error('Error parsing XML or M3U data.');
    }
});
