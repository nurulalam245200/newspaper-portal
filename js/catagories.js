const getCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((catalog) => allCatagories(catalog.data.news_category));
};
const allCatagories = (data) => {
  const categoriesContainer = document.getElementById("catagories-container");
  for (const catagories of data) {
    const newsButton = document.createElement("div");
    // newsButton.classList = "d-flexcol-lg-1 col-sm-12 m-auto";
    newsButton.innerHTML = `
    <button class="btn btn-outline-primary" onclick="getLoadALLNews('${catagories.category_id}')">${catagories.category_name}</button>
    `;

    categoriesContainer.appendChild(newsButton);
  }
};

/*all news function*/

const getLoadALLNews = async (newsId) => {
  loading(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;
  const res = await fetch(url);
  const newses = await res.json();
  loadAllNews(newses.data);
};

const loadAllNews = (news) => {
  const newsContainerDiv = document.getElementById("newsContainer");
  newsContainerDiv.textContent = ``;
  news.sort(function (a, b) {
    return b.total_view - a.total_view;
  });
  document.getElementById("found-news").innerText = `${news.length}`;
  news.forEach((recentNews) => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("row");

    newsDiv.innerHTML = `
    <div onclick="getLoadDetails('${
      recentNews._id
    }')" data-bs-toggle="modal" data-bs-target="#newDetailsModal"
     class="row g-5">
    <div class="col-md-4">
      <img src="${
        recentNews.image_url
      }" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${recentNews.title}</h5>
        <p class="card-text">${recentNews.details.slice(0, 200)}...</p>
        <p class="card-text"><small class="text-muted"></small></p>
        <div class="d-flex">
        <img  style="width: 50px; height: 50px; border-radius:50%;" src="${
          recentNews.author.img
        }">
        <p class="card-text px-2"><small class="text-muted">${
          recentNews.author.name ? recentNews.author.name : "No data available"
        }</small> <small
                class="text-muted px-5">${
                  recentNews.total_view
                    ? recentNews.total_view + "M"
                    : "No data available"
                }</small> </p>
                <i class="fa-solid fa-star-half-stroke"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <p class=text-muted fs-4 fw-bold>${recentNews.rating.number}</p>
                <i onclick=getLoadDetails('${
                  recentNews._id
                }') class="fa-solid fa-arrow-right text-primary px-5"data-bs-toggle="modal" data-bs-target="#newDetailsModal"></i>
               
        </div>
      </div>
    </div>
  </div>
    `;
    newsContainerDiv.appendChild(newsDiv);
  });
  loading(false);
};
const getLoadDetails = async (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId} `;
  const res = await fetch(url);
  const newses = await res.json();
  showDetails(newses.data[0]);
};
const showDetails = (data) => {
  const divMOdal = document.getElementById("staticBackdropLabel");
  divMOdal.innerText = data.title;
  const divDetails = document.getElementById("newsDetails");
  divDetails.innerHTML = `
  <p>Repoter Name:${
    data.author.name ? data.author.name : "No Reporter found"
  }</p>
  <p>Total View:${data.total_view ? data.total_view : "No Views Found"}</p>
  <p>${data.details.slice(0, 150)}</p>

  `;
};
const allNews = async (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;
  const res = await fetch(url);
  const newses = await res.json();
  console.log(newses.data);
};
const loading = (isLoad) => {
  const spinContainer = document.getElementById("spin");
  if (isLoad) {
    spinContainer.classList.remove("d-none");
  } else {
    spinContainer.classList.add("d-none");
  }
};
const all = allNews("08");
getCatagories(all);
