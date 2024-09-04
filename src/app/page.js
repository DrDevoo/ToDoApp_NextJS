"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './styles/home.css';
import './styles/global.css';

export default function Home() {
  const [username, setUsername] = useState(null);
  const [todos, setTodos] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [fontossag, setFontossag] = useState(0);
  const [hatarido, setHatarido] = useState(null);
  const [htsort, setHtsort] = useState("completed");
  const [kereso, setKereso] = useState('');

  async function updateTodosOnServer() {
    try {
      const response = await fetch(`/api/updatetasks?userID=${localStorage.getItem('usernameID')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todos),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
      } else {
        const result = await response.json();
        console.log('Server response:', result);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const currentUsername = localStorage.getItem('username');
      setUsername(currentUsername);

      if (currentUsername === null) {
        console.log("Belso memoriabol keres");
        const storedTodos = localStorage.getItem('todos');
        const t = storedTodos ? JSON.parse(storedTodos) : [];
        setTodos(t);
      } else {
        console.log("Szerver memoriabol keres");
        try {
          const response = await fetch(`/api/gettasks?userID=${localStorage.getItem('usernameID')}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data);
          setTodos(data);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      if (todos.length > 0) { 
        if (localStorage.getItem('username') === null) {
          console.log("Belso memoriaba ment");
          localStorage.setItem('todos', JSON.stringify(todos));
        } else {
          console.log("Szerver memoriaba ment");
          updateTodosOnServer()
        }
      }
    };

    saveTodos();
  }, [todos, username]);


  const toggleTodo = async (id) => {
    if (localStorage.getItem('username') === null) {

      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    } else {

      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      updateTodosOnServer()
    }
  };
  

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    const newTodoItem = { id: Date.now(), text: newTodo, completed: false, fontossag, hatarido};
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
    setShowAdd(false);
  };

  const deleteTodo = async (id) => {
    if (localStorage.getItem('username') === null) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    } else {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      updateTodosOnServer()
    }
  };
  

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
    setUsername(null);
    setTodos(null);
  };

  return (
    <main>
      <header className="header">
        <nav className="menu">
          <Link href="/">Feladataim</Link>
          {username == null && (
            <>
              <Link href="/bejelentkezes">Bejelentkezés</Link>
              <Link href="/regisztracio">Regisztráció</Link>
            </>
          )}
          {username && (
            <Link href="#" onClick={logout}>Kijelentkezés</Link>
          )}
        </nav>
        <div>
          {username && (
            <span>Belépve mint, {username}</span>
          )}
        </div>
      </header>
      <section className="hero">
        <h1><center>To-Do feldatkezelő alkalmazás</center></h1>
      </section>
      <section className="todolist">
        <div className="sorterbox">
          <div className="searchbox">
            <input
              type="search"
              placeholder="keresés..."
              onChange={(e) => setKereso(e.target.value)}
              value={kereso}
            />
          </div>
          <div className="sortbox">
            <span>Rendezés: </span>
            <select onChange={(e) => setHtsort(e.target.value)}>
              <option value="completed">alap</option>
              <option value="fontontossag">fontosság</option>
              <option value="hatarido">határidő</option>
            </select>
          </div>
        </div>

        {sortedTodos.map((todo) => (
          <div key={todo.id} className={todo.completed ? 'kesz todo' : 'todo'}>
            <div className="todotop">
              <span>{todo.text}</span>
              <div className="buttons">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <button onClick={() => deleteTodo(todo.id)}>törlés</button>
              </div>
            </div>
            <div className="todobott">
              {todo.hatarido && (
                <span>Határidő: {todo.hatarido}</span>
              )}
              <span>Fontosság: {todo.fontossag}</span>
            </div>
          </div>
        ))}
        {sortedTodos.length === 0 && (
          <h4>Nincsenek feladatok...</h4>
        )}

        <div className="addtodo" onClick={() => setShowAdd(!showAdd)}>
          <span>+</span>
        </div>
        {showAdd && (
          <div className="addtodobox todo">
            <input
              type="text"
              placeholder="feladat neve"
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <label htmlFor="fontossag">Fontosság</label>
            <select
              name="fontossag"
              onChange={(e) => setFontossag(parseInt(e.target.value, 10))}
            >
              <option value="0">Nem nagyon fontos</option>
              <option value="1">Közepesen fontos</option>
              <option value="2">Nagyon fontos</option>
            </select>
            <label htmlFor="hatarido">Határidő</label>
            <input
              type="date"
              name="hatarido"
              value={hatarido || ''}
              onChange={(e) => setHatarido(e.target.value)}
            />
            <button onClick={addTodo}>
              Mentés
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
