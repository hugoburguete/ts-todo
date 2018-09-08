import * as moment from 'moment';

export interface TodoInterface {
    title: string;
    date: moment.Moment;
}

export class Todo implements TodoInterface {
    title: string;
    date: moment.Moment;

    public static DEFAULT_DATE_FORMAT = 'ddd, hA';

    /**
     * Constructor
     *
     * @param title The todo title
     */
    constructor(title: string, date: moment.Moment) {
        this.title = title;
        this.date = date;
    }

    /**
     * Retrieve todo title
     */
    public getTitle(): string {
        return this.title;
    }

    public getDate(format: string = ''): string {
        if (format.length > 0) {
            return this.date.format(format);
        }

        return this.date.format(Todo.DEFAULT_DATE_FORMAT);
    }
}

export class TodoCollection {
    todos: Todo[] = [];

    constructor() {

    }

    /**
     * Adds a todo to this collection
     * @param todo 
     */
    public addTodo(todo: Todo): void {
        this.todos.push(todo);
    }

    /**
     * Removes a todo in this collection
     * @param todo 
     */
    public removeTodo(todo: Todo): void {
        this.removeTodoByIndex(this.todos.indexOf(todo));
    }

    /**
     * Remoes a todo in this collection 
     * @param index 
     */
    public removeTodoByIndex(index: number): void {
        this.todos.splice(index, 1);
    }

    /**
     * Retrieves a todo
     * @param index 
     */
    public getTodo(index: number): Todo {
        return this.todos[index];
    }

    /**
     * Returns the amount of todos in this collection
     */
    public count(): number {
        return this.todos.length;
    }
}