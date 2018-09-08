import { Todo, TodoCollection } from './todo';
import * as moment from 'moment';

let todoCollection: TodoCollection = new TodoCollection();

document.addEventListener('DOMContentLoaded', function(event) {
    const addTodoButton = document.getElementById('btn-add-todo');
    addTodoButton.addEventListener('click', function(event) {
        let testTodo = new Todo('Test', moment());
        
        todoCollection.addTodo(testTodo);

        const tableBody = document.getElementById('table-todo-body');

        const todoRow = <HTMLTableRowElement> document.createElement('tr');
        const todoCol1 = <HTMLTableDataCellElement> document.createElement('td');
        const todoCol2 = <HTMLTableDataCellElement> document.createElement('td');
        const todoCol3 = makeActionsCell();
        
        todoRow.setAttribute('data-index', todoCollection.count().toString());
        todoCol1.innerHTML = testTodo.getTitle();
        todoCol2.innerHTML = testTodo.getDate();

        todoRow.appendChild(todoCol1);
        todoRow.appendChild(todoCol2);
        todoRow.appendChild(todoCol3);
        tableBody.appendChild(todoRow);
    })
});

function makeActionsCell() {
    const todoCol3 = <HTMLTableDataCellElement> document.createElement('td');
    const deleteButton = <HTMLButtonElement> document.createElement('button');
    deleteButton.setAttribute('class', 'btn btn-danger');
    deleteButton.addEventListener('click', function() {
        const todoRow = this.parentElement.parentElement;
        const tableBody = document.getElementById('table-todo-body');
        const index = parseInt(todoRow.getAttribute('data-index'));
        todoCollection.removeTodoByIndex(index);
        tableBody.removeChild(todoRow);
    });
    deleteButton.innerText = 'Remove Todo';
    todoCol3.appendChild(deleteButton);
    return todoCol3;
}