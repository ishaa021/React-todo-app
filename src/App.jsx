import { useState,useEffect } from 'react'
import { TodoProvider } from './context/TodoContext'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

const [todos ,setTodos] = useState([])

const addTodo = (todo) => {
  setTodos((prev)=>[{id:Date.now(),...todo},...prev])     //adding new todo without removing the prev todos 
}

const updateTodo= (id,todo) => {
  setTodos((prev) => prev.map((prevTodo) => (prevTodo.id=== id? todo : prevTodo)))       // here we are chacking for the todo which we hae to update using map
}

const deleteTodo=(id)=>{
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id!==id))    // jo id match hogi voh nhi ayegi or baki saari id's aa jayengi , here we cn use map too but filter is better option
}

const toggleComplete = (id) => {
  setTodos((prev) => prev.map((prevTodo) => prevTodo.id=== id ? {...prevTodo,completed:!prevTodo.completed} :prevTodo))   // here we overwrite the todo which we want and by using spread operator we only chnage the completed property               
}

useEffect(()=>{        // local storage so that when we refresh the page we dont lost thw data
 const todos = JSON.parse(localStorage.getItem("todos"))    // in local storage is in string but we need in json format

 if(todos && todos.length >0){
  setTodos(todos)
 }

},[])

useEffect(()=>{
  localStorage.setItem("todos",JSON.stringify(todos))  //here we set the todos and convert them into string from json 
},[todos])



  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen w-full ">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */}    
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3"> 
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) =>(
                          <div key={todo.id}
                          className='w-full '>      {/* as every todo is different */}
                               <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
