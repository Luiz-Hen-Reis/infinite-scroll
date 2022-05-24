// Initial Data
const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// API Data
let photosArray = [];
let count = 5;
const key = 'srCYbkMMEE_SwXSSi1PWihJ1Ff3bitw6PatB_KQ1X7g';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`;

// Functions
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
        count = 30;
        imagesLoaded = 0;
    }
}

function showPhotosInDOM() {
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        let imageLink = document.createElement('a');
        imageLink.setAttribute('href', photo.links.html);
        imageLink.setAttribute('target', '_blank');

        let image = document.createElement('img');
        image.setAttribute('src', photo.urls.regular);
        image.setAttribute('alt', photo.alt_description);
        image.setAttribute('title', photo.location.title);
        if(!photo.location.title) {
            image.title = '';
        }

        image.addEventListener('load', imageLoaded);

        imageLink.appendChild(image);
        imageContainer.appendChild(imageLink);
    });
}

// Getting pictures from API
async function getPhotosFromAPI() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        showPhotosInDOM();
    } catch (error) {

    }
}

// Event Listeners
window.addEventListener('scroll', () => {
    // Se a altura total da janela do browser + a distancia que foi scrollada na pagina for maior que o total do body do documento - 1000px
    if(window.innerHeight + window.scrollY >=  document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotosFromAPI();
    }
})

getPhotosFromAPI();