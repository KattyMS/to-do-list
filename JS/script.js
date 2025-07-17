
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

form.addEventListener("submit", (e) => {
    e.preventDefault();  // prevents page reloading

    const taskText = input.value.trim();  // gets the input text and removes spaces at the beginning and end
    if(!taskText) return; // if the input is empty, do nothing

    const li = document.createElement("li"); // create a new <li> element for the task

    const checkbox = document.createElement("input"); // create a checkbox before the task
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = taskText; // put the text of the task

    // event to cross out the text when the checkbox is checked
    checkbox.addEventListener("change", () => {
        if(checkbox.checked) {
            span.classList.add("completed");
        }
        else {
            span.classList.remove("completed");
        }
    });

    const deleteBtn = document.createElement("button"); // create a "X" button to delete the task
    deleteBtn.textContent = "X"; 

    deleteBtn.onclick = () => li.remove(); // add event to the "X" button so it deletes the task when clicked

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn); // put the button inside the <li>

    list.appendChild(li); // add the complete <li> inside the <ul> list

    input.value = ""; // clear the input so the user can write another task

});




