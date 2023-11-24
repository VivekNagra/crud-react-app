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
        <div className="container mt-3">
            <h1 className="mb-3">Add/Edit Todo</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-1">
                        <label htmlFor="id" className="form-label">ID</label>
                        <input id="id" type="text" className="form-control" readOnly value={todo.id} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input id="title" type="text" className="form-control" placeholder="Enter title" value={todo.title} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="completed" className="form-label">Completed</label>
                        <select id="completed" className="form-select" value={todo.completed.toString()} onChange={handleChange}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" className="form-control" placeholder="Enter description" rows="3" value={todo.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <button className="btn btn-success me-2" type="submit">Save Todo</button>
                    <button type="button" className="btn btn-secondary" onClick={(e) => {
                        e.preventDefault();
                        setTodo(blankTodo);
                    }}>Reset</button>
                </div>
            </form>
        </div>
    );
}

export default TodoForm;
