const searchParam = location.search.split("=")[1];
const search_text = document.getElementById('search_text');
const access_key = "X85v9qJWtbWI53cOby9kRsWroicy0fFPZSiDxJRhW80";
const random_url_photo = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;
const search_url_photo = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`;
const gallary = document.querySelector(".gallary");
const popup = document.querySelector(".popup");
const popup_img_tag = document.getElementById('popup_img_tag');
const likes_count = document.getElementById('likes_count');
const credit = document.getElementById('credit');
const downloads_count = document.getElementById('downloads_count')
let allimg;
const getimgs = () => {
    fetch(random_url_photo)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            allimg = data;
            makeimgs(allimg);
        });
}
const searchimgs = () => {
    fetch(search_url_photo)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            allimg = data.results;
            if (allimg.length == 0) {
                search_text.innerHTML = `Not Found`;
            } else {
                makeimgs(allimg);
            }
        });
}
const makeimgs = (data) => {
    data.forEach((item, index) => {
        console.log(item);
        let img = document.createElement('img')
        img.src = item.urls.regular;
        document.querySelector(".gallary").appendChild(img);
        img.addEventListener("click", (e) => {
            popup.classList.toggle("toggle");
            popup_img_tag.src = e.target.src;
            likes_count.innerHTML = item.likes;
            credit.innerHTML = "@ " + item.user.name;
            downloads_count.parentElement.addEventListener('click', () => { window.location = item.links.html })
        });
    })
}
searchParam == '' || searchParam == undefined ? getimgs() : searchimgs();

if (location.pathname.split("/")[3].split('.')[0] && searchParam == '') {
    search_text.innerHTML = `Ramdom Images`;
} else if (location.pathname.split("/")[3].split('.')[0] && searchParam == undefined) {
    search_text.innerHTML = `Not Found`;
} else {
    search_text.innerHTML = `Search: ${searchParam}`;
}

function openMenu() {
    document.getElementById('nav-menu').classList.add("toggle");
}
function closeMenu() {
    document.getElementById('nav-menu').classList.remove("toggle");
}
function ClosePopup() {
    document.getElementById('popup').classList.toggle("toggle");
}



