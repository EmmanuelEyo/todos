import React, {useState, useEffect} from 'react'
import {BsFillTrashFill} from 'react-icons/bs'

const initialList = [
    {id: 1, text: 'React', isCompleted: false},
    {id: 2, text: 'Tailwind', isCompleted: false},
    {id: 3, text: 'JavaScript', isCompleted: false},
]

const TodoApp = ({todo, deleteTodo, index, completedTodo}) => {
    return(
        <div className='flex justify-center items-center mb-4 bg-white p-4' style={{textDecoration: todo.isCompleted ? 'line-through' : ''}}>
            <input onClick={() => completedTodo(index)} className='mr-3 mt-1' type="checkbox" />
            <p className='text-gray-900 w-full text-2xl'>{todo.text}</p>
            <button onClick={() => deleteTodo(index)} className='flex ml-4 mr-2 text-xl'>
                <BsFillTrashFill />
            </button>
        </div>
    )
}

const TodoForm = ({addTodo}) => {
    const [text, setText] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!text) return
        addTodo(text)
        setText('')
    }
    return(
        <form onSubmit={handleSubmit} className='flex mt-4'>
            <input value={text} onChange={e => setText(e.target.value)} className='border w-full py-2 px-3 mr-4 outline-none' type='text' placeholder='Add your todo...' />
            <button className='border-2 rounded p-2 px-4 text-xl text-white bg-gradient-to-r from-violet-500 to-fuchsia-500'>
                <h1 className='text-3xl'>+</h1>
            </button>
        </form>
    )
}



const Todo = () => {
    const [todosNumber, setTodosNumber] = useState(0)
    const [todoList, setTodoList] = useState(initialList)

    useEffect(() => {
        setTodosNumber(todoList.filter(todo => todo.text).length)
    })

    const addTodo = (text) => {
        const newTodos = [...todoList, {text}]
        setTodoList(newTodos)
    }

    const deleteTodo = (index) => {
        const newTodos = [...todoList]
        newTodos.splice(index, 1)
        setTodoList(newTodos)
    }

    const completedTodo = (index) => {
        const newTodos = [...todoList]
        newTodos[index].isCompleted = true
        setTodoList(newTodos)
    }
  return (
    <div className='h-100 w-full flex items-center justify-center'>
        <div className='bg-gradient-to-r from-purple-400 to-pink-500 rounded p-6 m-4 w-full lg:w-3/4 lg:max-w-lg'>
            <div className='mb-4'>
                <h1 className='text-gray-900 text-5xl text-center font-semibold'>Todo</h1>
                {/* <div className='flex mt-4'>
                    <input className='border w-full py-2 px-3 mr-4 outline-none' type='text' placeholder='Add your todo...' />
                    <button className='border-2 rounded p-2 px-4 text-xl text-white bg-gradient-to-r from-violet-500 to-fuchsia-500'>
                        <h1 className='text-3xl'>+</h1>
                    </button>
                </div> */}
                <TodoForm addTodo={addTodo} />
            </div>
            {/* <div className='flex justify-center items-center mb-4 bg-white p-4'>
                <input className='mr-3 mt-1' type="checkbox" />
                <p className='text-gray-900 w-full text-2xl'>React</p>
                <button className='flex ml-4 mr-2 text-xl'><BsFillTrashFill /></button>
            </div>
            <div className='flex justify-center items-center mb-4 bg-white p-4'>
                <input className='mr-3 mt-1' type="checkbox" />
                <p className='text-gray-900 w-full text-2xl'>Tailwind</p>
                <button className='flex ml-4 mr-2 text-xl'><BsFillTrashFill /></button>
            </div> */}
            {todoList.map((todo, index) => (
                <TodoApp todo={todo} key={todo.id} index={index} deleteTodo={deleteTodo} completedTodo={completedTodo} />
            ))}
            <div className='text-center text-lg font-semibold'>
                <h2>You have {todosNumber} todos</h2>
            </div>
        </div>
    </div>
  )
}

export default Todo