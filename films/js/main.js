function createList(json) {
  const list = document.createElement('div');
  list.classList.add('anime-list')
  json.data.forEach(anime => {
    const genres = anime.genres.map(({ name }) => name).join(', ')
    const newItem = `
      <div class="anime-list__item">
      <img class="anime-list__item-img" src="${anime.images.webp.large_image_url}"
        alt="anime-img">
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

function btnsListener(btns) {
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      console.log(btn.dataset.id)
    })
  })
}

async function fetchTopAnimes() {
  const baseUrl = 'https://api.jikan.moe/v4/top/anime';
  const filterType = 'airing';
  const limit = 20;
  const url = new URL(baseUrl);
  url.searchParams.append('filter', filterType);
  url.searchParams.append('limit', limit);
  const response = await fetch(url);
  const json = await response.json();
  const container = document.querySelector('.container--anime');
  const list = createList(json);
  container.append(list)
  const moreBtns = document.querySelectorAll('.anime-list__item-link');
  btnsListener(moreBtns)
}
fetchTopAnimes()


const search = document.querySelector('.search-input');
search.addEventListener('keydown', async (e) => {
  if (e.code === 'Enter') {
    if (e.target.value.length) {
      const topList = document.querySelector('.anime-list');
      e.preventDefault();
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${e.target.value}`)
      const json = await response.json();
      const container = document.querySelector('.container--anime');
      const list = createList(json)
      container.replaceChildren(list)
      const moreBtns = document.querySelectorAll('.anime-list__item-link');
      btnsListener(moreBtns)
      search.addEventListener('input', (e) => {
        if (!e.target.value.length) {
          container.replaceChildren(topList)
        }
      })
    }
    else return
  }
})
