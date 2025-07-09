import { useState, useEffect } from 'react'
import { TodoProvider } from './context/TodoContext'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("All")  

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])    
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

 const deleteTodo = (id) => {
  const todoToDelete = todos.find((t) => t.id === id);  

  setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id)); 

  if (todoToDelete && todoToDelete.todo) {
    setTimeout(() => {
      alert(`✅ Task Completed: "${todoToDelete.todo}"`);
    }, 300);
  }
}

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    ) 
  }

  useEffect(() => {        
    const todos = JSON.parse(localStorage.getItem("todos"))    
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

 
  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true
    if (filter === "Completed") return todo.completed
    if (filter === "Pending") return !todo.completed
    return todo.category === filter
  })

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen w-full flex items-center justify-center">

        <div className="w-[90vw] max-w-[80vw] h-[90vh] max-h-[90vh] bg-gradient-to-br from-[#2e1a47] to-[#391a52] rounded-3xl shadow-2xl p-8 text-white overflow-y-auto transition-all duration-300">

          <h1 className="text-3xl font-bold text-center mb-6">📝 Manage Your Todos</h1>

          <div className="mb-4">
            <TodoForm />
          </div>


          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {["All", "Completed", "Pending", "Work", "Study", "Personal"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1 rounded-full text-sm font-semibold transition duration-200 ${
                  filter === f ? "bg-white text-black" : "bg-white/20 text-white hover:bg-white/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

        <div className="mt-6 bg-[#2c3e50] rounded-xl p-4 shadow-lg space-y-3">
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App