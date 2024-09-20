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

function processSplitterData(jsonData, splitterName) {
    jsonData = jsonData.slice(2, -1);
    const processedData = jsonData.map(row => {
        if (!Array.isArray(row) || row.length < 3) {
            console.warn("Invalid row data:", row);
            return null;
        }
        const vault = row[0] || '';
        const addressInfo = (row[1] || '').split(':::');
        const address = addressInfo.length > 1 ? addressInfo[1].split('SEBF')[0].trim() : '';
        const port = row[2] || '';
        return { Vault: vault, Address: address, Port: port };
    }).filter(row => row !== null && !row.Port.includes('-'));

    processedData.sort((a, b) => {
        const aMatch = a.Address.match(/(\d+)\s+(.+)/);
        const bMatch = b.Address.match(/(\d+)\s+(.+)/);
        if (aMatch && bMatch) {
            const [, aNum, aStreet] = aMatch;
            const [, bNum, bStreet] = bMatch;
            if (aStreet === bStreet) {
                return parseInt(aNum) - parseInt(bNum);
            }
            return aStreet.localeCompare(bStreet);
        }
        return 0;
    });

    const groupedData = processedData.reduce((acc, row) => {
        const street = row.Address.replace(/^\d+\s+/, '');
        if (!acc[street]) {
            acc[street] = [];
        }
        acc[street].push(row);
        return acc;
    }, {});

    displaySplitterTable(groupedData, splitterName);
}

function displaySplitterTable(data, splitterName) {
    const output = document.getElementById('output');
    let html = '';
    for (const [street, rows] of Object.entries(data)) {
        html += `
            <div class="group">
                <h2>${street}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Vault</th>
                            <th>Address</th>
                            <th>Port</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(row => `
                            <tr>
                                <td>${row.Vault}</td>
                                <td>${row.Address}</td>
                                <td>${row.Port}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
    output.innerHTML = html;
}

function processDistributionData(jsonData, splitterName) {
    const processedData = jsonData.slice(1).map(row => {
        const vaultInfo = row[0].split(':::')[1].split('BFO');
        const vaultRaw = vaultInfo[0].trim();
        const vaultLetter = vaultRaw.charAt(0);
        let vaultDirection = '';
        switch(vaultLetter) {
            case 'A': vaultDirection = '[North]'; break;
            case 'B': vaultDirection = '[East]'; break;
            case 'C': vaultDirection = '[South]'; break;
            case 'D': vaultDirection = '[West]'; break;
        }
        const vault = `${vaultRaw} ${vaultDirection}`;
        
        const fiberSizeMatch = vaultInfo[1].match(/(\d+)/);
        const fiberSize = fiberSizeMatch ? `${fiberSizeMatch[1]} Fiber` : vaultInfo[1].trim();

        return {
            Vault: vault,
            "Fiber Size": fiberSize,
            "Fibers Used": row[1],
            "Fiber Group": row[2],
            "LCP Fiber Count": row[3]
        };
    });

    processedData.sort((a, b) => {
        const groupA = parseInt(a["Fiber Group"].split(' ')[1]);
        const groupB = parseInt(b["Fiber Group"].split(' ')[1]);
        if (groupA !== groupB) {
            return groupA - groupB;
        }
        const countA = parseInt(a["LCP Fiber Count"].split('-')[0]);
        const countB = parseInt(b["LCP Fiber Count"].split('-')[0]);
        return countA - countB;
    });

    const groupedData = processedData.reduce((acc, row) => {
        if (!acc[row['Fiber Group']]) {
            acc[row['Fiber Group']] = [];
        }
        acc[row['Fiber Group']].push(row);
        return acc;
    }, {});

    displayDistributionTable(groupedData, splitterName);
}

function displayDistributionTable(data, splitterName) {
    const output = document.getElementById('output');
    let html = '';
    for (const [group, rows] of Object.entries(data)) {
        html += `
            <div class="group">
                <h2>${group}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Vault</th>
                            <th>Fiber Size</th>
                            <th>Fibers Used</th>
                            <th>LCP Fiber Count</th>

function displaySpliceReport(data, title, imageFile) {
    const output = document.getElementById('output');
    let html = `
        <div class="splice-report">
            <h2>${title}</h2>
            <div class="table-container">
    `;
    
    if (data.length === 0) {
        html += '<p class="error">No valid data found in the Excel file. Please check the file format and try again.</p>';
    } else {
        html += `
            <table>
                <thead>
                    <tr>
                        <th>Beginning Vault</th>
                        <th>Ending Vault</th>
                        <th>Feed Fiber Size</th>
                        <th>Incoming Fiber</th>
                        <th>Tube Color</th>
                        <th>Fiber Color</th>
                        <th>Group Fiber Count</th>
                        <th>Originating Vault</th>
                        <th>Address or Vault</th>
                        <th>Out Fiber Count</th>
                        <th>Out Fiber</th>
                        <th>Out Fiber Color</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => `
                        <tr>
                            <td>${row.beginningVault}</td>
                            <td>${row.endingVault}</td>
                            <td>${row.fiberCount}</td>
                            <td>${row.incomingFiber}</td>
                            <td class="color-cell" style="background-color: ${row.tubeColor.hex}; color: ${row.tubeColor.name === 'Black' ? 'white' : 'black'}">${row.tubeColor.name}</td>
                            <td class="color-cell" style="background-color: ${row.fiberColor.hex}; color: ${row.fiberColor.name === 'Black' ? 'white' : 'black'}">${row.fiberColor.name}</td>
                            <td>${row.groupFiberCount}</td>
                            <td>${row.originatingVault}</td>
                            <td>${row.addressOrVault}</td>
                            <td>${row.outFiberCount}</td>
                            <td>${row.outFiber}</td>
                            <td class="color-cell" style="background-color: ${row.outFiberColor.hex}; color: ${row.outFiberColor.name === 'Black' ? 'white' : 'black'}">${row.outFiberColor.name}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    html += `
            </div>
            <div class="image-container">
                <img id="uploadedImage" alt="Uploaded Image" />
            </div>
        </div>
    `;

    output.innerHTML = html;

    // Load and display the image
    if (imageFile) {
        const imageReader = new FileReader();
        imageReader.onload = function(e) {
            document.getElementById('uploadedImage').src = e.target.result;
        };
        imageReader.readAsDataURL(imageFile);
    }
}
