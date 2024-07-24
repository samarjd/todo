document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    taskList.appendChild(document.createElement('h2')).textContent = '[No Storage] Task List';

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            const taskItem = e.target.parentElement;
            taskList.removeChild(taskItem);
        } else if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
            const statusSpan = e.target.querySelector('.status');
            statusSpan.textContent = e.target.classList.contains('completed') ? 'Completed' : 'Pending';
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
}