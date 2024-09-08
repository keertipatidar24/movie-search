Movie Search App
Overview

The Movie Search App allows users to search for movies, view detailed information, and add movies to their watchlist. The app is powered by the OMDb API to retrieve movie data.
Features

    Movie Search: Users can search for movies by title.
    Movie Details: Detailed movie information such as title, director, cast, and plot is displayed in a popup.
    Watchlist Management: Users can add movies to their watchlist, view the watchlist, and remove movies from it. The watchlist is stored using Local Storage.
    Responsive Design: The app is responsive and works well on both desktop and mobile devices.

Pages

    Home Page: Contains a search bar and displays a background image with a selection of featured movie images.
    Movie Grid: Shows search results in a grid format with images and titles.
    Watchlist Page: Displays movies added to the user's watchlist.
    Movie Details Popup: Displays detailed movie information.

Technologies Used

    HTML for the structure of the application.
    CSS for styling and responsive design.
    JavaScript for interactivity and dynamic content.
    OMDb API for fetching movie data.

How to Use

    Clone or download this repository.
    Open index.html in your web browser.
    Enter a movie title in the search bar and click on the "Search" button to see results.
    Click on a movie's "View Details" button to view detailed information.
    Click on "Add to Watchlist" to add the movie to your watchlist.
    Click on "View Watchlist" to see the saved movies.
    Remove movies from the watchlist by clicking on the "Remove" button next to each movie.
    Use the "Clear Watchlist" button to remove all movies from the watchlist.

Installation

    Clone the repository:


API Key

This project uses the OMDb API. You need to replace the API_KEY in script.js with your own key:

javascript

const API_KEY = '992a8415';

Credits

    Movie data provided by OMDb API.
    Background and movie poster images sourced from various free resources.
    Giphy logo used from Giphy.

