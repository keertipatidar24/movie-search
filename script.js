
const API_KEY = '992a8415';
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const imagesection = document.getElementById('image-section');
const moviesGrid = document.getElementById('movies-grid');
const movieDetails = document.getElementById('movie-details');
const watchlistSection = document.getElementById('watchlist');
const watchlistBtn = document.getElementById('watchlist-btn');
const clearWatchlistBtn = document.createElement('button'); // Create the Clear Watchlist button

let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Add Clear Watchlist button styles and text
clearWatchlistBtn.textContent = 'Clear Watchlist';
clearWatchlistBtn.classList.add('clear-watchlist-btn');

// Search movies
searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
        try {
            //hide image section 
            imagesection.style.display = 'none'
            const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
            const data = await response.json();
            if (data.Search) {
                displayMovies(data.Search);
            } else {
                moviesGrid.innerHTML = '<p>No movies found.</p>';
            }
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    }
});

// Display search results
function displayMovies(movies) {
    moviesGrid.innerHTML = movies.map(movie => `
        <div class="movie">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title} (${movie.Year})</h3>
            <button onclick="showDetailsPopup('${movie.imdbID}')">View Details</button>
            <button onclick="addToWatchlist('${movie.imdbID}', '${movie.Title}', '${movie.Poster}')">Add to Watchlist</button>
        </div>
    `).join('');
}

// Show movie details in popup
async function showDetailsPopup(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
        const movie = await response.json();

        // Create the popup content
        const popup = document.createElement('div');
        popup.classList.add('popup');

        popup.innerHTML = `
            <div class="popup-content">
                <span class="close-btn" onclick="closePopup()">×</span>
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>
                <p><b>Director:</b> ${movie.Director}</p>
                <p><b>Cast:</b> ${movie.Actors}</p>
                <p><b>Plot:</b> ${movie.Plot}</p>
            </div>
        `;

        document.body.appendChild(popup); // Append the popup to the body
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

// Close popup
function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove(); // Remove the popup from the DOM
    }
}

// Add movie to watchlist
function addToWatchlist(imdbID, title, poster) {
    watchlist.push({ imdbID, title, poster });
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    alert('Movie added to watchlist');
}

// View Watchlist
watchlistBtn.addEventListener('click', () => {
    const watchlistItems = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (watchlistItems.length === 0) {
        watchlistSection.innerHTML = '<p>Your watchlist is empty.</p>';
    } else {
        watchlistSection.innerHTML = watchlistItems.map((item, index) => `
            <div class="movie">
                <img src="${item.poster}" alt="${item.title}">
                <h3>${item.title}</h3>
                <button onclick="removeFromWatchlist(${index})">Remove</button>
            </div>
        `).join('');
        watchlistSection.appendChild(clearWatchlistBtn); // Append Clear Watchlist button
    }
    watchlistSection.classList.remove('hidden');
    moviesGrid.classList.add('hidden');
    movieDetails.classList.add('hidden');
});

// Remove movie from watchlist
function removeFromWatchlist(index) {
    watchlist.splice(index, 1); 
    localStorage.setItem('watchlist', JSON.stringify(watchlist)); 
    alert('Movie removed from watchlist');
    displayWatchlist(); // Refresh the watchlist display
}

// Display updated watchlist
function displayWatchlist() {
    const watchlistItems = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (watchlistItems.length === 0) {
        watchlistSection.innerHTML = '<p>Your watchlist is empty.</p>';
    } else {
        watchlistSection.innerHTML = watchlistItems.map((item, index) => `
            <div class="movie">
                <img src="${item.poster}" alt="${item.title}">
                <h3>${item.title}</h3>
                <button onclick="removeFromWatchlist(${index})">Remove</button>
            </div>
        `).join('');
        watchlistSection.appendChild(clearWatchlistBtn);
    }
}

// Call displayWatchlist() whenever you need to refresh the watchlist
watchlistBtn.addEventListener('click', displayWatchlist);


// Clear watchlist function
clearWatchlistBtn.addEventListener('click', () => {
    localStorage.removeItem('watchlist');
    watchlist = [];
    watchlistSection.innerHTML = '<p>Your watchlist is empty.</p>';
});
