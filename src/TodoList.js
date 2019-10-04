import TodoTask from './TodoTask.js';
const fetchUrl = 'http://its.teknikum.it:8080';
const listID = '2';

export default class TodoList {
    constructor(json) {
        this.id = json.id;
        this.title = json.title;
        this.todoTasks = [];
        json.items.forEach(item => {
            this.todoTasks.push(new TodoTask(item))
        });
        this.load();

        // Set click listeners on the completion images and change title button
        this.todoTasks.forEach(todoTask => {
            todoTask.completionImage.addEventListener('click', () => {
                todoTask.setCompletion(!todoTask.isComplete);
                this.setCompletion();
                todoTask.updateToServer();
            });
            todoTask.submitNewTitle.addEventListener('click', () => {
                const title = todoTask.inputNewTitle.value;
                if(title === '' || title == null)
                    return;
                todoTask.setTitle(title);
                todoTask.updateToServer();
            });
        });
    }

    static async getTodoList() {
        try {
            const response = await fetch(`${fetchUrl}/lists/${listID}?_embed=items`);
            const json = await response.json();
            return new TodoList(json);
        } catch (error) {
            console.log(error);
        }
    }

    load() {
        // Set the table caption
        this.setTitle(this.title);

        this.todoTasks.forEach(todoTask => {
            todoTask.load();
        });
        this.setCompletion();
    }

    // Sets the completion values for the table footer
    setCompletion() {
        // Set how many tasks there are
        document.getElementById('todo-task-count').innerHTML = this.todoTasks.length;

        // Set how many tasks that are completed
        let completed = 0;
        this.todoTasks.forEach(todoTask => {
            if (todoTask.isComplete)
                ++completed;
        });
        document.getElementById('todo-completed-count').innerHTML = completed;

        // Set the percentage of tasks completed
        document.getElementById('todo-completed-percent').innerHTML = `${completed / this.todoTasks.length * 100}%`;
    }

    insertTodoTask(todoTask){
        this.todoTasks.push(todoTask);
        todoTask.load();
        this.setCompletion();
    }

    setTitle(title){
        this.title = title;
        document.getElementById('todo-caption').innerHTML = title;
    }

    updateTitleToServer(){
        try{
            fetch(`${fetchUrl}/lists/${listID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: this.title})
            });
        } catch (error) {
            console.log(error);
        }
    }
}