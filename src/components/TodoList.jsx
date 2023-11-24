function TodoList({ todos, deleteTodoById, editTodo }) {
    return (
        <div>
            <h1>List of Todos</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                         <tr key={crypto.randomUUID()}>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.completed ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => editTodo(todo)}>Edit</button>
                                <button onClick={() => deleteTodoById(todo.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {console.log(todos)}
        </div>
    );
}

export default TodoList;
