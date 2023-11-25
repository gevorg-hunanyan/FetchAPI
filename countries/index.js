const countries = document.querySelector('.window');
const search = document.querySelector('.search');


async function getCountries() {
    try {
        const url = await fetch('https://restcountries.com/v3.1/all');
        const res = await url.json();

        res.sort((a, b) => {
            const aName = a.name.common;
            const bName = b.name.common;
            return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
        });

        res.forEach(country => {
            showCountry(country);
        });
    }
    catch (err) {
        console.log('getCountries():', err);
    }
}
getCountries();


async function getCountry(name) {
    try {
        const url = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const res = await url.json();
        return res;
    }
    catch (err) {
        console.log('getCountry():', err);
    }
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
    country.addEventListener("click", onClickCountry);
}


const countryName = document.getElementsByClassName('country-name');
search.addEventListener('input', e => {
    Array.from(countryName).forEach(country => {
        if (country.innerText.toLowerCase().includes(search.value.toLowerCase())) {
            country.parentElement.parentElement.style.display = 'flex';
        } else {
            country.parentElement.parentElement.style.display = 'none';
        }
    })
});


const countryArray = document.getElementsByClassName('country');
Array.from(countryArray).forEach(ctr => ctr.addEventListener("click", onClickCountry));

let countryData;
async function onClickCountry() {
    countryData = await getCountry(this.innerText.split('\n')[0]);

    Array.from(countryArray).forEach(ctr => ctr.style.display = 'none');
    showCountryPage();
}
//single
function showCountryPage() {
    const main=countryData[0]
    const countryPage = document.createElement('div');
    countryPage.classList.add('country-page');
    countryPage.innerHTML =
        `<h1>${main.name.official}</h1>
    <div class="country-page-flag">
        <img src=${main.flags.svg} alt="">
    </div>
    <div class="country-details">
        <div class="country-name">
            ${main.name.common}
        </div>
        <div class="country-info">
            <div class="country-region">
                <span class = info-name>region:</span>
                <span class = info-info>${main.region}</span>
            </div>
            <div class="country-capital">
                <span class = info-name>capital:</span>
                <span class = info-info>${main.capital}</span>
            </div>
            <div class="country-region">
                <span class = info-name>population:</span>
                <span class = info-info>${main.population}</span>
            </div>
            <div class="country-region">
                <span class = info-name>area:</span>
                <span class = info-info>${main.area}</span>
            </div>
        </div>
        <button id="btn">Back</btn>
    </div>`
    countries.appendChild(countryPage);
    const btn=document.querySelector('#btn')
    btn.addEventListener("click", onClickBackButton);
}

function onClickBackButton() {
    Array.from(countryArray).forEach(ctr => ctr.style.display = 'flex');
    const el=document.querySelector('.country-page');
    el.remove()
}
