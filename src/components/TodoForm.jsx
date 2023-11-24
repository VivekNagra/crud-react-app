import { useState, useEffect } from "react";

function TodoForm({ blankTodo, todoToEdit, mutateTodo }) {
    const [todo, setTodo] = useState({ ...todoToEdit });

    useEffect(() => {
        setTodo({
            ...todoToEdit,
            // Ensure completed is a string here, as select options are in string format
            completed: todoToEdit.completed.toString()
        });
    }, [todoToEdit]);

    function handleChange(e) {
        const name = e.target.id;
        let value = e.target.value;

        // Convert the 'completed' value to boolean if the changed element is 'completed'
        if (name === 'completed') {
            value = value === 'true';
        }

        setTodo({ ...todo, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('submit', todo);
        mutateTodo(todo);
    }

    return (
        <div>
            <h1>Add/Edit Todo</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">ID</label>
                <input id="id" type="number" readOnly placeholder="id" value={todo.id} />

                <label htmlFor="title">Title</label>
                <input id="title" type="text" placeholder="title" value={todo.title} onChange={handleChange} />

                <label htmlFor="description">Description</label>
                <textarea id="description" placeholder="description" value={todo.description} onChange={handleChange} />

                <label htmlFor="completed">Completed</label>
                <select id="completed" value={todo.completed.toString()} onChange={handleChange} >
                    <option value="false" selected="selected">No</option>
                    <option value="true">Yes</option>
                </select>

                <button type="submit">Save Todo</button>
                <button type="button" onClick={(e) => {
                    e.preventDefault();
                    setTodo(blankTodo);
                }}>Reset</button>
            </form>
        </div>
    );
}

export default TodoForm;
