window.addEventListener("load", (event) => {
  var id = localStorage.getItem("movieId");
  console.log("selected");
  console.log(id);
  if (id) {
    loadSelectedMovie(id);
  }
});

//calling function with passing parameters and adding inside element which is ul tag

const movieBox = document.getElementById("movie-search-box");

const searchData = document.getElementById("movie-list");

async function routeToMovie(id) {
  window.location.href = "search.html";
}

async function loadSelectedMovie(id) {
try{
  // location.href='search.html';

  searchData.innerHTML = `
          <div class="loader loader--style1" title="0">
                          <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                           width="140px" height="140px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                          <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                            s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                            c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                          <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                            C22.32,8.481,24.301,9.057,26.013,10.047z">
                            <animateTransform attributeType="xml"
                              attributeName="transform"
                              type="rotate"
                              from="0 20 20"
                              to="360 20 20"
                              dur="0.5s"
                              repeatCount="indefinite"/>
                            </path>
                          </svg>
                        </div>`;
  movieBox.value = "";
  const result = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=9c5af151`);
  localStorage.clear();

  const movieDetails = await result.json();
  // console.log(movieDetails);
  displayMovieDetails(movieDetails);
}catch (error) {
  searchList.innerHTML = `
  <div style="align-content: center; justify-content: center;
  margin: auto; margin-top: 20%; 
  "  class="">
      <h1 style="margin: auto;color: red;">Oops....</h1>
      <p style="margin: auto;">${error.message}</p>
     </div>
  `;
}
}

function displayMovieDetails(details) {
  searchData.innerHTML = `
      <div class = "result-container">
              <div class = "result-grid" id = "result-grid">
      <div class = "movie-poster">
          <img src = "${
            details.Poster != "N/A" ? details.Poster : "img/image_not_found.png"
          }" alt = "movie poster">
      </div>
      <div class = "movie-info">
          <h3 class = "movie-title">${details.Title}</h3>
          <ul class = "movie-misc-info">
              <li class = "year">Year: ${details.Year}</li>
              <li class = "rated">Ratings: ${details.Rated}</li>
              <li class = "released">Released: ${details.Released}</li>
          </ul>
          <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
          <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
          <p class = "actors"><b>Cast: </b>${details.Actors}</p>
          <p class = "plot"><b>Plot Summary:</b> ${details.Plot}</p>
          <p class = "language"><b>Language:</b> ${details.Language}</p>
          <p class = "awards"><b><i class = "fas fa-award"></i></b> ${
            details.Awards
          }</p>
      </div>
      </div>
      </div>
      `;
}
