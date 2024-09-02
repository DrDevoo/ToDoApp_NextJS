"use client";
import Link from 'next/link';
import './styles/home.css'
import './styles/global.css'
import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const [showAdd, setShowAdd] = useState(false);
  var [newTodo, setNewTodo] = useState("");
  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
    setShowAdd(false)
  };

  return (
    <main>
      <header className="header">
        <nav className="menu">
          <Link href="/">Feladataim</Link>
          <Link href="/bejelentkezes">Bejelntkezés</Link>
          <Link href="/regisztracio">Regisztráció</Link>
        </nav>
      </header>
      <section className="hero">
        <h1 className=""><center>To-Do feldatkezelő alkalmazás</center></h1>
      </section>
      <section className="todolist">
        {todos.sort((a, b) => a.completed - b.completed).map((todo) => (
          <div key={todo.id} className={todo.completed ? 'kesz todo' : 'todo'}>
            <span className="">{todo.text}</span>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
          </div>
        ))}

        <div className="addtodo" onClick={() => setShowAdd(!showAdd)}>
          <span className="">+</span>
        </div>
        {showAdd && (
        <div className="addtodobox todo">
          <input
            type="text"
            placeholder="feladat neve"
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={() => addTodo()}>
            Mentés
          </button>
        </div>)}
      </section>
    </main>
  );
}
