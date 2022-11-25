'use strict';
// khai báo
let btnPrev = document.getElementById('btn-prev');
let pagenum = document.getElementById('page-num');
let btnNext = document.getElementById('btn-next');
// ẩn nút preview
btnPrev.style.display = 'none';
// lấy api
fetch(
  `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b1d49a89f9a6451dabcaad79267f4ca4`
)
  .then(function (response) {
    // để response là 1 promise gọi json()
    return response.json();
  })
  .then(function (posts) {
    //phân trang
    let totalPage = Math.ceil(posts.articles.length / 5);
    renderNews(posts);
    // xử lý sự kiện next
    btnNext.addEventListener('click', () => {
      btnPrev.style.display = 'block';
      currentPage++;
      if (currentPage >= totalPage) {
        currentPage = totalPage;
        btnNext.style.display = 'none';
      }
      pagenum.innerHTML = currentPage;
      start = (currentPage - 1) * perPage;
      end = currentPage * perPage;
      renderNews(posts);
    });
    // xử lý sự kiện preview
    btnPrev.addEventListener('click', () => {
      btnNext.style.display = 'block';
      currentPage--;
      if (currentPage <= 1) {
        currentPage = 1;
        btnPrev.style.display = 'none';
      }
      pagenum.innerHTML = currentPage;
      start = (currentPage - 1) * perPage;
      end = currentPage * perPage;
      renderNews(posts);
    });
  });
// lấy dữ liệu numberpage
let number = JSON.parse(localStorage.getItem('numberPage'));
let perPage = parseInt(number[0]);
//console.log(perPage);
// tạo các biến xử lý phân trang
let currentPage = 1;
let start = 0;
let end = perPage;

// hiển thị bài viết
function renderNews(posts) {
  let html = '';
  // lấy dữ liệu và xử lý
  let htmls = posts.articles.map(function (post, index) {
    if (index >= start && index < end) {
      html += `
           <div style = "width:1400px; height : 350px"> 
               <img src="${post.urlToImage}" style = "width:400px; hieght : 100%;float : left;margin-right : 10px">
               <h2>${post.title}</h2>
               <p>${post.content}</p>
               <a href = "${post.url}"><button type="button" class = "btn btn-primary">View</button><a>
           </div>          
         `;
      return html;
    }
  });
  document.getElementById('news-container').innerHTML = html;
}
