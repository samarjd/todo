document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', function() {
        addTaskFromInput();
    });

    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addTaskFromInput();
        }
    });
    
    document.querySelector('.action-btns').addEventListener('click', function(event) {
        if (event.target.classList.contains('toggle-tasks')) {
            const linkId = event.target.id;
            document.querySelector('.action-btns .toggle-tasks.active').classList.remove('active');
            event.target.classList.add('active');
            toggleTasksVisibility(linkId);
        }
    });
});

function addTaskFromInput() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
        taskInput.focus();
    }
}

function toggleTasksVisibility(linkId) {
    taskList.querySelectorAll('li').forEach(taskItem => {
        taskItem.classList.add('hidden');
    });
    
    if (linkId === 'allTasks') {
        taskList.querySelectorAll('li').forEach(taskItem => {
            taskItem.classList.remove('hidden');
        });
    } else if (linkId === 'completedTasks') {
        taskList.querySelectorAll('.completed').forEach(completedTask => {
            completedTask.classList.remove('hidden');
        });
    } else if (linkId === 'pendingTasks') {
        taskList.querySelectorAll(':not(.completed)').forEach(pendingTask => {
            pendingTask.classList.remove('hidden');
        });
    }
}

function toggleTaskStatus(taskItem) {
    taskItem.classList.toggle('completed');
    const statusSpan = taskItem.querySelector('.status');
    if (taskItem.classList.contains('completed')) {
        statusSpan.textContent = 'Completed';
    } else {
        statusSpan.textContent = 'Pending';
    }
    updateTasks();
}