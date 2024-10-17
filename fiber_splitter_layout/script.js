document.getElementById('splicingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Capture form data
    const splitterName = document.getElementById('splitterName').value;
    const vaultLabel = document.getElementById('vaultLabel').value;
    const vaultLocation = document.getElementById('vaultLocation').value;
    const fiberCount = document.getElementById('fiberCount').value;
    const groupNumber = document.getElementById('groupNumber').value;
    const address = document.getElementById('address').value;
    const fiberAssigned = document.getElementById('fiberAssigned').value;

    const data = {
        splitterName, 
        vaultLabel,
        vaultLocation,
        fiberCount,
        groupNumber,
        address,
        fiberAssigned
    };

    // Google Apps Script Web App URL
    const url = 'https://script.google.com/macros/s/AKfycbwc4D2YAwguK5Def40jkOgjeeicH9tLKcRp5mxC9AzUq9cWPF7p5x0vN_YmCL50FhYc/exec'; // Replace this with your actual Google Apps Script URL

    // POST data to Google Sheets
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        alert('Data submitted successfully!');
    })
    .catch(error => {
        alert('Error submitting data');
        console.error('Error:', error);
    });
});
