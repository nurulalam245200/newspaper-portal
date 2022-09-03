/*------------------------------
      JSON API Start 
----------------------------*/

/*Catagories data load function */
const getCatagories = () => {
  try {
    fetch("https://openapi.programming-hero.com/api/news/categories")
      .then((res) => res.json())
      .then((catalog) => allCatagories(catalog.data.news_category));
  } catch (error) {
    console.log(error);
  }
};
/*Catagories load function and add a catagory button*/
const allCatagories = (data) => {
  const categoriesContainer = document.getElementById("catagories-container");
  for (const catagories of data) {
    const newsButton = document.createElement("div");
    newsButton.innerHTML = `
    <button class="btn btn-outline-primary" onclick="getLoadALLNews('${catagories.category_id}')">${catagories.category_name}</button>
    `;

    categoriesContainer.appendChild(newsButton);
  }
};

/* ALl NewsShow data load function */

const getLoadALLNews = async (newsId) => {
  loading(true);
  try {
    const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;
    const res = await fetch(url);
    const newses = await res.json();
    loadAllNews(newses.data);
  } catch (error) {
    console.log(error);
  }
};
/* Data load from fetch and card Add function */
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
    /* card innerHtml start*/
    newsDiv.innerHTML = `
    <div onclick="getLoadDetails('${
      recentNews._id
    }')" data-bs-toggle="modal" data-bs-target="#newDetailsModal"
     class="row g-5">
    <div class="col-md-4">
      <img src="${
        recentNews.image_url
      }" class="img-fluid rounded-2" alt="news-pic">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${recentNews.title}</h5>
        <p class="card-text">${recentNews.details.slice(0, 200)}...</p>
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

    /* card innerHtml end*/
  });
  /*spinner Load function */
  loading(false);
};

/*New Details Data load Function */
const getLoadDetails = async (newsId) => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/${newsId} `;
    const res = await fetch(url);
    const newses = await res.json();
    showDetails(newses.data[0]);
  } catch (error) {
    console.log(error);
  }
};

/*New Details Data load Function from fetch and create Modal */
const showDetails = (data) => {
  const divMOdal = document.getElementById("staticBackdropLabel");
  divMOdal.innerText = data.title;
  const divDetails = document.getElementById("newsDetails");
  /*modal innerHTML start */
  divDetails.innerHTML = `
  <p>Repoter Name:${
    data.author.name ? data.author.name : "No Reporter found"
  }</p>
  <img class="img-fluid"src="${data.image_url}" alt="news-pic">
  <p>Reporter Name: ${data.author.published_date}</p>
  <p>Viral: ${data.rating.badge} , ${data.rating.number}</p>
  <p>Total View:${data.total_view ? data.total_view : "No Views Found"}</p>
  <p>${data.details.slice(0, 350)}...</p>

  `;
  /*modal innerHTML start */
};

/* spinner load function */
const loading = (isLoad) => {
  const spinContainer = document.getElementById("spin");
  if (isLoad) {
    spinContainer.classList.remove("d-none");
  } else {
    spinContainer.classList.add("d-none");
  }
};

/*All news catagory call here*/
getCatagories();
