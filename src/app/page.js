import Link from 'next/link';
import './styles/home.css'

export default function Home() {
  return (
    <main>
      <header><nav className=""></nav></header>
      <section className="hero">
        <h1 className=""><center>To-Do feldatkezelő alkalmazás</center></h1>
      </section>
      <section className="todolist">
        <div className="todo">
          <span className="">todo neve</span>
          <input type="checkbox" id="id" name="name" className="hidden" />
        </div>
        <div className="todo">
          <span className="">todo neve</span>
          <input type="checkbox" id="id" name="name" className="hidden" />
        </div>
        <div className="addtodo">
          <span className="">+</span>
        </div>
      </section>
    </main>
  );
}
