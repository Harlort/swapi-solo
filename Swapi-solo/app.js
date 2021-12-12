
//Variables.
const film = document.getElementById('film')
const filmModal = document.getElementById('film-modal')
const filmContainer = document.getElementById('film-modal-container')
const filmContent = document.getElementById('film-modal-content')
const filmRelease = document.getElementsByClassName('film-release')
const loading = document.getElementById('loading')
const loadingModal = document.getElementById('film-modal-loader')
const closeBtn = document.getElementById('times')

//Empty array for juicy info later on.
let films = []


//Fetch function to SWAPI, puts result in array and maps out films.
const getFilms = async () => {
    const res = await fetch('https://swapi.dev/api/films')
    const data = await res.json()
    films = data.results
    loading.style.display = 'none'
    film.innerHTML = 
    films.map((film, index)=> 
        `<div class="film-release" onclick="openFilmModal(${index})">
            <p>${film.title}<br>${film.release_date}</p>
        </div>`).join(' ') 
}

//Open modal along with arrayed index.
const openFilmModal = () => {
    for (let i = 0; i < filmRelease.length; i++) {
        filmRelease[i].addEventListener('click', () => {
            filmModal.style.display = 'flex';
            filmContents(i)
        })
    }
}

//Character url fetch to match correct movie.
const characters = (index) => {
    const promises = films[index].characters.map( async (url) => {
        const res = await fetch(url)
        return await res.json()
    });
    return promises;
}

//Function to get characters for correct movie(index) and sort in alphabetical order.
//Pushes content into pop-up.
const filmContents = async (index) => {
    const res = await Promise.all(characters(index))
    res.sort((a, b) => (a.name > b.name) ? 1 : -1)
    filmContent.innerHTML = 
        `<div id="pop-modal">
        <h1>${films[index].title}</h1><br>
            <h2>Characters:</h2>`+ 
            res.map((character) => `<p>${character.name}</p>`).join('') + 
        `</div>`
    loadingModal.style.display = 'none'
    filmContainer.style.display = 'block'
    filmContent.style.display = 'flex'
}

//Close modal on span click.
const closeFilmModal = () => {
    closeBtn.addEventListener('click', () => {
        filmModal.style.display = 'none'
        filmContainer.style.display = 'none'
        loadingModal.style.display = 'flex'
    })
}

//When the window has loaded, runs functions.
window.addEventListener('load', () => {
    getFilms()
    openFilmModal();
    closeFilmModal();
})