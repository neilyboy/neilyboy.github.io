const epgFileInput = document.getElementById('epg-file');
const channelFileInput = document.getElementById('channel-file');
const getDataButton = document.getElementById('get-data-button');
const searchTermInput = document.getElementById('search-term');
const searchButton = document.getElementById('search-button');
const resultsDiv = document.getElementById('results');

let epgData; // Stores downloaded EPG data
let channelMap; // Stores channel ID to name mapping

getDataButton.addEventListener('click', async () => {
  if (!epgFileInput.files[0] || !channelFileInput.files[0]) {
    alert('Please select both EPG and channel files.');
    return;
  }

  try {
    // Read EPG data
    const epgFile = epgFileInput.files[0];
    const epgReader = new FileReader();
    epgReader.onload = () => {
      epgData = epgReader.result;
      console.log('EPG data uploaded');
    };
    epgReader.readAsText(epgFile);

    // Read channel data
    const channelFile = channelFileInput.files[0];
    const channelReader = new FileReader();
    channelReader.onload = () => {
      channelMap = parseM3u(channelReader.result);
      console.log('Channel map created');
    };
    channelReader.readAsText(channelFile);
  } catch (error) {
    console.error('Error reading files:', error);
    alert('Error reading files. Please ensure they are valid.');
  }
});

searchButton.addEventListener('click', () => {
  if (!epgData || !channelMap) {
    alert('Please upload EPG and channel data first.');
    return;
  }

  const searchTerm = searchTermInput.value.toLowerCase();
  const results = [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(epgData, 'text/xml');

  const programmes = doc.querySelectorAll('programme');

  programmes.forEach(programme => {
    const title = programme.querySelector('title').textContent.toLowerCase();
    const desc = programme.querySelector('desc').textContent.toLowerCase();
    const channelId = programme.getAttribute('channel');

    if (title.includes(searchTerm) || desc.includes(searchTerm)) {
      const channelName = channelMap[channelId];
      results.push({
        title,
        desc,
        channelId,
        channelName
      });
    }
  });

  if (results.length > 0) {
    displayResults(results);
  } else {
    alert('No results found.');
  }
});

function displayResults(results) {
  resultsDiv.innerHTML = '';

  results.forEach(result => {
    const resultDiv = document.createElement('div');
    const { name, logoUrl, lastUrlPart } = result; // Destructure object
    resultDiv.innerHTML = `
      <h3>${name}</h3>
      <p>Channel: ${lastUrlPart}</p>
      <p>Description: ${result.desc}</p>
      <img src="${logoUrl}" alt="${name} Logo">
    `;
    resultsDiv.appendChild(resultDiv);
  });
}

function parseM3u(m3uData) {
  const channelMap = {};
  const lines = m3uData.split('\n');
  lines.forEach(line => {
    const match = line.match(/#EXTINF:-1 tvg-id="([^"]+)" tvg-name="([^"]+)" tvg-logo="([^"]+)" group-title="([^"]+)",([^"]+)/);
    if (match) {
      const channelId = match[1];
      const channelName = match[2];
      const logoUrl = match[3];
      const lastUrlPart = match[5];

      channelMap[channelId] = {
        name: channelName,
        logoUrl,
        lastUrlPart
      };
    }
  });
  return channelMap;
}