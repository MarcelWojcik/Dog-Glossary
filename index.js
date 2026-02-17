const getRandomDog = async () => {
    const request = await fetch('https://dog.ceo/api/breeds/image/random');
    const json = await request.json();
    const src = await json.message;
    imgSrc = await src;
    image.src = await imgSrc;
    content.innerHTML = `<img src="${imgSrc}" alt="dog">`;
}

const getDogByBreed = async () => {
    const breed = breedInput.value;
    try {
        const request = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);

        if(request.status === 404) {
            throw new Error("Breed not found!");
        }
        const json = await  request.json();
        const src = await json.message;
        imgSrc = await src;
        image.src = await imgSrc;
        content.innerHTML = `<img src="${imgSrc.toLowerCase()}" alt="dog">`;
    } catch(e){

        content.innerHTML = `<p>${e.message}</p>`;
    }

}

let content = document.getElementById('content');
let imgSrc = '';
let randomButton = document.getElementById('button-random-dog');
let breedButton = document.getElementById('button-show-breed');
let breedInput = document.getElementById('input-breed');


const image = document.createElement('img');
content.append(image);



randomButton.addEventListener('click', getRandomDog);
breedButton.addEventListener('click', getDogByBreed);



