function init() {
    const form = document.querySelector('#dogForm');
    form.classList.add('hide');
    getDogList();
    setupForm();
  }
  

function setupForm() {
const form = document.querySelector('#dogForm')
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event.target);
    const formData =new FormData(event.target);
    const dogEndpoint = formData.get('dog');
    getDogImage(dogEndpoint);
})
}

function getDogImage(endpoint) {
fetch(`https://dog.ceo/api/breed/${endpoint}/images/random`)
    .then((response) => {
    return response.json()
    })
    .then((data) => {
    const img = document.createElement('img');
    img.src = data.message;
    img.height = 300;
    img.addEventListener('click', (event) => {
        event.target.remove();
        })
    const container = document.querySelector('#dogImg');
    // container.innerHTML = '';
    container.appendChild(img);
    })
}

function getDogList() {
fetch('https://dog.ceo/api/breeds/list/all')
    .then((response) => {
    return response.json()
    })
    .then((data) => {
    console.log(data.message)
    const finalDogList = transformDogData(data.message)
    const selectDog = document.querySelector('#selectDog')
    finalDogList.forEach((dog) => {
        const option = document.createElement('option')
        option.value = dog.endpoint
        option.innerText = dog.name
        selectDog.appendChild(option)
    })
    const form = document.querySelector('#dogForm');
    form.classList.remove('hide');
    const loading = document.querySelector('#loading');
    loading.classList.add('hide');
    })
}
function transformDogData(dogList) {
const finalDogList = []
const dogListKeys = Object.keys(dogList)
dogListKeys.forEach((breed) => {
    if (dogList[breed].length === 0) {
    finalDogList.push({ endpoint: breed, name: breed })
    } else {
    dogList[breed].forEach((subBreed) => {
        finalDogList.push({
        endpoint: `${breed}/${subBreed}`,
        name: `${subBreed} ${breed}`,
        })
    })
    }
})
return finalDogList
}
  
  init()
  