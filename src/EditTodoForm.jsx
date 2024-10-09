import { useState, useEffect } from 'react';

export function EditTodoForm({ id, title, text, editTodoNote }) {
    const [newTitle, setNewTitle] = useState(title);
    const [newText, setNewText] = useState(text);


    useEffect(() => {
        setNewTitle(title);
        setNewText(text);
    }, [title, text]);

    function onFormSubmit(e) {
        e.preventDefault();

        if (!newTitle.length)
            return;

        editTodoNote(id, newTitle, newText);

    }


    return (
        <form onSubmit={onFormSubmit} className="edit-todo-form">
            <label htmlFor="edit-todo-title">Ändra Att Göra-lapp</label>
            <input value={newTitle} onChange={(evt) => setNewTitle(evt.target.value)} type="text" id="edit-todo-title"></input>
            <textarea value={newText} onChange={(evt) => setNewText(evt.target.value)}></textarea>
            <button className="btn">Spara</button>
        </form>
    );
}