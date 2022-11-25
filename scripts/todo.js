import { todoLists } from '../models/User.js';
//import * as todoLists from '../models/User.js';
// khai báo
let input = document.getElementById('input-task');
let ul = document.getElementById('todo-list');
let btnAdd = document.getElementById('btn-add');
let inforLogin = JSON.parse(localStorage.getItem('InforLogin'));
// có user login lấy ra todo
if (inforLogin) {
  let todos = JSON.parse(localStorage.getItem(inforLogin[0].username));
  if (todos) {
    todos.forEach(todo => addTodo(todo));
  }
  // thêm todo
  function addTodo(todo) {
    // tạo thẻ li
    let li = document.createElement('li');
    // set class cho li
    li.setAttribute('class', todo.isDone ? 'checked' : '');
    // nối chuối hiển thị
    li.innerHTML = `
        <span>${todo.task}</span>
        <i class="close">x</i>
    `;
    // toggle 1 todo hoặc huỷ bỏ
    li.addEventListener('click', function () {
      this.classList.toggle('checked');
      updateTodos();
    });
    // xoá todo
    li.querySelector('i').addEventListener('click', e => {
      e.target.parentElement.remove();
      updateTodos();
    });
    // hiển thị todo
    ul.appendChild(li);
    updateTodos();
  }
  // xử lý sự kiện click
  btnAdd.addEventListener('click', () => {
    let task = input.value.trim();
    let todoList = new todoLists(task, 'todolist', false);
    task != '' ? addTodo(todoList) : undefined;
    input.value = '';
  });
  // lưu dữ liệu xuống local
  function updateTodos() {
    let list = document.querySelectorAll('#todo-list li');
    let todos = [];
    list.forEach(item => {
      todos.push({
        task: item.querySelector('span').innerHTML,
        owner: inforLogin[0].username,
        isDone: item.classList.contains('checked'),
      });
    });
    localStorage.setItem(inforLogin[0].username, JSON.stringify(todos));
  }
} else {
  // chưa có user login hiển thị thông báo
  btnAdd.addEventListener('click', () => {
    alert('Please Login');
    input.value = '';
  });
}
