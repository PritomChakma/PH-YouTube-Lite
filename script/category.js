// load category button
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.categories))
    .catch((err) => console.log(err));
};

const removeActiveBtn = () => {
  const buttons = document.getElementsByClassName("btn-category");
  for (const button of buttons) {
    button.classList.remove("active");
  }
};

// load Categories
const loadCategoriesVideo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveBtn();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      showVideos(data.category);
    })
    .catch((err) => console.log(err));
};

const handleAllVideos = () => {
  removeActiveBtn();
  const allBtn = document.getElementById("btn-all");
  allBtn.classList.add("active");
  loadVideos(); // fetch all videos again
};

// show the all
const showCategories = (categories) => {
  const catergory = document.getElementById("category-id");

  // Add "All" button manually
  const allButton = document.createElement("div");
  allButton.innerHTML = `
    <button id="btn-all" onclick="handleAllVideos()" class="btn btn-category active">
      All
    </button>
  `;
  catergory.appendChild(allButton);

  // Add other category buttons
  categories.forEach((element) => {
    const button = document.createElement("div");
    button.innerHTML = `
      <button id="btn-${element.category_id}" onclick="loadCategoriesVideo(${element.category_id})" class="btn btn-category">
        ${element.category}
      </button>
    `;
    catergory.appendChild(button);
  });
};

// --------------------------------------------------------
let allVideos = [];
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      allVideos = data.videos;
      showVideos(data.videos);
    })
    .catch((err) => console.log(err));
};

const showVideos = (videos) => {
  const videoId = document.getElementById("video");
  videoId.innerHTML = "";

  if (videos.length == 0) {
    videoId.classList.remove("grid");
    videoId.innerHTML = `
 <div class="min-h-[300px] flex flex-col gap-5 items-center justify-center mx-auto text-center">
  <img src="assets/icon.png" alt="No Content Icon" class="w-25 h-25 md:w-50 md:h-50" />
  <p class="text-lg md:text-2xl font-medium text-gray-500">No content available here</p>
</div>
  `;
  } else {
    videoId.classList.add("grid");
  }

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
   <button class="btn">Details</button>
    `;
    videoId.appendChild(videoContainer);
  });
};

document.getElementById("search").addEventListener("keyup", (e) => {
  const searchText = e.target.value.toLowerCase();
  const filtered = allVideos.filter((video) =>
    video.title.toLowerCase().includes(searchText)
  );
  showVideos(filtered);
});

loadCategories();
loadVideos();
handleAllVideos();
