const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");


const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("myTodoList"));
}

const addTodoListLocalStorage = (localTodoList) => {
    return localStorage.setItem("myTodoList", JSON.stringify(localTodoList));
}

let localTodoList = getTodoListFromLocal() || [];

const addTodoDynamicElement = (currElm) => {
    const divElement = document.createElement("div");
    divElement.classList.add("main_todo_div");
    divElement.innerHTML = ` <li>${currElm}</li> <button class = "deleteBtn">Delete</button>`;
    mainTodoElem.append(divElement);
}


const addTodoList = (e) => {
    e.preventDefault();

    const todoListValue = inputValue.value.trim();
    inputValue.value = "";

    if (todoListValue != "" && !localTodoList.includes(todoListValue)) {
        localTodoList.push(todoListValue);
        localTodoList = [...new Set(localTodoList)];
        localStorage.setItem("myTodoList", JSON.stringify(localTodoList));

        addTodoDynamicElement(todoListValue);
    }
}

const showTodoList = () => {
    localTodoList.forEach((currElm) => {
        addTodoDynamicElement(currElm);
    });
}
showTodoList();

const removeTodoElem = (e) => {
    const todoRemove = e.target;
    let todoListContent = todoRemove.previousElementSibling.innerText;
    let parentElem = todoRemove.parentElement;
    localTodoList = localTodoList.filter((curTodo) => {
        return curTodo != todoListContent.toLowerCase();
    })
    addTodoListLocalStorage(localTodoList);
    parentElem.remove();
}

mainTodoElem.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("deleteBtn")) {
        removeTodoElem(e);
    }
});

document.querySelector(".btn").addEventListener("click", (e) => {
    addTodoList(e);
});

