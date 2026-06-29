import { useState } from 'react'
import './App.css'

const starterTodos = [
  { id: 1, text: 'Learn Vite + React', done: false },
  { id: 2, text: 'Build a small todo app using it', done: true },
]

function App() {
  const [todos, setTodos] = useState(starterTodos)
  const [input, setInput] = useState('')

  const remaining = todos.filter((todo) => !todo.done).length

  const addTodo = (event) => {
    event.preventDefault()
    const text = input.trim()

    if (!text) return

    setTodos((current) => [
      ...current,
      {
        id: crypto.randomUUID?.() ?? Date.now(),
        text,
        done: false,
      },
    ])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  const clearCompleted = () => {
    setTodos((current) => current.filter((todo) => !todo.done))
  }

  return (
    <main className="app-shell">
      <section className="todo-card">
        <header className="todo-header">
          <div>
            <p className="eyebrow">Advanced</p>
            <h1>Todo list</h1>
          </div>
          <span className="badge">{remaining} remaining</span>
        </header>

        <form className="todo-form" onSubmit={addTodo}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Add a task"
            aria-label="New task"
          />
          <button type="submit">Add</button>
        </form>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
              </label>
            </li>
          ))}
        </ul>

        <footer className="todo-footer">
          <p>{todos.length} total tasks</p>
          <button type="button" onClick={clearCompleted} disabled={!todos.some((todo) => todo.done)}>
            Clear completed
          </button>
        </footer>
      </section>
    </main>
  )
}

export default App
