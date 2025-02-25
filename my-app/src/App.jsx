import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>LoLGPT</h1>
      </header>

      <div>
        <main>
          <ul>
            <li className="message bot">
              <span>DeepSeek</span>
              <span> DALE TETE DAME UN INPUT</span>
            </li>
            <li className="message user">  
              <span> User</span>
              <span> Respuesta del user</span>
            </li>
          </ul>
        
        </main>
        <form>
            <input name="message" placeholder="Escribe tu mensaje..."/>
            <button>Send</button>
          </form>
      </div>

    </>
  )
}

export default App
