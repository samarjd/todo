document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    taskList.appendChild(document.createElement('h2')).textContent = '[Local Storage] Task List';

    // Load tasks from localStorage
    loadTasks();

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            const taskItem = e.target.parentElement;
            removeTask(taskItem);
        } else if (e.target.tagName === 'LI') {
            toggleTaskStatus(e.target);
        }
    });
});

function addTask(text) {
    const li = document.createElement('li');
    li.textContent = text;

    const statusSpan = document.createElement('span');
    statusSpan.textContent = 'Pending';
    statusSpan.className = 'status';
    li.appendChild(statusSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.className = 'delete';
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    updateTasks();
}

function removeTask(taskItem) {
    taskList.removeChild(taskItem);
    updateTasks();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        const statusSpan = document.createElement('span');
        statusSpan.textContent = task.completed ? 'Completed' : 'Pending';
        statusSpan.className = 'status';
        li.appendChild(statusSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖';
        deleteBtn.className = 'delete';
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function updateTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        tasks.push({
            text: taskItem.childNodes[0].textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}