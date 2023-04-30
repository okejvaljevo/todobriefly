window.addEventListener('load', () => {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  const newTodoForm = document.querySelector('#new-todo-form');

  newTodoForm.addEventListener('submit', e => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime()
    }

    if (!todo.content) {
      alert("Please fill out the todo");
      return;
    }

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));

    e.target.reset();

    DisplayTodos();

  })

  DisplayTodos();
})

function DisplayTodos() {
  const todoList = document.querySelector('#todo-list');
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const labelElement = document.createElement('label');
    const inputElement = document.createElement('input');
    const spanElement = document.createElement('span');
    const contentDiv = document.createElement('div');
    const actionsDiv = document.createElement('div');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    inputElement.type = 'checkbox';
    inputElement.checked = todo.done;

    spanElement.classList.add('bubble');
    if (todo.category == 'personal') {
      spanElement.classList.add('personal');
    } else {
      spanElement.classList.add('business');
    }

    contentDiv.classList.add('todo-content');
    actionsDiv.classList.add('actions');
    editBtn.classList.add('edit');
    deleteBtn.classList.add('delete');

    contentDiv.innerHTML = `<input type="text" value="${todo.content}" readonly>`;

    editBtn.innerHTML = 'Edit';
    deleteBtn.innerHTML = 'Delete';

    labelElement.appendChild(inputElement);
    labelElement.appendChild(spanElement);

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    todoItem.appendChild(labelElement);
    todoItem.appendChild(contentDiv);
    todoItem.appendChild(actionsDiv);

    todoList.appendChild(todoItem);

    if(todo.done) {
      todoItem.classList.add('done');
      spanElement.classList.add('solved');
    }

    inputElement.addEventListener('click', e => {
      todo.done = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));
      if(todo.done) {
        todoItem.classList.add('done');
      } else {
        todoItem.classList.remove('done');
      }

      DisplayTodos();
    })
    // EDIT TODO
    editBtn.addEventListener('click', e => {
      const input = contentDiv.querySelector("input");
      if (editBtn.innerText.toLowerCase() == "edit" && !(todo.done)) {
        input.removeAttribute("readonly");
        const end = input.value.length;
        input.setSelectionRange(end, end);
        input.focus();
        editBtn.innerText = "Save";
      }
      
      input.addEventListener('blur', e => {
        input.setAttribute('readonly', 'true');
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();
      })
    })
    // DELETE TODO
    deleteBtn.addEventListener('click', e => {
      var result = confirm("Are you sure?");
      if (result) {
        todos = todos.filter(t => t != todo);
        localStorage.setItem('todos', JSON.stringify(todos));
          DisplayTodos();
      }
    })
  })
}


































































