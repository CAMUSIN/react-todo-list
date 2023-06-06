import { useState } from "react";
import Todo from "./todo";

import "./todoApp.css";

export default function TodoApp(){
    const [title, setTitle] = useState("");
    const [todos, setTodos] = useState([]);

    function handleChange(e){
        const value = e.target.value;
        setTitle(value);
    }

    function handleSubmit(e){
        e.preventDefault();
        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            completed: false
        }
        const temp = [...todos];
        temp.unshift(newTodo);
        setTodos(temp);
        setTitle("");
    }

    function handleUpdate(id, value){
        const todosTemp = [ ...todos];
        const item = todosTemp.find((item) => item.id === id);
        item.title = value;
        setTodos(todosTemp);
    }

    function handleDelete(id){
        const todosTemp = todos.filter((item) => item.id !== id);
        setTodos(todosTemp);
    }

    return (
    <div className="todoContainer">
        <form className="todoCreateForm" onSubmit={handleSubmit}>
            <input className="todoInput" onChange={handleChange} value={title}/>
            <input className="buttonCreate" onClick={handleSubmit} type="submit" value="Create todo"></input>
        </form>
        <div className="todosContainer">
            {todos.map(item => (
                <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete}/>
            ))}
        </div>
    </div>
    );
}