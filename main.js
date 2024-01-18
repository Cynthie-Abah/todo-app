// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    // Assuming task is an object representing a task in your JavaScript code
    const task = {
        title: taskInput.value,
        completed: false, // Set default value for 'completed'
        priority: 'High', // Set default value for 'priority'
        description: 'Task description', // Set default value for 'description'
        due_date: '2024-01-31', // Set default value for 'due_date'
    };

    // Check if the input is not empty
    if (task.title.trim() !== "") {
        // Create a new list item
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="top">
                <div class="title">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(this)" class='completed' />
                    <p>${task.title}</p>
                </div>
                <div class="bottom">
                    <p>due: ${task.due_date}</p>
                    <div class="buttons">
                        <button class='button' onclick="editTask(this)">Edit</button>
                        <button class='button remove-btn' onclick="removeTask(this)">Delete</button>
                    </div>
                </div>
            </div>
        `;

        // Append the list item to the task list
        taskList.appendChild(listItem);
    }

    // Clear the input field
    taskInput.value = "";
}

// Function to remove a task
function removeTask(button) {
    const taskList = document.getElementById("taskList");
    const listItem = button.closest('li'); // Use closest to find the closest parent 'li'

    // Remove the corresponding list item
    taskList.removeChild(listItem);
}

// Function to toggle task completion
function toggleComplete(checkbox) {
    const listItem = checkbox.closest('li'); // Use closest to find the closest parent 'li'
    listItem.classList.toggle("completed");
}

// Function to edit a task
function editTask(button) {
    const listItem = button.closest('li'); // Use closest to find the closest parent 'li'
    const taskText = listItem.querySelector(".title p");
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskText.innerText;

    // Replace the task text with the edit input field
    listItem.querySelector(".title").replaceChild(editInput, taskText);

    // Change the "Edit" button to "Save"
    button.innerText = "Save";

    // Add a click event listener to save and close the edit input field when the "Save" button is clicked
    button.onclick = function () {
        taskText.innerText = editInput.value;
        listItem.querySelector(".title").replaceChild(taskText, editInput);
        // Change the "Save" button back to "Edit"
        button.innerText = "Edit";
        // Add back the click event listener for editing
        button.onclick = function() {
            editTask(button);
        };
    };

    // Focus on the edit input field
    editInput.focus();
}

