// load category button
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.categories))
    .catch((err) => console.log(err));
};

// load Categories
const loadCategoriesVideo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => showVideos(data.category))
    .catch((err) => console.log(err));
};

// show the all
const showCategories = (categories) => {
  const catergory = document.getElementById("category-id");
  categories.forEach((element) => {
    const button = document.createElement("div");
    button.classList = "btn";
    button.innerHTML = `
    <button onclick="loadCategoriesVideo(${element.category_id})" class="btn">
    ${element.category}
    </button>
    `;
    catergory.appendChild(button);
  });
};

// --------------------------------------------------------

// {
//     "category_id": "1001",
//     "category": "Music"
//   },

// {
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => showVideos(data.videos))
    .catch((err) => console.log(err));
};

const showVideos = (videos) => {
  const videoId = document.getElementById("video");
  videoId.innerHTML = "";

  

  videos.forEach((video) => {
    const isVerified = video.authors[0].verified === true;
    const videoContainer = document.createElement("div");
    videoContainer.innerHTML = `
     <figure class="h-[150px]">
     <img
     class="h-full w-full object-cover rounded-lg"
      src=${video.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="flex gap-2 px-2 py-3">
   <div>
   <img class="w-8 h-8 rounded-full object-cover" src=${
     video.authors[0].profile_picture
   }/></div>

   <div>
   <h1 class="font-bold">${video.title}</h1>
<div class="flex gap-2 items-center">
<p class="text-gray-400 text-sm">${video.authors[0].profile_name}</p>
   <div class="flex gap-2 items-center">
            ${
              isVerified
                ? `<img class="w-5 h-5 object-cover" src="https://img.icons8.com/puffy-filled/32/verifed.png" alt="Verified"/>`
                : ""
            }
          </div>
</div>
<p class="text-gray-400 text-sm">${video.others.views} viwes</p>
   </div>
  </div>
    `;
    videoId.appendChild(videoContainer);
  });
};

loadCategories();
loadVideos();
