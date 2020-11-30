let todos = [];  // Array storing each list item

/*** SELECTORS ***/
const btnSubmit = document.querySelector(".submit-btn");
const btnSave = document.querySelector(".save-btn");
const btnClear = document.querySelector(".clear-btn");
const input = document.querySelector(".input-bar");
const list = document.querySelector(".list");
const ul = document.querySelector("ul");



/*** EVENT LISTENERS ***/
// On page load, clears input field
window.onload = () => input.value = "";

// Runs printTodo function if input field is populated and "add" button is clicked or enter key is pressed
btnSubmit.addEventListener("click", function(){
    if (input.value){
        printTodo(input.value);
    }
});
document.addEventListener("keyup", function(e){
    if (e.key === "Enter"){
        if (input.value){
            printTodo(input.value);
        }
    }
});

list.addEventListener("click", function(element){
    // If the garbage button is clicked, deleteTodo function is called. If not and todos array is populated, completeTodo function is called.
    if (element.target.classList.contains("delete")){
        deleteTodo(element);
    } else if (element.target.classList.contains("todo") || element.target.classList.contains("todo-text")){
        completeTodo(element);
    }
});



// Clear button
btnClear.addEventListener("click", clearList);



/*** FUNCTIONS ***/
function printTodo(todo){
    // Adds input to "todos" array
    if (input.value){
        todos.push(input.value);
    }

    // Prints todo to list
    ul.insertAdjacentHTML("beforeend", `<li class="todo"><p class="todo-text">${todo}<span><button class="delete delete-btn"><img src="images/icon-delete.svg" class="delete delete-icon" alt="Delete icon"></button></span></p></li>`);

    // Clears input field
    input.value = "";

    // Sets cursor back to input field
    input.focus();
}

function deleteTodo(element){
    let todo = element.target.closest(".todo");

    // Deletes todo from array
    todos.splice(todos.indexOf(todo.innerText),1);

    // Deletes todo from list
    todo.remove();
}

function completeTodo(element){
    let todo = element.target.closest("li");

    // Toggles "complete" class, adding/removing grey text and line through text
    todo.classList.toggle("complete");
}

function clearList(){
    // Deletes all todos from array
    todos.splice(0, todos.length);

    // Deletes all todos from screen
    ul.innerHTML = "";

    // Clear input field
    input.value = "";
}



/*** TIME AND DATE ***/
function updateTime() {
    let date = new Date();
    let dateS = date.toDateString();
    let time = date.toLocaleTimeString();
    
    document.querySelector(".date").innerHTML = dateS;
    document.querySelector(".time").innerHTML = time;

    setTimeout(updateTime, 500);
};

updateTime();
