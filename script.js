const imageContainer = document.getElementById('imageContainer');
const APIkey = "E520J6ak_XEapKRVn9VjHpdvWOGo5I__ht8K7jJljng";
const query = 'Food and Drink'
const count = 30;
const APIaddr = `https://api.unsplash.com/photos/random/?client_id=${APIkey}&query=${query}&count=${count}`;
let allPhotos = [];
const loading = document.getElementById("loading");


function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    allPhotos.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
    loading.classList.remove('show');
};


async function getPhotos() {
    try {
        const response = await fetch(APIaddr);
        allPhotos = await response.json();
        displayPhotos();
    } catch (error) {
      document.body.innerHTML = "error";
    }
}

getPhotos();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight - 5) {
        showLoading();
    }
})

function showLoading() {
    loading.classList.add('show');
    getPhotos();
}