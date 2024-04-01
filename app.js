// app.js

const inputTask = document.getElementById('newTask');
const inputTaskList = document.getElementById('taskList');
const taskButton = document.getElementById('addTaskBtn');

// Function to add a new task
const addTask = () => {
    if (inputTask.value === '') {
        alert('Please write something!');
    } else {
        const li = document.createElement('li');
        li.textContent = inputTask.value;
        inputTaskList.appendChild(li);
        const span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputTask.value = '';
}

// Function to mark task as completed or remove task
inputTaskList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
    } else if (event.target.tagName === 'SPAN') {
        event.target.parentElement.remove();
    }
}, false);

// Function to fetch data from API
const fetchData = async () => {
    try {
        const response = await fetch('https://module3-api-is2m.onrender.com/random-todos');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Main function to initialize tasks from API
const main = async () => {
    try {
        const tasks = await fetchData();
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            const span = document.createElement('span');
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            inputTaskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error initializing tasks:', error);
    }
}

// Event listener for adding a new task
taskButton.addEventListener('click', addTask);

// Initialize tasks from API
main();
