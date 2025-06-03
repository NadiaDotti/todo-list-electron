document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('itemInput');
  const addButton = document.getElementById('addItem');

  const today = new Date();
  const formattedDate = today.toLocaleDateString('it-IT');
  document.getElementById('currentDate').textContent = formattedDate;

  renderTodos();

  addButton.addEventListener('click', () => {
    const value = input.value.trim();
    if (value !== '') {
      const todos = JSON.parse(localStorage.getItem('todos')) || {};
      todos[value] = false;
      localStorage.setItem('todos', JSON.stringify(todos));
      input.value = '';
      renderTodos();
    }
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addButton.click();
    }
  });

  document.getElementById('homePage').addEventListener('click', () => {
    window.electronAPI.loadPage('index.html');
  });
});

function renderTodos() {
  const list = document.querySelector('ul');
  list.innerHTML = '';

  const todos = JSON.parse(localStorage.getItem('todos')) || {};

  Object.keys(todos).forEach(function(key) {
    const li = document.createElement('li');
    li.className = `p-4 rounded-lg flex items-center justify-between ${
      todos[key] ? 'bg-white/10' : 'bg-white/20'
    }`;

    const leftSide = document.createElement('div');
    leftSide.className = 'flex items-center gap-2';

    const inputCheck = document.createElement('input');
    inputCheck.className = 'checkbox checkbox-accent';
    inputCheck.type = 'checkbox';
    inputCheck.checked = todos[key];
    inputCheck.addEventListener('click', () => {
      checkTodo(key);
    });

    const span = document.createElement('span');
    span.textContent = key;
    span.className = `ml-2 ${todos[key] ? 'line-through opacity-50' : ''}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-circle btn-secondary ml-4 flex items-center justify-center rounded-full';
    deleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>`;
    deleteBtn.addEventListener('click', () => {
      deleteTodo(key);
    });

    leftSide.appendChild(inputCheck);
    leftSide.appendChild(span);
    li.appendChild(leftSide);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function deleteTodo(todo) {
  const todos = JSON.parse(localStorage.getItem('todos')) || {};
  delete todos[todo];
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

function checkTodo(todo) {
  const todos = JSON.parse(localStorage.getItem('todos')) || {};
  todos[todo] = !todos[todo];
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}
