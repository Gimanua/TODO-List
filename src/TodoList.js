const fetchUrl = 'http://its.teknikum.it:8080/lists/2?_embed=items';

export default class TodoList {
    constructor(json) {
        this.title = json.title;
        this.items = json.items;
    }

    static async getTodoList() {
        try {
            const response = await fetch(fetchUrl);
            const json = await response.json();
            return new TodoList(json);
        } catch (error) {
            console.log(error);
        }
    }
}