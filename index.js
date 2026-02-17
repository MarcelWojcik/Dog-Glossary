const getRandomDog = async () => {
    const request = await fetch('https://dog.ceo/api/breeds/image/random');
    const json = await request.json();
    const src = await json.message;
    imgSrc = await src;
    image.src = await imgSrc;
}

let button = document.getElementById('button-random-dog');
let content = document.getElementById('content');
let imgSrc = '';


const image = document.createElement('img');
content.append(image);

button.addEventListener('click', getRandomDog);


