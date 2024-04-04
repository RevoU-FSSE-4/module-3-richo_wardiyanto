// app.ts

document.addEventListener('DOMContentLoaded', async () => {
    const inputTask = document.getElementById('newTask') as HTMLInputElement;
    const inputTaskList = document.getElementById('taskList')!;
    const taskButton = document.getElementById('addTaskBtn') as HTMLButtonElement;

    // Function to add a new task
    const addTask = (): void => {
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
    inputTaskList.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.tagName === 'LI') {
            target.classList.toggle('checked');
        } else if (target.tagName === 'SPAN') {
            target.parentElement?.remove();
        }
    }, false);

    // Function to fetch data from API
    const fetchData = async (): Promise<string[]> => {
        try {
            const response = await fetch('https://module3-api-is2m.onrender.com/random-todos');
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    // Main function to initialize tasks from API
    const main = async (): Promise<void> => {
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
});
