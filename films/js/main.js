const baseUrl = 'https://api.jikan.moe/v4/top/anime';
const filterType = 'airing';
const limit = 20;
const url = new URL(baseUrl);
url.searchParams.append('filter', filterType);
url.searchParams.append('limit', limit);

async function fetchAnimes() {
  const response = await fetch(url);
  const json = await response.json();
  const list = document.querySelector('.anime-list');

  json.data.forEach(anime => {
    const newItem = `<div class="anime-list__item">
    <img class="anime-list__item-img" src="${anime.images.webp.large_image_url}"
      alt="anime-img">
    <div class="anime-list__item-hover">
      <h3 class="anime-list__item-title">${anime.title}</h3>
      <div class="anime-list__item-descr">
        <p >${anime.synopsis}</p>
      </div>
      <a class="anime-list__item-link" href="">More</a>
    </div>
  </div>`
    list.insertAdjacentHTML('beforeend', newItem)
  })
  console.log(json.data)
}
fetchAnimes()