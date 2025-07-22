
const container = document.getElementById("sticky-notes-container");
const addStickyBtn = document.getElementById("add-sticky-btn");
let stickyCount = 0; // Counter of sticky notes created
const MAX_STICKIES = 10; // max limit

let activeSticky = null; // the sticky note that is active only

function setActiveSticky(sticky) {
  if (activeSticky && activeSticky !== sticky) {
    // hide the form of the previous sticky note
    const prevForm = activeSticky.querySelector("form");
    if (prevForm) prevForm.style.display = "none";
  }

  //  show form of the actual sticky (only if have a fixed title)
  const currentForm = sticky.querySelector("form");
  const titleFixed = sticky.querySelector(".sticky-title-fixed");
  
  if (currentForm && titleFixed) {
    currentForm.style.display = "block";
  } else if (currentForm) {
    // if there is not fixed title, hide the form
  }

  // update active sticky 
  activeSticky = sticky;
}

function createStickyNote() {
  if (stickyCount >= MAX_STICKIES) {
    alert("You can only create up to 10 sticky notes!");
    return;
  }

  stickyCount++; //  Increments the counter when add new note

  // create the div container for the sticky notes
  const sticky = document.createElement("div");
  sticky.classList.add("sticky-note", "color-1");

  // title for sticky note
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Enter title...";
  titleInput.classList.add("sticky-title");

  // button to add title to the sticky note
  const titleBtn = document.createElement("button");
  titleBtn.textContent = "Add Title";
  titleBtn.classList.add("title-btn");

  // when push button, the title is h3 fixed
  titleBtn.addEventListener("click", () => {
    if (titleInput.value.trim() !== "") {
      const title = document.createElement("h3");
      title.textContent = titleInput.value;
      title.classList.add("sticky-title-fixed");

      // double click to edit title
      title.addEventListener("dblclick", () => {
        sticky.replaceChild(titleInput, title);
        sticky.insertBefore(titleBtn, titleInput.nextSibling);
        titleInput.value = title.textContent;
        titleInput.focus()

         // hide form until confirm the new title 
        form.style.display = "none";
      });

      // replace input for title and hide button 
      sticky.replaceChild(title, titleInput);
      titleBtn.remove();

      // show task form 
      form.style.display = "block";

      // activate this sticky note 
      setActiveSticky(sticky);
    }
  });

  // create form
  const form = document.createElement("form");
  form.style.display = "none"; // hide by defect

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Write a task";
  input.required = true;

  // create button "add"
  const addButton = document.createElement("button");
  addButton.textContent = "Add";

  // put input and add button inside the form
  form.appendChild(input);
  form.appendChild(addButton);

  // create the list of task
  const ul = document.createElement("ul");

  // event to add the task in the sticky note
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = input.value.trim(); // gets the input text and removes spaces at the beginning and end
    if (!taskText) return;               // if the input is empty, do nothing
            
    // create an item list
    const li = document.createElement("li");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // task text
    const span = document.createElement("span");
    span.textContent = taskText;

    // event to check task completed
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        span.classList.add("completed");
      } else {
        span.classList.remove("completed");
      }
    });

    // button to delete task
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = () => li.remove();

    
    ul.appendChild(li); // add item list inside the list task
    li.appendChild(checkbox); // add checkbox inside the item list
    li.appendChild(span); // add span inside the item list
    li.appendChild(deleteBtn); // add delete button inside the item list 

    input.value = "";  // clean the input value
  });

  // add button to delete complete sticky note
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "x";
  closeBtn.classList.add("delete-sticky");
  closeBtn.onclick = () => {
    sticky.remove();
    stickyCount--; // reduce the counter when a sticky note is deleted
  };

  sticky.appendChild(titleInput);  // add title input inside the sticky note
  sticky.appendChild(titleBtn);    // add title button inside the sticky note
  sticky.appendChild(form);       // add form inside the sticky note
  sticky.appendChild(ul);         // add ul inside the sticky note  
  sticky.appendChild(closeBtn);    // add close button inside the sticky note

  // to only activate it if click outside of the inputs or buttons
 sticky.addEventListener("click", (e) => {
    if (e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON" && !e.target.classList.contains("color-btn")) {
      setActiveSticky(sticky);
    }
  });

  // add all inside the principal container
  container.appendChild(sticky);
  setActiveSticky(sticky); // makes sticky active

}

//  global color selector
const colorButtons = document.querySelectorAll("#color-selector .color-btn");
colorButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (activeSticky) {
      activeSticky.classList.remove("color-1", "color-2", "color-3", "color-4", "color-5");
      const selectedClass = btn.dataset.color;
      activeSticky.classList.add(selectedClass);
    } else {
      alert("Select a sticky note first!");
    }
  });
});

// when user click creates a new sticky note
addStickyBtn.addEventListener("click", createStickyNote);

