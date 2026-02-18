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
        const request = await fetch(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`);

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

const getSubBreeds = async () => {
    const breed = breedInput.value;
    try {
        const request = await fetch(`https://dog.ceo/api/breed/${breed.toLowerCase()}/list`);
        if(request.status === 404) {
            throw new Error("Breed not found!");
        }
        const json = await request.json();
        const breeds = await json.message;
        if(breeds.length === 0) {
            throw new Error("No sub-breeds found!");
        }
        console.log(breeds);


        const list = document.createElement("ol");
        content.innerHTML = "";
        content.append(list);

        breeds.forEach((breed) => {
            const listEl = document.createElement("li");
            listEl.innerHTML = breed;
            list.append(listEl);
        });

    } catch(e) {
        content.innerHTML = `<p>${e.message}</p>`;
    }


}

const getAllBreeds = async () => {
    try{
        const request = await fetch("https://dog.ceo/api/breeds/list/all");
        if(request.status === 404) {
            throw new Error("Breed not found!");
        }
        const json = await request.json();
        const breeds = await json.message;

        content.innerHTML = "";
        const list = document.createElement("ol");

        for(let breed in breeds) {
            const listEl =  document.createElement("li");
            listEl.innerHTML = breed;
            list.append(listEl);
            if(breeds[breed].length > 0) {
                const subBreedList = document.createElement("ul");
                for(let subBreed of breeds[breed]) {
                    const subBreeedEl = document.createElement("li");
                    subBreeedEl.innerHTML = subBreed;
                    subBreedList.append(subBreeedEl);
                }
                listEl.append(subBreedList);
            }


        }

        content.append(list);

    }catch(e){
        content.innerHTML = `<p>${e.message}</p>`;
    }
}

let content = document.getElementById('content');
let imgSrc = '';
let randomButton = document.getElementById('button-random-dog');
let breedButton = document.getElementById('button-show-breed');
let subBreedButton = document.getElementById('button-show-sub-breed');
let allBreedsButton = document.getElementById('button-show-all');
let breedInput = document.getElementById('input-breed');



const image = document.createElement('img');
content.append(image);



randomButton.addEventListener('click', getRandomDog);
breedButton.addEventListener('click', getDogByBreed);
subBreedButton.addEventListener('click', getSubBreeds);
allBreedsButton.addEventListener('click', getAllBreeds);



