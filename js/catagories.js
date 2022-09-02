const getCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((catalog) => allCatagories(catalog.data.news_category));
};
const allCatagories = (data) => {
  const categoriesContainer = document.getElementById("catagories-container");
  for (const catagories of data) {
    const newsButton = document.createElement("div");
    newsButton.classList = "col-lg-1 col-sm-12 m-auto";
    newsButton.innerHTML = `
    <span>${catagories.category_name}</span>
    `;
    newsButton.classList.add("newslink");
    categoriesContainer.appendChild(newsButton);
  }
};
getCatagories();
