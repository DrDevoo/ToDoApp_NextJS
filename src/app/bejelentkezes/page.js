"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import '../styles/global.css'
import '../styles/account.css'
import { useState, useEffect } from 'react';

export default function Bejelentkezes() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const belepes = async (e) => {
    setMessage('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'login', username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Sikeres belépdés!');
        console.log(data.username)
        var usern = data.username
        localStorage.setItem('username', usern);
        router.push('/')
      } else {
        setMessage(data.message || 'Sikertelen belépés!');
      }
    } catch (error) {
      console.log(error)
      setMessage('Hiba történt!');
    }
  };

  return (
    <main>
      <header className="header">
        <nav className="menu">
          <Link href="/">Feladataim</Link>
          <Link href="/bejelentkezes">Bejelentkezés</Link>
          <Link href="/regisztracio">Regisztráció</Link>
        </nav>
      </header>
      <section className="hero">
        <h1><center>Bejelentkezés</center></h1>
      </section>
      <section className="login">
        <input type="text" placeholder="Felhasználónév" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button onClick={() => belepes()}>Belépek</button>
        {message && <p>{message}</p>}
      </section>
    </main>
  );
}
