'use strict';
// import các trường thông tin
import {
  username,
  password,
  checkRequired,
  showError,
  btn,
} from './register.js';
// bắt sự kiện khi click button
btn.addEventListener('click', e => {
  e.preventDefault();
  // check thông tin đăng nhập
  if (!checkRequired([username, password])) {
    addLogin();
  }
});
let i = 0;
// tạo hàm đăng nhập
function addLogin() {
  // lấy dữ liệu từ local
  let data = localStorage.getItem('Infor')
    ? JSON.parse(localStorage.getItem('Infor'))
    : [];
  // tạo mảng để lưu thông tin đăng nhập
  let Infor = {
    username: username.value,
    password: password.value,
  };
  // check điều kiện
  let checkUser = data.some(function (user, index) {
    i = index;
    return user.username === Infor.username && user.password === Infor.password;
  });
  // check đúng thì chuyển trang lưu dữ liệu đăng nhập vào mảng.
  if (checkUser) {
    window.location.href = '../index.html';
    let data1 = [];
    data1.push(data[i]);
    localStorage.setItem(`InforLogin`, JSON.stringify(data1));
  }
  //sai thì hiển thị thông báo
  else {
    alert('Tên đăng nhập hoặc mật khẩu không đúng');
  }
}
