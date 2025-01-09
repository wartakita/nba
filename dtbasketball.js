// Function to populate the schedule table  
function populateScheduleTable(data) {
    const tableBody = document.querySelector("#scheduleTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows  

    data.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `  
                <td>${item.id}</td>  
                <td>${item.game}</td>  
                <td>${item.date}</td>  
                <td>${item.time}</td>  
                <td><button class="btn btn-primary" onclick="loadVideo('${item.videoId}', '${item.m3u8}', '${item.game}')"><i class="fas fa-play-circle icon-animation"></i> Watch</button></td>  
            `;
        tableBody.appendChild(row);
    });
}

// Function to load video based on videoId or m3u8  
function loadVideo(videoId, m3u8, gameTitle) {
    let videoUrl = `https://tvpull.careryun.com/live/ballbar_${videoId}.m3u8`;
    if (!videoId || videoId.trim() === "") {
        videoUrl = m3u8;
    }
    jwplayer("player").setup({
        file: videoUrl,
        image: "https://example.com/video-thumbnail.jpg",
        width: "100%",
        aspectratio: "16:9",
        title: gameTitle // Set the title for JWPlayer  
    });
    // Scroll to the video section  
    document.getElementById('videoSection').scrollIntoView({
        behavior: 'smooth'
    });
}

// Function to load data from JSON file  
function loadScheduleData() {
    fetch('https://wartakita.github.io/nba/schedule.json')
        .then(response => response.json())
        .then(data => {
            populateScheduleTable(data);
            addSearchFunctionality(data);
        })
        .catch(error => {
            console.error('Error loading schedule data:', error);
        });
}

// Function to add search functionality  
function addSearchFunctionality(data) {
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.querySelector("#scheduleTable tbody");

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const filteredData = data.filter(item =>
            item.game.toLowerCase().includes(query) ||
            item.date.toLowerCase().includes(query)
        );

        populateScheduleTable(filteredData);
    });
}

// Load schedule data when the page loads  
window.onload = loadScheduleData;
