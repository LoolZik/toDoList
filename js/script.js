const addMessage = document.getElementById('addMessage');
const addButton = document.getElementById('addButton');
const todo = document.getElementById('todo');


let todoList;
todoList = JSON.parse(localStorage.getItem('todo') ?? '[]');
class NewTodo {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }
}

const createTodoItem = (newTodo, i) => {
    const checked = 'checked';
    return `
    <div data-info="${i}" class="todo-item ${newTodo.completed ? checked : ''}">
        <div class="todo-text">${newTodo.description}</div>
        <div class="buttons">
            <input data-revorce="complete" type="checkbox" class="complete" ${newTodo.completed ? checked : ''}>
            <button data-revorce="deleted"  class="deleted">delete</button>
        </div>
    </div>
    `;
}

const filterTodo = arr => {
    const activArr = arr.length > 0 && arr.filter(item => item.completed === false);
    const completedArr = arr.length > 0 && arr.filter(item => item.completed === true);
    return [...activArr, ...completedArr];
}

const updateLocal = arr => {
    localStorage.setItem('todo', JSON.stringify(arr));
}

const fillHtmlList = (arr, elem) => {
    elem.innerHTML = '';
    if (arr.length > 0) {
        arr.forEach((item, index) => {
            elem.innerHTML += createTodoItem(item, index);
        });   
    }
}

function pushMessage() {
    if (!addMessage.value) return false;

    todoList.push(new NewTodo(addMessage.value));
    updateLocal(todoList);
    fillHtmlList(todoList, todo);

    addMessage.value = '';
    addMessage.focus();
}


fillHtmlList(todoList, todo);

addMessage.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        pushMessage();
    }
})

addButton.addEventListener('click', function(e) {
    pushMessage();
})

todo.addEventListener('click', function(event) {
    let parentNode = event.target.parentElement.parentElement;
    let target = event.target.dataset.revorce;
    let num = parentNode.dataset.info;

    if (target == "complete") {
        
        todoList[num].completed = !todoList[num].completed;
        todoList = filterTodo(todoList);
        updateLocal(todoList);
        fillHtmlList(todoList, todo); 
    }
    
    if (target == "deleted") {
        todoList.splice(num, 1);
        updateLocal(todoList);
        fillHtmlList(todoList, todo);  
    }
})