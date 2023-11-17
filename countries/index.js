const countries = document.querySelector('.window')

async function getCountries() {
    const url = await fetch('https://restcountries.com/v3.1/all');
    const res = await url.json();

    res.sort((a,b) => {
        const aName = a.name.common;
        const bName = b.name.common;
        return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
      });

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
            ${data.name.common}
        </div>
        <div class="country-info">
            <div class="country-region">
                <span class = info-name>region:</span>
                <span class = info-info>${data.region}</span>
            </div>
            <div class="country-capital">
                <span class = info-name>capital:</span>
                <span class = info-info>${data.capital}</span>
            </div>
        </div>
    </div>`

    countries.appendChild(country);
}

getCountries();
