const urlForm = document.getElementById('urlForm');
const downloadButtons = document.getElementById('downloadButtons');
const submitBtn = document.getElementById('submitBtn');
const skipBtn = document.getElementById('skipBtn');
const downloadEPGBtn = document.getElementById('downloadEPGBtn');
const downloadM3UBtn = document.getElementById('downloadM3UBtn');

submitBtn.addEventListener('click', () => {
    const xtremeUrl = document.getElementById('xtremeUrl').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (xtremeUrl && username && password) {
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
    // Implement logic to skip URL input or load saved data
});
