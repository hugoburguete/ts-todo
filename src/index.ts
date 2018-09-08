import { Todo, TodoCollection } from './todo';
import * as moment from 'moment';

let todoCollection: TodoCollection = new TodoCollection();

document.addEventListener('DOMContentLoaded', function(event) {
    // Add TODO button
    document.getElementById('btn-add-todo').addEventListener('click', function(event) {
        resetForm();
        document.getElementById('todo-form').classList.remove('d-none');
    });

    // Form submit button
    document.getElementById('todo-form-submit').addEventListener('click', function(event) {
        event.preventDefault();
        submitTodo();
    });
});

function resetForm(): void {
    (<HTMLInputElement> document.getElementById('todo-title')).value = '';
    (<HTMLInputElement> document.getElementById('todo-date')).value = '';
    (<HTMLInputElement> document.getElementById('todo-id')).value = '';
    document.getElementById('todo-form-submit').innerText = 'Sumit';
}

function submitTodo(): void {
    const title = (<HTMLInputElement> document.getElementById('todo-title')).value;
    const date = (<HTMLInputElement> document.getElementById('todo-date')).value;
    const todoIndex = (<HTMLInputElement> document.getElementById('todo-id')).value;
    let todo = new Todo(title, moment(date));
    
    if (todoIndex.length == 0) {
        todoCollection.addTodo(todo);
    } else {
        todoCollection.updateTodo(parseInt(todoIndex), todo);
    }

    document.getElementById('todo-form').classList.add('d-none');
    renderTodos();
}

function renderTodos() {
    const tableBody = document.getElementById('table-todo-body');

    // Clear table
    tableBody.innerHTML = '';
    
    // Render items
    todoCollection.getTodos().forEach(todo => {
        const todoRow = <HTMLTableRowElement> document.createElement('tr');
        const todoCol1 = <HTMLTableDataCellElement> document.createElement('td');
        const todoCol2 = <HTMLTableDataCellElement> document.createElement('td');
        const todoCol3 = makeActionsCell();
        
        todoRow.setAttribute('data-index', todoCollection.getTodoId(todo).toString());
        todoCol1.innerHTML = todo.getTitle();
        todoCol2.innerHTML = todo.getDate();
    
        todoRow.appendChild(todoCol1);
        todoRow.appendChild(todoCol2);
        todoRow.appendChild(todoCol3);
        tableBody.appendChild(todoRow);
    });
}

function makeActionsCell(): HTMLTableDataCellElement {
    const todoCol3 = <HTMLTableDataCellElement> document.createElement('td');
    const deleteButton = makeDeleteButton();
    const updateButton = makeUpdateButton();
    todoCol3.appendChild(deleteButton);
    todoCol3.appendChild(updateButton);
    return todoCol3;
}

function makeDeleteButton(): HTMLButtonElement {
    const deleteButton = <HTMLButtonElement> document.createElement('button');
    deleteButton.setAttribute('class', 'btn btn-danger');
    deleteButton.addEventListener('click', function() {
        const todoRow = this.parentElement.parentElement;
        const tableBody = document.getElementById('table-todo-body');
        const index = parseInt(todoRow.getAttribute('data-index'));
        todoCollection.removeTodoByIndex(index);
        tableBody.removeChild(todoRow);
    });
    deleteButton.innerText = 'Remove';
    return deleteButton;
}

function makeUpdateButton(): HTMLButtonElement {
    const updateButton = <HTMLButtonElement> document.createElement('button');
    updateButton.setAttribute('class', 'btn btn-secondary');
    updateButton.addEventListener('click', function() {
        const todoRow = this.parentElement.parentElement;
        const index = todoRow.getAttribute('data-index');
        const todo = todoCollection.getTodo(parseInt(index));

        (<HTMLInputElement> document.getElementById('todo-id')).value = index;
        (<HTMLInputElement> document.getElementById('todo-title')).value = todo.getTitle();
        (<HTMLInputElement> document.getElementById('todo-date')).value = todo.getDate('DD/MM/YYYY');
        
        document.getElementById('todo-form-submit').innerText = 'Update';
        document.getElementById('todo-form').classList.remove('d-none');
    });
    updateButton.innerText = 'Update';
    return updateButton;
}