

function TodoItem({ id, title, text, date, status, setTodoStatus, deleteTodoNote, showEditForm }) {
    function onCompletedChange(event) {
        setTodoStatus(id, event.target.checked ? "done" : "todo");
    }

    function onDeleteClick(event) {
        if (confirm("Är du säker på att du vill ta bort denna Att Göra-lapp?")) {
            deleteTodoNote(id);
        }
    }

    function onEditClick(event) {
        showEditForm(id, title, text);
    }

    function getDateString(timestamp, locale = "sv-SE") {
        const formatOptions = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return new Intl.DateTimeFormat(locale, formatOptions).format(new Date(timestamp));
    }

    return (
        <li key={id} id={id} className={status == "done" ? "todo-list-item todo-done" : "todo-list-item todo-todo"}>
            <label>
                <input type="checkbox" checked={status == "done"} onChange={onCompletedChange} />
                <h3>{title}</h3>
                <div>{text}</div>
                <div className="todo-date">{getDateString(date)}</div>
            </label>
            <button className="btn btn-edit" onClick={onEditClick} title="Redigera">🖋️</button>
            <button className="btn btn-delete" onClick={onDeleteClick} title="Radera">❌</button>
        </li>
    );
}

export default TodoItem;