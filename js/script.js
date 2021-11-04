const addMessage = document.querySelector('.message');
const addButton = document.querySelector('.add');
const todo = document.querySelector('.todo-body');

let todoList;
!localStorage.todo ? todoList = [] : todoList = JSON.parse(localStorage.getItem('todo'));

let todoListElems = [];

function NewTodo(description) {
    this.description = description;
    this.completed = false;
}

const createTodoItem = (newTodo, index) => {
    return `
    <div class="todo-item ${newTodo.completed ? 'checked' : ''}">
        <div class="todo-text">${newTodo.description}</div>
        <div class="buttons">
            <input onclick='completedTodoItem(${index})' class="todo-complete" type="checkbox" ${newTodo.completed ? 'checked' : ''}>
            <button onclick='deletedTodoItem(${index})' class="todo-delete">Delete</button>
        </div>
    </div>
    `;
}

const filterTodoList = () => {
    const activeTodoList = todoList.length && todoList.filter(item => item.completed == false);
    const completedTodoList = todoList.length && todoList.filter(item => item.completed == true);
    todoList = [...activeTodoList, ...completedTodoList];
}

const fillHtmlList = () => {
    todo.innerHTML = '';
    if (todoList.length > 0) {
        filterTodoList();
        todoList.forEach((item, index) => {
            todo.innerHTML += createTodoItem(item, index);
        });
        todoListElems = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('todo', JSON.stringify(todoList));
}

const completedTodoItem = index => {
    todoList[index].completed = !todoList[index].completed;
    if (todoList[index].completed) {
        todoListElems[index].classList.add('checked')
    } else {
        todoListElems[index].classList.remove('checked')
    }
    updateLocal();
    fillHtmlList();
}

addButton.addEventListener('click', function() {
    if (!addMessage.value) return;

    todoList.push(new NewTodo(addMessage.value));
    updateLocal();
    fillHtmlList();

    addMessage.value = '';
})

const deletedTodoItem = index => {
    todoList.splice(index, 1);
    updateLocal();
    fillHtmlList();
}