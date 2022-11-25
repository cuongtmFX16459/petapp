'use strict';
// import để sử dụng class
import Infor from '../models/User.js';
// import để lưu dữ liệu
import addLocal from './storage.js';
// export các trường thông tin
export { firstname, lastname, username, password, btn };
let form = document.querySelector('form');
let firstname = document.getElementById('input-firstname');
let lastname = document.getElementById('input-lastname');
let username = document.getElementById('input-username');
let password = document.getElementById('input-password');
let password2 = document.getElementById('input-password-confirm');
let btn = document.getElementById('btn-submit');
// hàm hiển thị lỗi
export function showError(message) {
  alert(message);
}
// check thông tin
export function checkRequired(inputArr) {
  let required = inputArr.some(function (infor) {
    return infor.value === '';
  });
  if (required) {
    showError('Vui Lòng Điền Đầy Đủ Thông Tin');
  }
  return required;
}
// check độ dài password
function checkLength(input, min) {
  if (input.value.length < min) {
    showError(`Mật khẩu lớn hơn ${min} kí tự`);
    return true;
  }
  return false;
}

// check khớp mật khẩu
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError('Mật Khẩu không khớp');
    return true;
  }
  return false;
}
// lưu dữ liệu khi nhấn submit
btn.addEventListener('click', function (e) {
  e.preventDefault();
  if (!checkRequired([firstname, lastname, password, password2, username])) {
    if (!checkLength(password, 8)) {
      if (!checkPasswordsMatch(password, password2)) {
        addLocal();
      }
    }
  }
});
