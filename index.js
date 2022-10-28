const form = document.getElementById("form");
const searchfilm = document.getElementById("searchfilm");
const films = document.getElementById("films");
let filmsearched = "";
let movies = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  filmsearched = searchfilm.value;
  displaymovies();
});

const getMovies = async () => {
  movies = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=a6271da45423f425e16ee334ee61c8ee&query=${filmsearched}`
  ).then((response) => response.json());
};

const displaymovies = async () => {
  await getMovies();
  films.innerHTML = movies.results
    .map(
      (movie) =>
        `
      <li>
        <h2>${movie.original_title}</h2>
        <div class="card">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
          <div class="description">
            <p>${movie.overview}</p>
            <p>Popularité : ${movie.popularity}☆</p>
          </div>
        </div>
      </li>
    `
    )
    .join("");
};
