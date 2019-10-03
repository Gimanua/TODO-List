import TodoList from './TodoList.js';
import Utility from './Utility.js';

const ulElement = document.createElement('ul');
TodoList.getTodoList().then(todoList => {
    appendTodolist(todoList.items);
    document.getElementById('todo-caption').innerHTML = `${todoList.title}'s TODO-lista`;

    const totalTasks = parseFloat(document.getElementById('todo-task-count').innerHTML);
    const completedTasks = parseFloat(document.getElementById('todo-completed-count').innerHTML);

    document.getElementById('todo-completed-percent').innerHTML = `${completedTasks / totalTasks * 100}%`;
}).catch(reason => console.log(reason));

function appendTodolist(items){
    items.forEach(item => {
        const todoElement = document.createElement('tr');

        const titleElement = document.createElement('td');
        titleElement.innerHTML = item.title;

        const descriptionElement = document.createElement('td');
        descriptionElement.innerHTML = 'Ingen beskrivning';

        const completedElement = document.createElement('td');
        completedElement.appendChild(Utility.getCustomElement('img', {
            classes: ['task-status'],
            attributes: [
                {name: 'src', value: item.isComplete ? 'images/check.jpg' : 'images/cross.png'}, 
                {name: 'alt', value: item.isComplete ? 'Avklarad' : 'Ej avklarad'}
            ]
        }));

        todoElement.appendChild(titleElement);
        todoElement.appendChild(descriptionElement);
        todoElement.appendChild(completedElement);

        document.getElementById('todo-list').appendChild(todoElement);

        document.getElementById('todo-task-count').innerHTML = parseInt(document.getElementById('todo-task-count').innerHTML) + 1;
        if(item.isComplete)
            document.getElementById('todo-completed-count').innerHTML = parseInt(document.getElementById('todo-completed-count').innerHTML) + 1;
    });
}
