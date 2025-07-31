const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.categories))
    .catch((err) => console.log(err));
};

const showCategories = (categories) => {
  const catergory = document.getElementById("category-id");
  categories.forEach((element) => {
    console.log(element);
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerHTML = element.category;
    catergory.appendChild(button);
  });
};

loadCategories();
