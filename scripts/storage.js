'use strict';
// import dữ liệu
import Infor from '../models/User.js';
import { firstname, lastname, username, password } from './register.js';
// tạo hàm lưu và ẽport
export default function addLocal() {
  let data = localStorage.getItem('Infor')
    ? JSON.parse(localStorage.getItem('Infor'))
    : [];
  let Infor1 = new Infor(
    firstname.value,
    lastname.value,
    username.value,
    password.value
  );
  // check user có bị trùng không
  let checkUser = data.some(function (user, index) {
    return user.username === Infor1.username;
  });
  if (checkUser) {
    alert('Trùng User xin điền user khác');
  } else {
    // không trùng thì lưu dữ liệu
    data.push(Infor1);
    window.location.href = '../pages/login.html';
  }
  localStorage.setItem('Infor', JSON.stringify(data));
}
