function processSplitterData(jsonData, splitterName) {
    jsonData = jsonData.slice(2, -1);
    const processedData = jsonData.map(row => ({
        Vault: row[0],
        Address: row[1].split(':::')[1].split('SEBF')[0].trim(),
        Port: row[2]
    })).filter(row => !row.Port.includes('-'));

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
