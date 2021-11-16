const addMessage = document.getElementById('addMessage');
const addButton = document.getElementById('addButton');
const todo = document.getElementById('todo');

 let todoList;
 todoList = JSON.parse(localStorage.getItem('todo') ?? '[]');

 let todoListElems = [];

class NewTodo {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }
}

const createTodoItem = (newTodo, i) => {
    const checked = 'checked';
    return `
    <div class="todo-item ${newTodo.completed ? checked : ''}">
        <div class="todo-text">${newTodo.description}</div>
        <div class="buttons">
            <input onclick="completeTodoItem(${i})" type="checkbox" class="todo-complete" ${newTodo.completed ? checked : ''}>
            <button onclick="deleteTodoItem(${i})" class="todo-delete">delete</button>
        </div>
    </div>
    `;
}

const updateLocal = arr => {
    localStorage.setItem('todo', JSON.stringify(arr));
}

const filterTodoList = arr => {
    let activeTodo = arr.length > 0 && arr.filter(a => a.completed == false);
    let completedTodo = arr.length > 0 && arr.filter(a => a.completed == true);   

    return [...activeTodo,...completedTodo];
}




const completeTodoItem = i => {
    todoList[i].completed = !todoList[i].completed;

    updateLocal(todoList);
    console.log(todoList);
    fillHtmlList(todoList, todo);
    
}

const deleteTodoItem = i => {
    todoList.splice(i, 1);

    updateLocal(todoList);
    fillHtmlList(todoList, todo);
}

const fillHtmlList = (arr, elem) => {
    elem.innerHTML = '';
    if (arr.length > 0) {
        arr = filterTodoList(arr);
        
        arr.forEach((item, index) => {
            elem.innerHTML += createTodoItem(item, index);
        });
        todoListElems = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList(todoList, todo);

addButton.addEventListener('click', function() {
    if (!addMessage.value) return false;

    todoList.push(new NewTodo(addMessage.value));
    updateLocal(todoList);
    fillHtmlList(todoList, todo);

    addMessage.value = '';
    console.log(todoList);
})