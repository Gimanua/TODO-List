import Utility from './Utility.js';
const fetchUrl = 'http://its.teknikum.it:8080';
const listId = 2;

export default class TodoTask {
    constructor(json) {
        this.id = json.id;
        this.listId = json.listId;
        this.isComplete = json.isComplete;
        this.title = json.title;
    }

    setCompletion(complete) {
        this.isComplete = complete;
        this.completionImage.src = this.isComplete ? 'images/check.jpg' : 'images/cross.png';
    }

    setTitle(title){
        this.title = title;
        this.titleElement.innerHTML = title;
    }

    load() {
        this.todoElement = document.createElement('tr');

        this.titleElement = Utility.getCustomElement('td', { content: this.title });
        this.completedElement = document.createElement('td');
        this.changeTitleElement = document.createElement('td');

        this.completionImage = Utility.getCustomElement('img', {
            attributes: [
                { name: 'src', value: this.isComplete ? 'images/check.jpg' : 'images/cross.png' },
                { name: 'alt', value: this.isComplete ? 'Avklarad' : 'Ej avklarad' }
            ]
        });
        this.completedElement.appendChild(this.completionImage);

        this.changeTitleForm = document.createElement('form');

        this.labelNewTitle = Utility.getCustomElement('label', {attributes: [{name: 'for', value: `newTitleInput${this.id}`}], content: 'Ny titel: '});
        this.inputNewTitle = Utility.getCustomElement('input', {attributes: [{name: 'type', value: 'text'}], id: `newTitleInput${this.id}`});
        this.submitNewTitle = Utility.getCustomElement('input', {attributes: [{name: 'type', value: 'button'}, {name: 'value', value: 'Uppdatera'}]});

        this.changeTitleForm.appendChild(this.labelNewTitle);
        this.changeTitleForm.appendChild(this.inputNewTitle);
        this.changeTitleForm.appendChild(this.submitNewTitle);

        this.changeTitleElement.appendChild(this.changeTitleForm);

        this.todoElement.appendChild(this.titleElement);
        this.todoElement.appendChild(this.completedElement);
        this.todoElement.appendChild(this.changeTitleElement);

        // Append the task
        document.getElementById('todo-list').appendChild(this.todoElement);
    }

    async updateToServer() {
        try {
            fetch(`${fetchUrl}/items/${this.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: this.title, isComplete: this.isComplete, listId: this.listId})
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async generateNewTask(title, isComplete){
        try{
            const response = await fetch(`${fetchUrl}/lists/${listId}/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: title, isComplete: isComplete})
            });
            const json = await response.json();
            return new TodoTask(json);
        } catch (error) {
            console.log(error);
        }
    }
}