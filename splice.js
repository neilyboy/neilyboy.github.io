const fiberColors = [
    { name: 'Blue', hex: '#3366ffa6' },
    { name: 'Orange', hex: '#ff6600a6' },
    { name: 'Green', hex: '#336633b5' },
    { name: 'Brown', hex: '#9966339c' },
    { name: 'Slate', hex: '#999999a6' },
    { name: 'White', hex: '#FFFFFFFF' },
    { name: 'Red', hex: '#cc0000a6' },
    { name: 'Black', hex: '#000000' },
    { name: 'Yellow', hex: '#ffff33a1' },
    { name: 'Violet', hex: '#660066b0' },
    { name: 'Rose', hex: '#ff669999' },
    { name: 'Aqua', hex: '#00cccca6' }
];

function getFiberColor(fiberNumber) {
    return fiberColors[(fiberNumber - 1) % 12];
}

function getTubeColor(fiberNumber) {
    return fiberColors[Math.floor((fiberNumber - 1) / 12) % 12];
}

function processSpliceData(data, title, imageFile) {
    const processedData = [];
    for (let i = 2; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length < 7) continue;

        try {
            const vaultInfo = (row[1] || '').split(':::');
            const beginningVault = (vaultInfo[0] || '').replace(/\([^)]*\)/g, '').trim();
            const endingVault = ((vaultInfo[1] || '').split('BFO')[0] || '').trim();
            const fiberCountMatch = (row[1] || '').match(/(\d+)I/);
            const fiberCount = fiberCountMatch ? fiberCountMatch[1] + ' Fiber' : 'N/A';
            const incomingFiber = row[2] || '';
            let tubeColor = { name: '', hex: '' };
            let fiberColor = { name: '', hex: '' };
            
            if (!incomingFiber.includes('-')) {
                const fiberNumber = parseInt(incomingFiber) || 0;
                tubeColor = getTubeColor(fiberNumber);
                fiberColor = getFiberColor(fiberNumber);
            }

            const groupInfo = (row[3] || '').split('=');
            const groupFiberCount = (groupInfo[1] || '').trim();
            const originatingInfo = (row[5] || '').split(':::');
            const originatingVault = (originatingInfo[0] || '').trim();
            const addressOrVault = ((originatingInfo[1] || '').split(/SEBF|BFO/)[0] || '').trim();
            const outFiberCountMatch = (row[5] || '').match(/(\d+)I/);
            const outFiberCount = outFiberCountMatch ? outFiberCountMatch[1] + ' Fiber' : 'N/A';
            const outFiber = row[6] || '';
            let outFiberColor = { name: '', hex: '' };
            
            if (!outFiber.includes('-')) {
                const outFiberNumber = parseInt(outFiber) || 0;
                outFiberColor = getFiberColor(outFiberNumber);
            }

            processedData.push({
                beginningVault,
                endingVault,
                fiberCount,
                incomingFiber,
                tubeColor,
                fiberColor,
                groupFiberCount,
                originatingVault,
                addressOrVault,
                outFiberCount,
                outFiber,
                outFiberColor
            });
        } catch (error) {
            console.error(`Error processing row ${i + 1}:`, error);
        }
    }

    displaySpliceReport(processedData, title, imageFile);
}

function displaySpliceReport(data, title, imageFile) {
    const output = document.getElementById('output');
    let html = `<h2>${title}</h2>`;
    
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

    // Add image placeholder
    html += '<img id="uploadedImage" alt="Uploaded Image" />';

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
