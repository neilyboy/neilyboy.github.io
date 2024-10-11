const urlForm = document.getElementById('urlForm');
const downloadButtons = document.getElementById('downloadButtons');
const submitBtn = document.getElementById('submitBtn');
const skipBtn = document.getElementById('skipBtn');
const downloadEPGBtn = document.getElementById('downloadEPGBtn');
const downloadM3UBtn = document.getElementById('downloadM3UBtn');
const uploadForm = document.getElementById('uploadForm');
const uploadBtn = document.getElementById('uploadBtn');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');

submitBtn.addEventListener('click', () => {
    const xtremeUrl = document.getElementById('xtremeUrl').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (xtremeUrl && username && password) {
        // Show the download buttons
        downloadButtons.style.display = 'block';

        downloadEPGBtn.addEventListener('click', () => {
            const epgUrl = `${xtremeUrl}/xmltv.php?username=${username}&password=${password}`;
            window.open(epgUrl);
        });

        downloadM3UBtn.addEventListener('click', () => {
            const m3uUrl = `${xtremeUrl}/get.php?username=${username}&password=${password}&type=m3u_plus&output=ts`;
            window.open(m3uUrl);
        });
    }
});

skipBtn.addEventListener('click', () => {
    // Show Step 2 and hide Step 1
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
    }
});
