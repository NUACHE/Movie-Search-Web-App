// Titles: https://omdbapi.com/?s=thor&page=1&apikey=9c5af151
// details: http://www.omdbapi.com/?i=tt3896198&apikey=9c5af151

var page = 1;
var totalPages = 20;
var display = false;

// selecting required element
const element = document.querySelector(".pagination ul");

//calling function with passing parameters and adding inside element which is ul tag

const movieSearchBox = document.getElementById("movie-search-box");
const searchListContainer =
  document.getElementsByClassName("movie-list-wrapper");
const searchList = document.getElementById("movie-list");
const resultGrid = document.getElementById("result-grid");

// load movies from API
async function loadMovies(searchTerm, page) {
  try {
    console.log("loading movie");
    console.log(searchTerm);

    const URL = `https://omdbapi.com/?s=${searchTerm}&page=${page}&apikey=9c5af151`;

    console.log(URL);

    searchList.innerHTML = `
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
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data);
    if (data.Response === "True") {
      // totalPages > 10? element.innerHTML = createPagination(totalPages, page): null;
      totalPages = Math.ceil(parseInt(data.totalResults) / 10);
      element.innerHTML =
        totalPages > 1 ? createPagination(totalPages, page) : "";
      displayMovieList(data.Search);
    }
    if (data.Response === "False") {
      searchList.innerHTML = `
            <div style="align-content: center; justify-content: center;
            margin: auto; margin-top: 20%; 
            "  class="">
                <h1 style="margin: auto;color: red;">Oops....</h1>
                <p style="margin: auto;">${data.Error}</p>
               </div>
            `;
    }
  } catch (error) {
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

function findMovies(page) {
  element.innerHTML = "";
  let searchTerm = movieSearchBox.value.trim();
  console.log(searchTerm);
  if (searchTerm.length > 0) {
    console.log(searchTerm.length);
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm, page);
  } else {
    console.log("hidiing");
    // searchList.classList.add("hide-search-list");

    searchList.innerHTML =
      ' <h1  style="margin: auto; padding-top: 14%;">Search A Movie</h1>';
  }
}

function displayMovieList(movies) {
  console.log("adding");
  searchList.innerHTML = "";

  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
    movieListItem.classList.add("search-list-item");
    if (movies[idx].Poster != "N/A") moviePoster = movies[idx].Poster;
    else moviePoster = "img/image_not_found.png";

    movieListItem.innerHTML = `
        <div class="movie-list-item">
                        <img class="movie-list-item-img" src="${moviePoster}" alt="">
                        
                        <span class="movie-list-item-title" style="word-wrap: break-wrap">${movies[idx].Title}</span>
                        <span class="movie-list-item-desc" style="word-wrap: break-wrap">${movies[idx].Year}</span>
                        
                        <button class="movie-list-item-button">View Details</button>
                    </div>
        `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.querySelector("button").addEventListener("click", async () => {
      try{
      element.innerHTML = "";

      searchList.innerHTML = `
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
      // console.log(movie.dataset.id);
      // searchList.classList.add('hide-search-list');
      movieSearchBox.value = "";
      const result = await fetch(
        `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=9c5af151`
      );
      const movieDetails = await result.json();
      localStorage.clear();
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
    
    });
  });
}

function displayMovieDetails(details) {
  searchList.innerHTML = `
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

function createPagination(totalPages, page) {
  console.log("creating pagination");
  console.log(page);
  console.log(totalPages);
  let liTag = "";
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 1) {
    //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev" onclick="findMovies(${
      page - 1
    });"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if (page > 2) {
    //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="findMovies(${1}); "><span>1</span></li>`;
    if (page > 3) {
      //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // how many pages or li show before the current li
  //   if (page == totalPages) {
  //     beforePage = beforePage - 2;
  //   } else if (page == totalPages - 1) {
  //     beforePage = beforePage - 1;
  //   }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) {
      //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if (page == plength) {
      //if page is equal to plength than assign active string in the active variable
      active = "active";
    } else {
      //else leave empty to the active variable
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick=" findMovies(${plength});"><span>${plength}</span></li>`;
  }

  if (page < totalPages - 1) {
    //if page value is less than totalPage value by -1 then show the last li or page
    if (page < totalPages - 2) {
      //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="findMovies(${totalPages});"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="btn next" onclick="findMovies(${
      page + 1
    });"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  element.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //reurn the li tag
}
