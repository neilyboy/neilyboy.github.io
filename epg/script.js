const epgFileInput = document.getElementById('epg-file');
const channelFileInput = document.getElementById('channel-file');
const getDataButton = document.getElementById('get-data-button');
const searchTermInput = document.getElementById('search-term');
const searchButton = document.getElementById('search-button');
const resultsDiv = document.getElementById('results');

let epgData; // Stores downloaded EPG data
let channelMap; // Stores channel ID to channel information mapping

getDataButton.addEventListener('click', async () => {
  if (!epgFileInput.files[0] || !channelFileInput.files[0]) {
    alert('Please select both EPG and channel files.');
    return;
  }

  try {
    // Read EPG data asynchronously with progress updates
    const epgFile = epgFileInput.files[0];
    const epgReader = new FileReader();
    epgReader.addEventListener('progress', (event) => {
      const progress = (event.loaded / event.total) * 100;
      progressBar.value = progress;
      progressText.textContent = `${progress}%`;
    });
    const epgDataPromise = new Promise(resolve => {
      epgReader.onload = () => {
        resolve(epgReader.result);
      };
    });
    epgData = await epgDataPromise;
    console.log('EPG data uploaded');

    // Read channel data asynchronously with progress updates
    const channelFile = channelFileInput.files[0];
    const channelReader = new FileReader();
    channelReader.addEventListener('progress', (event) => {
      const progress = (event.loaded / event.total) * 100;
      progressBar.value = progress;
      progressText.textContent = `${progress}%`;
    });
    const channelDataPromise = new Promise(resolve => {
      channelReader.onload = () => {
        resolve(channelReader.result);
      };
    });
    const channelData = await channelDataPromise;
    channelMap = parseM3u(channelData);
    console.log('Channel map created');
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
      const channelInfo = channelMap[channelId];
      if (channelInfo) {
        // Search for channel URL based on name
        const channelUrl = findChannelUrlByName(channelInfo.name, channelMap);
        results.push({
          title,
          desc,
          channelId,
          channelName: channelInfo.name,
          channelUrl
        });
      }
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
    resultDiv.innerHTML = `
      <h3>${result.title}</h3>
      <p>Channel: ${result.channelName}</p>
      <p>Description: ${result.desc}</p>
      <p>Channel URL: ${result.channelUrl}</p>
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
        url: lastUrlPart // New property to store the last URL
      };
    }
  });
  return channelMap;
}
