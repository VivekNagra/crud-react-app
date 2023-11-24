import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useState, useEffect } from 'react';
import { fetchData } from './util/persistance';


const blankTodo = {
    "id": '',
    "title": '',
    "description": '',
    "completed": false,
}

function App() {
    const [todos, setTodos] = useState([]);
    const [todoToEdit, setTodoToEdit] = useState(blankTodo);

    const APIURL = 'http://localhost:3000/todos';

    function editTodo(todo) {
        setTodoToEdit(todo);
    }

    function mutateTodo(todo) {
        if (todo.id !== '') {
            updateTodo(todo);
        } else {
            createTodo(todo);
        }
    }

    function updateTodo(todo) {
        console.log("update");
        fetchData(
            `${APIURL}/${todo.id}`,
            (updatedTodo) => setTodos(
                todos.map((t) => (t.id === updatedTodo.id ? { ...updatedTodo } : t))
            ), 
            'PUT', 
            todo
        );
    }

    function createTodo(todo) {
        console.log("create");
        fetchData(
            `${APIURL}`,
            (newTodo) => setTodos([...todos, newTodo]), 
            "POST", 
            todo
        );
    }

    function getTodos(callback) {
        fetchData(APIURL, callback);
    }

    function deleteTodoById(todoId) {
        fetchData(`${APIURL}/${todoId}`, () => {}, "DELETE");
        setTodos(todos.filter(t => t.id !== todoId));
    }

    useEffect(() => {
        getTodos((data) => setTodos(data));
    }, []);

    return (
        <div className="container mt-4"> 
            <h1 className="text-center mb-4">Todo List</h1>
            <TodoForm blankTodo={blankTodo} todoToEdit={todoToEdit} mutateTodo={mutateTodo}/>
            <TodoList todos={todos} deleteTodoById={deleteTodoById} editTodo={editTodo}/>
        </div>
    )
}

export default App;
