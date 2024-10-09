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

    function onToggleShowCompleted(evt) {
        setShowDoneTodos((isShowingDone) => !isShowingDone);
    }


    /*******************************************************************
     * Component components
     *******************************************************************/
    return (
        <div className="todo-list-box">
            <h1 className="header">Att göra:</h1>
            <SortingSelector sortTodosBy={sortTodosBy} onChangeSort={onChangeSort} />
            <div>
                <input type="checkbox" id="todo-filtercomplete" onChange={onToggleShowCompleted} checked={showDoneTodos} />
                <label htmlFor="todo-filtercomplete">Visa avklarade lappar</label>
            </div>
            <TodoList todoList={todoItems} setTodoStatus={setTodoStatus} deleteTodoNote={deleteTodoNote} showEditForm={showEditForm} sortTodosBy={sortTodosBy} showDoneTodos={showDoneTodos} />
            <NewTodoForm addTodoNote={addTodoNote} />
            <dialog ref={editDialogRef}><EditTodoForm {...editTodo} editTodoNote={editTodoNote} /></dialog>
        </div>
    );
}

export default App;
