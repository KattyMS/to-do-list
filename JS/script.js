const container = document.getElementById("sticky-notes-container");
const addStickyBtn = document.getElementById("add-sticky-btn");
let stickyCount = 0;
const MAX_STICKIES = 10;

let activeSticky = null;
let activeTask = null;

//  Activate sticky and show its form
function setActiveSticky(sticky) {
  if (activeSticky && activeSticky !== sticky) {
    const prevForm = activeSticky.querySelector("form");
    if (prevForm) prevForm.style.display = "none";
  }

  const currentForm = sticky.querySelector("form");
  const titleFixed = sticky.querySelector(".sticky-title-fixed");

  if (currentForm && titleFixed) {
    currentForm.style.display = "block";
  }

  activeSticky = sticky;
}

//  Create sticky note
function createStickyNote() {
  if (stickyCount >= MAX_STICKIES) {
    alert("You can only create up to 10 sticky notes!");
    return;
  }

  stickyCount++;

  const sticky = document.createElement("div");
  sticky.classList.add("sticky-note", "color-1");

  // Container for input and button
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");

  // title input
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Enter title...";
  titleInput.classList.add("sticky-title");

  // title button
  const titleBtn = document.createElement("button");
  titleBtn.textContent = "Add Title";
  titleBtn.classList.add("title-btn");

  // Append input and button into container
  titleContainer.appendChild(titleInput);
  titleContainer.appendChild(titleBtn);

  titleBtn.addEventListener("click", () => {
    if (titleInput.value.trim() !== "") {
      const title = document.createElement("h3");
      title.textContent = titleInput.value;
      title.classList.add("sticky-title-fixed");

      // Replace the entire container with the title
      sticky.replaceChild(title, titleContainer);

      // Show the form now that title is set
      form.style.display = "block";

      // Set this sticky as active
      setActiveSticky(sticky);

      // Enable editing by double-click
      title.addEventListener("dblclick", () => {
        // Restore input and button
        titleInput.value = title.textContent;
        sticky.insertBefore(titleContainer, form);
        sticky.removeChild(title);
        form.style.display = "none";
      });
    }
  });

  // Form for tasks
  const form = document.createElement("form");
  form.style.display = "none";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Write a task";
  input.required = true;
  input.classList.add("task-input");

  const addButton = document.createElement("button");
  addButton.textContent = "Add";
  addButton.classList.add("task-btn");

  form.appendChild(input);
  form.appendChild(addButton);

  const ul = document.createElement("ul");

  // Add tasks
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = input.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.style.display = "none";

    // Show delete when task is active
    li.addEventListener("click", (e) => {
      e.stopPropagation();

      if (activeTask && activeTask !== li) {
        const prevDeleteBtn = activeTask.querySelector("button");
        if (prevDeleteBtn) prevDeleteBtn.style.display = "none";
      }

      deleteBtn.style.display = "inline-block";
      activeTask = li;
    });

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();
      activeTask = null;
    });

    checkbox.addEventListener("change", () => {
      span.classList.toggle("completed", checkbox.checked);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
    input.value = "";
  });

  // Close sticky
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "x";
  closeBtn.classList.add("delete-sticky");
  closeBtn.onclick = () => {
    sticky.remove();
    stickyCount--;
    if (activeSticky === sticky) activeSticky = null; // reset if deleted
  };

  sticky.appendChild(titleContainer); // instead of appending input and button separately
  sticky.appendChild(form);
  sticky.appendChild(ul);
  sticky.appendChild(closeBtn);

  sticky.addEventListener("click", (e) => {
    if (
      e.target.tagName !== "INPUT" &&
      e.target.tagName !== "BUTTON" &&
      !e.target.classList.contains("color-btn")
    ) {
      setActiveSticky(sticky);
    }
  });

  container.appendChild(sticky);

  //  Keep it active immediately so color can change without extra click
  activeSticky = sticky;
}

// Color selector fix
const colorButtons = document.querySelectorAll("#color-selector .color-btn");
colorButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // Stop bubbling
    if (activeSticky) {
      activeSticky.classList.remove(
        "color-1",
        "color-2",
        "color-3",
        "color-4",
        "color-5",
        "color-6",
        "color-7"
      );
      activeSticky.classList.add(btn.dataset.color);
    } else {
      alert("Select or create a sticky note first!");
    }
  });
});

//  Global click: hide delete buttons & hide form
document.addEventListener("click", (e) => {
  // Hide delete button
  if (activeTask) {
    const deleteBtn = activeTask.querySelector("button");
    if (deleteBtn) deleteBtn.style.display = "none";
    activeTask = null;
  }

  // Hide form only if click is outside sticky AND color selector
  if (
    activeSticky &&
    !activeSticky.contains(e.target) &&
    !e.target.closest("#color-selector") &&
    e.target.id !== "add-sticky-btn"
  ) {
    const form = activeSticky.querySelector("form");
    if (form) form.style.display = "none";
    activeSticky = null;
  }
});

addStickyBtn.addEventListener("click", createStickyNote);
