async function start(){
    let response = await fetch("https://dog.ceo/api/breeds/list/all");
    let data = await response.json();
    createBreedList(data.message)
}

start()

function createBreedList(breedList){
    const element = document.getElementById("breed");
    element.innerHTML = `<select onchange="loadByBreed(this.value)"><option> Select a dog breed</option>
    ${Object.keys(breedList).map((breed) => {
        return `<option>${breed}</option>`
    }).join("")}   
    </select>`


}

  async function loadByBreed(breed){
    if(breed != "Select a dog breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json()
        gettingImage(data.message)
        
    }

}
function gettingImage(images){
    const len = images.length;
    let i = Math.floor(Math.random() * len)
    document.getElementById("images").innerHTML =`<div class="image" style="background-image: url('${images[i]}')"></div>`
}
