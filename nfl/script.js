document.addEventListener("DOMContentLoaded", function() {
    const API_URL = 'http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';

    // Function to fetch data from the API
    function fetchScoreboard() {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const events = data.events;
                displayScoreboard(events);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to display the scoreboard data
    function displayScoreboard(events) {
        const tbody = document.querySelector("#scoreboard tbody");
        tbody.innerHTML = ""; // Clear existing rows

        events.forEach(event => {
            const date = new Date(event.date).toLocaleDateString();
            const homeTeam = event.competitions[0].competitors.find(team => team.homeAway === 'home').team.displayName;
            const homeScore = event.competitions[0].competitors.find(team => team.homeAway === 'home').score;
            const awayTeam = event.competitions[0].competitors.find(team => team.homeAway === 'away').team.displayName;
            const awayScore = event.competitions[0].competitors.find(team => team.homeAway === 'away').score;
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

    // Fetch scoreboard data on page load
    fetchScoreboard();
});
