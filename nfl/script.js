document.addEventListener("DOMContentLoaded", function() {
    const API_URL = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week='; // Add ?week= to specify weeks
    const totalWeeks = 18; // Regular season has 18 weeks

    // Function to fetch data for a specific week
    function fetchWeekScoreboard(week) {
        return fetch(`${API_URL}${week}`)
            .then(response => response.json())
            .then(data => data.events)
            .catch(error => console.error(`Error fetching data for week ${week}:`, error));
    }

    // Function to display the scoreboard data
    function displayScoreboard(events) {
        const tbody = document.querySelector("#scoreboard tbody");

        events.forEach(event => {
            const date = new Date(event.date).toLocaleDateString();
            const homeTeam = event.competitions[0].competitors.find(team => team.homeAway === 'home').team.displayName;
            const homeScore = event.competitions[0].competitors.find(team => team.homeAway === 'home').score || '-';
            const awayTeam = event.competitions[0].competitors.find(team => team.homeAway === 'away').team.displayName;
            const awayScore = event.competitions[0].competitors.find(team => team.homeAway === 'away').score || '-';
            const status = event.status.type.shortDetail;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${date}</td>
                <td>${homeTeam}</td>
                <td>${homeScore}</td>
                <td>${awayTeam}</td>
                <td>${awayScore}</td>
                <td>${status}</td>
            `;

            tbody.appendChild(row);
        });
    }

    // Fetch and display data for all weeks
    async function fetchAllWeeks() {
        const tbody = document.querySelector("#scoreboard tbody");
        tbody.innerHTML = ""; // Clear any existing rows before loading all weeks

        for (let week = 1; week <= totalWeeks; week++) {
            const events = await fetchWeekScoreboard(week);
            displayScoreboard(events);
        }
    }

    // Fetch and display all weeks on page load
    fetchAllWeeks();
});
