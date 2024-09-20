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
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(row => `
                            <tr>
                                <td>${row.Vault}</td>
                                <td>${row['Fiber Size']}</td>
                                <td>${row['Fibers Used']}</td>
                                <td>${row['LCP Fiber Count']}</td>
                            </tr>
                        `).join
