// Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add event Task
  form.addEventListener("submit", addTask);

  // Remove event Task
  taskList.addEventListener("click", removeTask);

  // Clear all event Tasks
  clearBtn.addEventListener("click", clearTask);

  // Filter all event Tasks
  filter.addEventListener("keyup", filterTask);
}

/////////////////////////////////////////////////////////////////////////
// Get Tasks
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks")); // We need to convert string to JSON format
  }

  tasks.forEach((task) => {
    // Create li element
    const li = document.createElement("li");
    // Add class to li
    li.className = "collection-item";
    // Create text node to append to li
    li.appendChild(document.createTextNode(task));
    // li.innerHTML = taskInput.value;

    // Create new link element
    const link = document.createElement("a");
    // Add class to link
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

/////////////////////////////////////////////////////////////////////////
// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a task");
  }

  // Create li element
  const li = document.createElement("li");

  // Add class to li
  li.className = "collection-item";

  // Create text node to append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // li.innerHTML = taskInput.value;

  // Create new link element
  const link = document.createElement("a");

  // Add class to link
  link.className = "delete-item secondary-content";

  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear the input
  taskInput.value = "";

  // Prevent the default event
  e.preventDefault();
}

/////////////////////////////////////////////////////////////////////////
// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks")); // We need to convert string to JSON format
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks)); // In local storage data must be stored in string format
}

/////////////////////////////////////////////////////////////////////////
// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove Task from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

/////////////////////////////////////////////////////////////////////////
// Remove task from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem("tasks")); // We need to convert string to JSON format
      }

      tasks.forEach((task, index) => {
          if(taskItem.textContent === task) {
            tasks.splice(index, 1);
          }
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));
}

/////////////////////////////////////////////////////////////////////////
// Clear all Tasks
function clearTask() {
  // taskList.innerHTML = '';

  // Faster way of doing this
  // while(taskList.firstChild) {
  //     taskList.firstChild.remove();
  // }

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear all Tasks from Local Storage
  clearTasksFromLocalStorage();
}

/////////////////////////////////////////////////////////////////////////
// Clear all Tasks from Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

/////////////////////////////////////////////////////////////////////////
// Filter Task
function filterTask(e) {
  const text = e.target.value.toLowerCase(); // Entered text in filter input field

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
