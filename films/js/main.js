function createList(json) {
  const list = document.createElement('div');
  list.classList.add('anime-list')
  json.data.forEach(anime => {
    const genres = anime.genres.map(({ name }) => name).join(', ')
    const newItem = `
      <div class="anime-list__item">
        <img class="anime-list__item-img" src="${anime.images.webp.large_image_url}" alt="anime-img">
        <div class="anime-list__item-hover">
          <h3 class="anime-list__item-title">${anime.title}</h3>
          <div class="anime-list__item-descr">
            <p class="anime-list__item-genres">Genres: ${genres}</p>
            <p class="anime-list__item-text">${anime.synopsis}</p>
          </div>
          <a class="anime-list__item-link" data-id='${anime.mal_id}' href="">More</a>
        </div>
      </div>`
    list.insertAdjacentHTML("beforeend", newItem)
  })
  return list
}

async function getAnimeInfo(id) {
  const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
  const json = await response.json();
  const data = json.data;
  const synopsis = data.synopsis.replace(/\r?\n|\r/g, '').replace('[Written by MAL Rewrite]', '');
  let trailerLink = ''
  if (data.trailer.url) {
    trailerLink = `<a class="anime-info__text-trailer" target="_blank" href="${data.trailer.url}">Watch Trailer</a>`
  }
  const animeInfoDiv = `<div class="anime-info__img">
  <img src="${data.images.webp.large_image_url}" alt="animeImg">
</div>
<div class="anime-info__text">
  <p class="anime-info__text-title anime-info__text-title--eng">${data.title}</p>
  <p class="anime-info__text-source">Source: ${data.source}</p>
  <p class="anime-info__text-episodes">Episodes: ${data.episodes}</p>
  <p class="anime-info__text-duration">Duration: ${data.duration}</p>
  <p class="anime-info__text-rating">Raiting: ${data.rating}</p>
  <p class="anime-info__text-synopsis">${synopsis}</p>
  ${trailerLink}
</div>`;
  return animeInfoDiv;
}

// change so onclick new div with position absolute will be created 
function btnsListenersAdd() {
  const btns = document.querySelectorAll('.anime-list__item-link');
  const animeInfo = document.querySelector('.anime-info');
  const animeSection = document.querySelector('.anime');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const fetchedAnimeInfo = getAnimeInfo(btn.dataset.id);
      fetchedAnimeInfo.then(res => {
        animeInfo.innerHTML = res
        animeSection.classList.add('active');
      })
    })
  })
}


//fetchAnime and give filter as parameter*
async function fetchAnimes(filterType, limit) {
  const baseUrl = 'https://api.jikan.moe/v4/top/anime';
  const url = new URL(baseUrl);
  url.searchParams.append('filter', filterType);
  url.searchParams.append('limit', limit);
  const response = await fetch(url);
  const json = await response.json();
  const list = createList(json);
  return list
}


//change code, so if Enter pressed, but input is empty - show warning
const search = document.querySelector('.search-box__input');
search.addEventListener('keydown', async (e) => {
  if (e.code === 'Enter') {
    if (e.target.value.length) {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${e.target.value}`)
      const json = await response.json();
      const container = document.querySelector('.container--anime');
      const list = createList(json)
      container.replaceChildren(list)
      btnsListenersAdd()
    }
    else return
  }
})

async function showList(filterType, limit) {
  const container = document.querySelector('.container--anime');
  const list = await fetchAnimes(filterType, limit);
  console.log(list);
  container.replaceChildren(list);
  btnsListenersAdd();
}
showList('airing', 20);
