// load category button
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.categories))
    .catch((err) => console.log(err));
};

// show the all
const showCategories = (categories) => {
  const catergory = document.getElementById("category-id");
  categories.forEach((element) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerHTML = element.category;
    catergory.appendChild(button);
  });
};
// --------------------------------------------------------

// load video
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => showVideos(data.videos))
    .catch((err) => console.log(err));
};

const showVideos = (videos) => {
  const videoId = document.getElementById("video");
  videos.forEach((video) => {
    console.log(video);
    const videoContainer = document.createElement("div");
    videoContainer.innerHTML = `
    
     <figure>
    <img
      src=${video.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
    `;
    videoId.appendChild(videoContainer)
  });
};

loadCategories();
loadVideos();

