// ===== Application Setup =====
const appName = "Movie Application";
console.log(`Application Name: ${appName}`);


// =====  Movies (12) =====
const movies = [
  { title: "Avatar", year: 2009, image: "images/avatar.webp" },
  { title: "Inception", year: 2010, image: "images/ins.jpg" },
  { title: "Black Panther", year: 2018, image: "images/blcp.jpg" },
  { title: "Titanic", year: 1997, image: "images/Titanic.jpg" },
  { title: "The Avengers", year: 2012, image: "images/avarages.jpg" },
  { title: "Jurassic Park", year: 1993, image: "images/jurui.jpg" },
  { title: "Frozen", year: 2013, image: "images/frozen.jpg" },
  { title: "Toy Story", year: 1995, image: "images/toy.jpg" },
  { title: "Spider-Man", year: 2002, image: "images/spider.jpg" },
  { title: "The Lion King", year: 2019, image: "images/li.jpg" },
  { title: "Finding Nemo", year: 2003, image: "images/nemo.jpg" },
  { title: "Star Wars", year: 1977, image: "images/star.jpg" }
];


// ===== DOM =====
const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loadingElement = document.getElementById("loading");


// ===== Loading =====
const showLoading = () => loadingElement.classList.remove("hidden");
const hideLoading = () => loadingElement.classList.add("hidden");


// ===== Render Movies =====
const renderMovies = (movieList) => {
  movieContainer.innerHTML = "";

  movieList.forEach(({ title, year, image }) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${image}" alt="${title}">
      <h3>${title}</h3>
      <p>${year}</p>
    `;

    movieContainer.appendChild(card);
  });
};


// ===== OMDb Movie API =====
const fetchOnlineMovies = async (query) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=thewdb`
    );

    const data = await response.json();

    if (!data.Search) return [];

    return data.Search.slice(0, 4).map(movie => ({
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x450?text=No+Image"
    }));

  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};


// ===== Search =====
const handleSearch = async () => {
  const value = searchInput.value.trim();
  if (!value) return;

  showLoading();

  const localResults = movies.filter(movie =>
    movie.title.toLowerCase().includes(value.toLowerCase())
  );

  const onlineResults = await fetchOnlineMovies(value);

  hideLoading();

  renderMovies([...localResults, ...onlineResults]);
};


// ===== Events =====
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleSearch();
});


// ===== Initial Load =====
renderMovies(movies);