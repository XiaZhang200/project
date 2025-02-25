import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>LoLGPT</h1>
      </header>

      <body>
        <main>
          <ul>
            <li class="message bot">
              <span>AI</span>
              <p> DALE TETE DAME UN INPUT</p>
            </li>
            <li class="message user">  
              <span> User</span>
              <p> Respuesta del user</p>
            </li>
          </ul>
        
        </main>
        <form>
            <input name="message" placeholder="Escribe tu mensaje..."/>
            <button>Send</button>
        </form>
      </body>
      
    </>
  )
}

export default App
