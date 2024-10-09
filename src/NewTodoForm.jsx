
import { useState } from 'react';

export function NewTodoForm({ addTodoNote }) {
    const [newTitle, setNewTitle] = useState("");
    const [newText, setNewText] = useState("");

    function onFormSubmit(e) {
        e.preventDefault();

        if (!newTitle.length)
            return;

        addTodoNote(newTitle, newText);

        setNewTitle("");
        setNewText("");
    }

    return (
        <form onSubmit={onFormSubmit} className="new-todo-form">
            <label htmlFor="new-todo-title">Ny Att Göra-lapp</label>
            <input value={newTitle} onChange={(evt) => setNewTitle(evt.target.value)} type="text" id="new-todo-title"></input>
            <textarea value={newText} onChange={(evt) => setNewText(evt.target.value)}></textarea>
            <button className="btn">Skapa</button>
        </form>
    );
}