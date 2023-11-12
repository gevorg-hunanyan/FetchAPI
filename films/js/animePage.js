async function getAnimeInfo() {
  const id = sessionStorage.getItem('animeId');
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
  const animeInfo = document.querySelector('.anime-info');
  animeInfo.insertAdjacentHTML('beforeend', animeInfoDiv)
}
getAnimeInfo()