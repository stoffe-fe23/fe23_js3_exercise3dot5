import { useState, useEffect, useRef, useReducer } from 'react';
import './App.css';
import TodoList from './TodoList';
import { NewTodoForm } from './NewTodoForm';
import { EditTodoForm } from './EditTodoForm';
import SortingSelector from './SortingSelector';

function App() {
    /*******************************************************************
     * React hooks
     *******************************************************************/
    // Handle the edit form
    const [editTodo, setEditTodo] = useState({ id: 0, title: "", text: "" });
    const editDialogRef = useRef(null);
    const newDialogRef = useRef(null);

    // State keeping track of todo notes. Load default from local storage.
    const [todoItems, setTodoItems] = useState(() => {
        const storedTodoNotes = localStorage.getItem("TodoItems");
        return (storedTodoNotes == null ? [] : JSON.parse(storedTodoNotes));
    });

    // State of todo list sorting.
    const [sortTodosBy, setSortTodosBy] = useState(() => {
        const storedSortOrder = localStorage.getItem("TodoSorting");
        return (storedSortOrder == null ? { type: "order", direction: "asc" } : JSON.parse(storedSortOrder));
    });

    // State of Completed filter.
    const [showDoneTodos, setShowDoneTodos] = useState(() => {
        const isShowingDone = localStorage.getItem("TodoShowDone");
        return (isShowingDone == null ? true : JSON.parse(isShowingDone));
    });

    // Store/update notes in local storage when anything has changed. 
    useEffect(() => {
        localStorage.setItem("TodoItems", JSON.stringify(todoItems));
    }, [todoItems]);

    // Store/update sort order in local storage when it is changed. 
    useEffect(() => {
        localStorage.setItem("TodoSorting", JSON.stringify(sortTodosBy));
    }, [sortTodosBy]);

    // Store/update Done filter in local storage when it is changed. 
    useEffect(() => {
        localStorage.setItem("TodoShowDone", JSON.stringify(showDoneTodos));
    }, [showDoneTodos]);


    /*******************************************************************
     * Callback functions for manipulating Todo notes
     *******************************************************************/
    // Add new todo item to the todos array. 
    function addTodoNote(title, text) {
        setTodoItems((currentTodoItems) => {
            return [...currentTodoItems, { id: crypto.randomUUID(), title, text, date: Date.now(), status: "todo", order: currentTodoItems.length }];
        });
        if (newDialogRef && newDialogRef.current) {
            newDialogRef.current.close();
        }
    }

    // Change the status of an existing todo note. 
    function setTodoStatus(id, status) {
        setTodoItems((currentTodoItems) => {
            return currentTodoItems.map((todo) => {
                if (todo.id === id) {
                    todo.status = status;
                }
                return todo;
            });
        });
    }

    // Delete a todo note. 
    function deleteTodoNote(id) {
        setTodoItems((currentTodoItems) => {
            return currentTodoItems.filter((todo) => todo.id != id);
        });
    }

    // Show the Edit todo note dialog box for the specified note. 
    function showEditForm(id, title, text) {
        setEditTodo({
            id: id,
            title: title,
            text: text
        });

        editDialogRef.current.showModal();
    }

    // Edit the specified todo note (and close the edit dialog)
    function editTodoNote(id, newTitle, newText) {
        setTodoItems((currentTodoItems) => {
            return currentTodoItems.map((todo) => {
                if (todo.id === id) {
                    todo.title = newTitle;
                    todo.text = newText;
                }
                return todo;
            });
        });
        if (editDialogRef && editDialogRef.current) {
            editDialogRef.current.close();
        }
    }

    // Set how the ToDo list should be sorted...
    function onChangeSort(evt) {
        const [type, direction] = evt.target.value.split("-");
        setSortTodosBy({ type, direction });
    }

    // Event handler for toggling the Visa avklarade checkbox.
    function onToggleShowCompleted(evt) {
        setShowDoneTodos((isShowingDone) => !isShowingDone);
    }

    // Event handler of the Ny lapp button to show the form dialog.
    function onNewTodoClick(evt) {
        newDialogRef.current.showModal();
    }


    /*******************************************************************
     * Component components
     *******************************************************************/
    return (
        <div className="todo-list-box">
            <h1 className="header">Att göra:</h1>
            <div className="todo-settings">
                <SortingSelector sortTodosBy={sortTodosBy} onChangeSort={onChangeSort} />
                <div className="todo-filterdone-box">
                    <input type="checkbox" id="todo-filtercomplete" onChange={onToggleShowCompleted} checked={showDoneTodos} />
                    <label htmlFor="todo-filtercomplete">Visa avklarade lappar</label>
                </div>
                <button id="todo-new-todo" onClick={onNewTodoClick}>Ny lapp</button>
            </div>
            <TodoList todoList={todoItems} setTodoStatus={setTodoStatus} deleteTodoNote={deleteTodoNote} showEditForm={showEditForm} sortTodosBy={sortTodosBy} showDoneTodos={showDoneTodos} />
            <dialog ref={newDialogRef}><NewTodoForm addTodoNote={addTodoNote} /></dialog>
            <dialog ref={editDialogRef}><EditTodoForm {...editTodo} editTodoNote={editTodoNote} /></dialog>
        </div>
    );
}

export default App;
