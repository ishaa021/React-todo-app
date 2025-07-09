import { useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm() {

    const [todo, setTodo] = useState("")
    const [category, setCategory] = useState("")   
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()
        if (!todo || !category) return    
        addTodo({ todo, category, completed: false })  
        setTodo("")
        setCategory("")
    }

    return (
        <form onSubmit={add} className="flex flex-col sm:flex-row gap-3">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                 className="text-sm px-2 py-1 rounded border bg-white text-black w-fit"
>
                <option value="">Select Category</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Personal">Personal</option>
            </select>

            <button
                type="submit"
                className="rounded-lg px-4 py-2 bg-green-600 text-white shrink-0 w-full sm:w-auto"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;