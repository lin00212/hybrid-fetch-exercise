(()=>{
    document.querySelector("#searchForm").addEventListener("submit", (e) => {
        e.preventDefault();
        searchImages();
    });
})()


const BASE_URL = "https://api.unsplash.com/search/photos/?client_id=4WeEFWUyF1jLkAx3hV3jJNdZNCwUO4VuRlzRkL2FeJw&query="

function searchImages() {

    const search = document.querySelector("#search").value;

    if(search === ""){
        alert("Please enter a search term");
        return;
    }

    fetch(`${BASE_URL}${search}`)
    .then((resp) => {
        if(!resp.ok){
            throw new Error(resp.status);
        }
        return resp.json()
    })
    .then((json) => {

        // TODO: handle exceptions case:  if no result found
        
        if(json.results.length === 0){
            alert("No results found");
            return;
        }
        console.log(json.results)
        json.results.forEach((imageData) => {
            displayImages(imageData.urls.small, imageData.alt_description)
        })
    })
    .catch(err => {
        alert(err.message);
    })
}


function displayImages(url, alt) {
    fetch(url)
    .then((resp) => {
        if(!resp.ok){
            throw new Error(resp.status);
        }
        return resp.blob();
    }).then((blob) => {
        let img = document.createElement("img");
        img.classList.add("result");
        const url = URL.createObjectURL(blob)
        img.src = url;
        img.alt = alt;

        document.querySelector("#returnHere").appendChild(img);
    }).catch(err => {
        alert(err.message);
    })
}
