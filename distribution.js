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
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
    output.innerHTML = html;
}
