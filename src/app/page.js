//Code by: Kis Richárd
"use client";
import Link from 'next/link';
import './styles/home.css'
import './styles/global.css'
import { useState, useEffect } from 'react';

export default function Home() {
  const [username, setUsername] = useState(null);
  //Betöltéskor feladatok lekérése
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    setUsername(localStorage.getItem('username'))
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  //Feladatok mentése ha változás történik
  useEffect(() => {
    if (todos.length >= 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  //Feladat állapotának frissítése
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const [showAdd, setShowAdd] = useState(false);
  var [newTodo, setNewTodo] = useState("");
  var [fontossag, setFontossag] = useState(0);
  var [hatarido, setHatarido] = useState(null);
  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, fontossag: fontossag, hatarido: hatarido }]);
    setNewTodo('');
    setShowAdd(false)
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  const [htsort, setHtsort] = useState("completed");
  const [kereso, setKereso] = useState('');
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(kereso.toLowerCase())
  );
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (htsort === 'completed') {
      return a.completed - b.completed;
    } else if (htsort === 'fontontossag') {
      return b.fontossag - a.fontossag;
    } else if (htsort === 'hatarido') {
      if (a.hatarido && b.hatarido) {
        return new Date(a.hatarido) - new Date(b.hatarido);
      }
      if (!a.hatarido && !b.hatarido) return 0;
      return a.hatarido ? -1 : 1;
    }
  });


  const logout = () => {
    localStorage.removeItem('username');
    setUsername(null)
  };

  return (
    <main>
      <header className="header">
        <nav className="menu">
          <Link href="/">Feladataim</Link>
          {username == null && (
            <><Link href="/bejelentkezes">Bejelentkezés</Link><Link href="/regisztracio">Regisztráció</Link></>
          )}
          {username && (
            <><Link href="" onClick={() => logout()}>Kijelentkezés</Link></>
          )}
        </nav>
        <div className="">
        {username && (
          <span className="">Belépve mint, {username}</span>
        )}
        </div>
      </header>
      <section className="hero">
        <h1 className=""><center>To-Do feldatkezelő alkalmazás</center></h1>
      </section>
      <section className="todolist">
        <div className="sorterbox">
          <div className="searchbox">
            <input type="search" className="" placeholder="keresés..." onChange={(e) => setKereso(e.target.value)} value={kereso}></input>
          </div>
          <div className="sortbox">
            <span className="">Rendezés: </span>
            <select className="" onChange={(e) => setHtsort(e.target.value)}>
                <option value="completed">alap</option>
                <option value="fontontossag">fontosság</option>
                <option value="hatarido">határidő</option>
            </select>
          </div>
        </div>

        {sortedTodos.map((todo) => (
          <div key={todo.id} className={todo.completed ? 'kesz todo' : 'todo'}>
            <div className="todotop">
              <span className="">{todo.text}</span>
              <div className="buttons">
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                <button onClick={() => deleteTodo(todo.id)}>törlés</button>
              </div>
            </div>
            <div className="todobott">
            {todo.hatarido !== null && (
              <span className="">Határidő: {todo.hatarido}</span>
            )}
              <span className="">Fontosság: {todo.fontossag}</span>
            </div>
          </div>
        ))}
        {sortedTodos.length === 0 && (
          <h4 className="">Nincsenek feldatok...</h4>
        )}

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
          <label for="fontossag">Fontosság</label>
          <select className="" name="fontossag" onChange={(e) => setFontossag(e.target.value)}>
              <option value="0">Nem nagyon fontos</option>
              <option value="1">Közepesen fontos</option>
              <option value="2">Nagyon fontos</option>
          </select>
          <label for="hatarido">Határidő</label>
          <input type="date" name="hatarido" id="" value={hatarido} onChange={(e) => setHatarido(e.target.value)} className=""></input>
          <button onClick={() => addTodo()}>
            Mentés
          </button>
        </div>)}
      </section>
    </main>
  );
}
