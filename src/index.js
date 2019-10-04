import TodoList from './TodoList.js';
import TodoTask from './TodoTask.js';

main();


async function main(){
    const todoList = await TodoList.getTodoList();
    addClicklistener(todoList);
}

function addClicklistener(todoList){
    document.getElementById('post-task').addEventListener('click', async function(){
        const title = document.getElementById('post-task-title').value;
        if(title === '' || title == null)
            return;
        const completed = document.getElementById('true').checked;
            
        const todoTask = await TodoTask.generateNewTask(title, completed);
        todoList.insertTodoTask(todoTask);
    });
    document.getElementById('commit-new-list-name').addEventListener('click', async function(){
        const title = document.getElementById('new-list-name').value;
        if(title === '' || title == null)
            return;
        
        todoList.setTitle(title);
        todoList.updateTitleToServer();
    });
}

/*
function addListeners(todoList){
    // Set click listener to insert a task
    document.getElementById('post-task').addEventListener('click', () => {
        const item = new Item(document.getElementById('post-task-title').value);
        todoList.insertItem(item);
    });

    // Set click listener for status symbol. Sets a new image and recalculates completed tasks
    const taskStatusImages = document.getElementsByClassName('task-status');
    for (const taskStatusImage of taskStatusImages) {
        taskStatusImage.addEventListener('click', function(){
            this.src = this.src.endsWith('images/check.jpg') ? 'images/cross.png' : 'images/check.jpg';
            todoList.initializeElements();
        });
    }
}
*/