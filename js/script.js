const addMessage = document.querySelector('.message');
const addButton = document.querySelector('.add');
const todo = document.querySelector('.todo-body');

let todoList;
!localStorage.todo ? todoList = [] : todoList = JSON.parse(localStorage.getItem('todo'));

let todoItemElems = [];

function NewTodo(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (newTodo, index) => {
    return `
    <div class="todo-item ${newTodo.completed ? 'checked' : ''}">
        <div class="todo-text">${newTodo.description}</div>
        <div class="buttons">
            <input onclick='comleteTodo(${index})' class="todo-complete" type="checkbox" ${newTodo.completed ? 'checked' : ''}>
            <button onclick='deleteTodo(${index})' class="todo-delete">Delete</button>
        </div>
    </div>
    `;
}

const filterTodoList = () => {
    const activTodoList = todoList.length && todoList.filter((item) => item.completed == false);
    const comletedTodoList = todoList.length && todoList.filter((item) => item.completed == true);
    todoList = [...activTodoList, ...comletedTodoList];
}

const filHtmlList = () => {
    todo.innerHTML = '';
    filterTodoList();
    if (todoList.length > 0) {
        todoList.forEach((item, index) => {
            todo.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');
        
    }
} 

filHtmlList();

const comleteTodo = index => {
    todoList[index].completed = !todoList[index].completed;
    if (todoList[index].completed) {
        todoItemElems[index].classList.add('checked')
    } else {
        todoItemElems[index].classList.remove('checked')
    }
    updatelocal();
    filHtmlList();
}

const updatelocal = () => {
    localStorage.setItem('todo', JSON.stringify(todoList));
}

addButton.addEventListener('click', () => {
    if (!addMessage.value) return;
    todoList.push(new NewTodo(addMessage.value));
    updatelocal();
    filHtmlList();

    addMessage.value = '';
})

const deleteTodo = index => {
    todoItemElems[index].classList.add('delition')
    setTimeout(() => {
        todoList.splice(index, 1);
    updatelocal();
    filHtmlList();
    }, 500)
}


