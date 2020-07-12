const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'API_KEY';
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all imaes were loaded
function imageLoaded(){
    
    imagesLoaded++;
    if (imagesLoaded == totalImages){
        ready = true;
        loader.hidden = true;
       
    }
}

// Helper Function to set attriutes on DOM elelments
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// Create Elements for Links and Photos and add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    // Run function for each oject in photosArray
    photosArray.forEach((photo) => {
        
        // Create <a> link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        
        // put <img> inside <a>, then put both inside imgcontiner element
        item.appendChild(img);
        imgContainer.appendChild(item); 
    });
}
// Get photos from unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();        

    }catch(error){

    }
}

// check to see if scrolling near bottom ofthe page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// on load
getPhotos();

