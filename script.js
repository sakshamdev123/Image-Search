const apikey = "6PfAAuO0fqFVPZ2vgRkgfy7GFHL9K8Mc5bPYmc-q_E8";

const form = document.querySelector("form");
const input = document.querySelector("input");
const searchResults = document.querySelector(".results");
const showMore = document.querySelector("#more");

let inputData = "";
let page = 1;

async function searchImage(){
    inputData = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apikey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    if (page === 1) {
        searchResults.innerHTML = "";
    }
    results.map((result) =>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.HTML;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });
    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1;
    searchImage();
});

showMore.addEventListener("click", () =>{
    searchImage();
});