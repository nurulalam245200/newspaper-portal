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
    <button class="btn btn-outline-primary" onclick="getLoadALLNews('${catagories.category_id}')">${catagories.category_name}</button>
    `;

    categoriesContainer.appendChild(newsButton);
  }
};

/*all news function*/
const getLoadALLNews = async (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;
  const res = await fetch(url);
  const newses = await res.json();
  const newsIndex = newses.data;
  const newsData = [...newsIndex];
  loadAllNews(newsData);
};

const loadAllNews = (news) => {
  news.forEach((recentNews) => {
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.classList.add("col");

    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
    <div onclick="getloadNewsDetails('${recentNews._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailsModal" class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4 col-lg- col-sm-12">
          <img src="${
            recentNews.thumbnail_url
          }" class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-8 col-lg-8 col-sm-12">
        <div class="card-body">
        <h5 class="card-title">${recentNews.title}</h5>
        <p class="card-text">${recentNews.details.slice(0, 150)}...</p>
        <div class="d-flex justify-content-between align-items-center">
           <div class="d-flex justify-content-between align-items-center">
           <!-- Reporter status  -->
            <div>
            <img class="img-fluid "   style="height: 50px; width: 50px; border-radius: 50%" src="${
              recentNews.author.img
            }" alt="" />
            </div>
           <div class="ms-3">
              <h5>Reporter Name: ${recentNews.author.name}</h5>
              <p>Date:${recentNews.author.published_date}</p>
           </div>
           </div>
  <!-- view icon  -->
  <div>
    <i></i>
    <h4>${recentNews.total_view}</h4>
  </div>
  <!-- rate icon -->
  <div>
    <i></i>
  </div>
  <!-- arrow button -->
  <div>
  <button onclick="getloadNewsDetails('${recentNews._id}')" class="btn btn-primary >
  
</button>
  </div>
</div>
        </div>
       </div>
      </div>
    </div>
     

    `;
    newsContainer.appendChild(newsDiv);
  });
};
const getloadNewsDetails = (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadNewsDetails(data));
};

const loadNewsDetails = (details) => {
 const 
};
getCatagories();
getLoadALLNews();
