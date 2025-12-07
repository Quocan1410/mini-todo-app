const tasks = [];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todo-input");

function isDuplicateTask(newTitle, excludeIndex = -1) {
    const isDuplicate = tasks.some((task, index) => task.title.toLowerCase() === newTitle.toLowerCase() && index !== excludeIndex);
    return isDuplicate;
}

function handleTaskActions(e) {
    const taskItem = e.target.closest(".task-item");
    const taskIndex = +taskItem.getAttribute("task-index");
    const task = tasks[taskIndex];

    if (e.target.closest(".edit")) {
        let newTitle = prompt("Enter the new task title:", task.title);

        if (newTitle === null) return;

        newTitle = newTitle.trim();

        if (!newTitle) {
            alert("Task title cannot be empty!");
            return;
        }

        // const isDuplicate = tasks.some((task, index) => task.title.toLowerCase() === newTitle.toLowerCase() && index !== taskIndex);

        if (isDuplicateTask(newTitle, taskIndex)) {
            alert("This task already exists!");
            return;
        }

        task.title = newTitle;
        renderTasks();
        return;
    }

    if (e.target.closest(".done")) {
        task.completed = !task.completed;
        renderTasks();
        return;
    }

    if (e.target.closest(".delete")) {
        if (confirm(`Are you sure you want to delete this "${task.title}"?`)) {
            tasks.splice(taskIndex, 1);
            renderTasks();
        }
    }
}

// No tasks available

function addTask(e) {
    e.preventDefault();

    const value = todoInput.value.trim();

    if (!value) return alert("Please enter a task!");

    // const isDuplicate = tasks.some((task) => task.title.toLowerCase() === value.toLowerCase());

    if (isDuplicateTask(value)) {
        alert("This task already exists!");
        return;
    }

    tasks.push({
        title: value,
        completed: false,
    });

    renderTasks();

    todoInput.value = "";
}

function renderTasks() {
    if (!tasks.length) {
        taskList.innerHTML = `<li class="empty-message">No tasks available.</li>`;
        return;
    }

    const html = tasks
        .map(
            (task, index) => `
    <li class="task-item ${task.completed ? "completed" : ""}" task-index="${index}">
        <span class="task-title">${task.title}</span>
        <div class="task-action">
            <button class="task-btn edit">Edit</button>
            <button class="task-btn done">${task.completed ? "Mark as undone" : "Mark as done"}</button>
            <button class="task-btn delete">Delete</button>
        </div>
    </li> 
    `
        )
        .join("");

    taskList.innerHTML = html;
}

renderTasks();

todoForm.addEventListener("submit", addTask);
taskList.addEventListener("click", handleTaskActions);
