let currentApp = '';

function selectApp(app) {
    currentApp = app;
    document.getElementById('app-container').style.display = 'block';
    document.getElementById('main-title').textContent = getAppTitle(app);
    document.getElementById('title-input').placeholder = getPlaceholder(app);
    document.getElementById('output').innerHTML = '';
    document.getElementById('print-btn').style.display = 'none';
    
    // Show/hide image upload for splice sheet
    const imageUploadLabel = document.querySelector('label[for="imageFile"]');
    imageUploadLabel.style.display = app === 'splice' ? 'inline-block' : 'none';
}

function getAppTitle(app) {
    switch(app) {
        case 'splitter': return 'Fiber Splitter Cabinet Layout';
        case 'distribution': return 'Distribution Fiber LCP Cabinet Layout';
        case 'splice': return 'Splice Sheet Generator';
        default: return 'Fiber Layout and Splice Sheet Applications';
    }
}

function getPlaceholder(app) {
    switch(app) {
        case 'splitter': return 'Enter splitter name';
        case 'distribution': return 'Enter Splitter Name';
        case 'splice': return 'Enter title';
        default: return 'Enter title';
    }
}

function updateFileName() {
    const fileName = this.value.split("\\").pop();
    this.previousElementSibling.textContent = fileName || "Choose XLSX File";
}

function processFile() {
    const fileInput = document.getElementById('file-upload');
    const titleInput = document.getElementById('title-input').value;
    const imageFile = document.getElementById('imageFile').files[0];
    const output = document.getElementById('output');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        let jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1});

        switch(currentApp) {
            case 'splitter':
                processSplitterData(jsonData, titleInput);
                break;
            case 'distribution':
                processDistributionData(jsonData, titleInput);
                break;
            case 'splice':
                processSpliceData(jsonData, titleInput, imageFile);
                break;
        }

        document.getElementById('print-btn').style.display = 'inline-block';
        document.getElementById('main-title').textContent += ` For ${titleInput}`;
        document.title = `${getAppTitle(currentApp)} - ${titleInput}`;
    };

    reader.readAsArrayBuffer(file);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('file-upload').addEventListener('change', updateFileName, false);
    document.getElementById('process-btn').addEventListener('click', processFile);
    document.getElementById('print-btn').addEventListener('click', () => window.print());
});
