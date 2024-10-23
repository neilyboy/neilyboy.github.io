document.addEventListener("DOMContentLoaded", function() {
    const API_URL = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=';
    const totalWeeks = 18;

    // Function to fetch data for a specific week
    function fetchWeekScoreboard(week) {
        return fetch(`${API_URL}${week}`)
            .then(response => response.json())
            .then(data => data.events)
            .catch(error => console.error(`Error fetching data for week ${week}:`, error));
    }

    // Function to display the scoreboard data
    function displayScoreboard(week, events) {
        const scoreboard = document.getElementById("scoreboard");

        // Create week header and table
        const weekContainer = document.createElement("div");

        const weekHeader = document.createElement("div");
        weekHeader.classList.add("week-header");
        weekHeader.innerHTML = `
            <span>Week ${week}</span>
            <i class="mdi mdi-chevron-right"></i>
        `;

        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Home Team</th>
                    <th>Home Score</th>
                    <th>Away Team</th>
                    <th>Away Score</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector("tbody");

        events.forEach(event => {
            const date = new Date(event.date).toLocaleDateString();
            const homeTeam = event.competitions[0].competitors.find(team => team.homeAway === 'home');
            const awayTeam = event.competitions[0].competitors.find(team => team.homeAway === 'away');
            
            const homeTeamName = homeTeam.team.displayName;
            const homeTeamLogo = homeTeam.team.logo;
            const homeScore = homeTeam.score || '-';
            
            const awayTeamName = awayTeam.team.displayName;
            const awayTeamLogo = awayTeam.team.logo;
            const awayScore = awayTeam.score || '-';

            const status = event.status.type.shortDetail;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${date}</td>
                <td><img src="${homeTeamLogo}" alt="${homeTeamName} Logo" class="team-logo"> ${homeTeamName}</td>
                <td>${homeScore}</td>
                <td><img src="${awayTeamLogo}" alt="${awayTeamName} Logo" class="team-logo"> ${awayTeamName}</td>
                <td>${awayScore}</td>
                <td>${status}</td>
            `;

            tbody.appendChild(row);
        });

        // Add click event for toggling table visibility
        weekHeader.addEventListener("click", function() {
            table.classList.toggle("show");

            // Toggle the arrow icon
            const icon = weekHeader.querySelector(".mdi");
            if (table.classList.contains("show")) {
                icon.classList.add("mdi-rotate-down");
            } else {
                icon.classList.remove("mdi-rotate-down");
            }
        });

        weekContainer.appendChild(weekHeader);
        weekContainer.appendChild(table);
        scoreboard.appendChild(weekContainer);
    }

    // Fetch and display data for all weeks
    async function fetchAllWeeks() {
        for (let week = 1; week <= totalWeeks; week++) {
            const events = await fetchWeekScoreboard(week);
            displayScoreboard(week, events);
        }
    }

    // Fetch and display all weeks on page load
    fetchAllWeeks();
});
