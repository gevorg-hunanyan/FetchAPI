const countries = document.querySelector('.window')

async function getCountries() {
    const url = await fetch('https://restcountries.com/v3.1/all');
    const res = await url.json();
    res.forEach(country => {
        showCountry(country);
    });
}

function showCountry(data) {
    const country = document.createElement('div');
    country.classList.add('country');
    country.innerHTML =
    `<div class="country-flag">
        <img src=${data.flags.svg} alt="">
    </div>
    <div class="country-details">
        <div class="country-name">
            ${data.name}
        </div>
        <div class="country-region">
            ${data.region}
        </div>
        <div class="country-capital">
            ${data.capital}
        </div>
        <div class="country-population">
            ${data.population}
        </div>
    </div>`

    countries.appendChild(country);
}

getCountries();
