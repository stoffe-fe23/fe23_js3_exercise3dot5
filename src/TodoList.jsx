import { useState } from "react";
import TodoItem from "./TodoItem";


function TodoList({ todoList, setTodoStatus, deleteTodoNote, showEditForm, sortTodosBy, showDoneTodos }) {

    function sortTodoNotes(a, b) {
        switch (sortTodosBy.type) {
            case "order": return (sortTodosBy.direction == "asc" ? a.order - b.order : b.order - a.order);
            case "title": return (sortTodosBy.direction == "asc" ? a.title.localeCompare(b.title, 'sv-SE') : b.title.localeCompare(a.title, 'sv-SE'));
            case "date": return (sortTodosBy.direction == "asc" ? a.date - b.date : b.date - a.date);
        }
        return a.order - b.order;
    }

    return (
        <ul className="todo-list">
            {!todoList.length && "Inget att göra!"}
            {todoList
                .filter((todo) => todo.status != "done" || showDoneTodos)
                .sort(sortTodoNotes)
                .map((todo) => {
                    return (
                        <TodoItem key={todo.id} {...todo} setTodoStatus={setTodoStatus} deleteTodoNote={deleteTodoNote} showEditForm={showEditForm} />
                    );
                })}
        </ul>
    );
}


export default TodoList;