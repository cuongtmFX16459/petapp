'use strict';
// khai báo
let modal = document.getElementById('login-modal');
let dataLogin = [];
let btnLogout = document.getElementById('btn-logout');
// check xem có user login không
if (localStorage.getItem('InforLogin')) {
  dataLogin = JSON.parse(localStorage.getItem('InforLogin'));
  home();
}
// có thì hiển thị modal, và message welcome user
function home() {
  modal.style.display = 'none';
  document.getElementById('main-content').style.display = 'block';
  document.getElementById(
    'welcome-message'
  ).innerHTML = `Welcome ${dataLogin[0].firstname}`;
}

// xử lý sự kiện logout
btnLogout.addEventListener('click', e => {
  e.preventDefault();
  localStorage.removeItem('InforLogin');
  document.getElementById('main-content').style.display = 'none';
  modal.style.display = 'block';
});
