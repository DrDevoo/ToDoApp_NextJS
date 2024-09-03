"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import '../styles/global.css'
import '../styles/account.css'

export default function Regisztracio() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const registracio = async (e) => {
    setMessage('');
    if(password == password2){
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'login', username, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setMessage('Sikeres regisztráció!');
        } else {
          setMessage(data.message || 'Sikertelen regisztráció!');
        }
      } catch (error) {
        console.log(error)
        setMessage('Hiba történt!');
      }
    }else{
      setMessage("Nem egyezik a két jelszó!")
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
        <h1 className=""><center>Regisztráció</center></h1>
      </section>
      <section className="login">
        <input type="text" placeholder="Felhasználónév" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <input type="password" placeholder="Jelszó újra" value={password2} onChange={(e) => setPassword2(e.target.value)}></input>
        <button onClick={() => registracio()}>Regisztrálok</button>
        {message && <p>{message}</p>}
      </section>
    </main>
  );
}
