document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    taskList.appendChild(document.createElement('h2')).textContent = '[Cookie] Task List';

    // Load tasks from cookies
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
    const tasks = JSON.parse(getCookie('tasks')) || [];
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
    setCookie('tasks', JSON.stringify(tasks), 7); // Set cookie for 7 days
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}