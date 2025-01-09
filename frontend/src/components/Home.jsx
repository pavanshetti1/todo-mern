import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {

  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const navigateTo = useNavigate();

  useEffect ( () => {
    const fetchTodos = async () =>{
      try {
        setLoading(true);
        const response = await axios.get("/todo/fetch",{
          withCredentials:true,
          headers: {
            "Content-Type" : "application/json"
          }
        })
        // console.log(response.data.todos);
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("failed to fetch todos");
      }
      finally{
        setLoading(false);
      }
    }
    fetchTodos()
  }, [])

  const todoCreate = async () =>{
    try {
      const response = await axios.post("/todo/create", {
        text : newTodo
      }, {
        withCredentials:true
      })
      console.log(response.data.newTodo);
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");

    } catch (error) {
      setError("Failed to create new todo");
    }
  }

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);    
    try {
          const response = await axios.put(`/todo/update/${id}`, {
          ...todo, completed: !todo.completed
      }, {
        withCredentials:true
      });
      console.log(response.data.todo);
      setTodos(todos.map((t) => (t._id === id ? response.data.todo: t)));
    } catch (error) {
      setError("Failed to update todo");
    }
  }

  const todoDelte = async (id) => {
    try {
       await axios.delete(`/todo/delete/${id}`, {
        withCredentials:true
      })

      setTodos(todos.filter((t) => t._id !== id))
    } catch (error) {
      setError("Error deleting todo");
    }
  }


  const logout = async () =>{
    console.log("logging out user");
    try { 
      await axios.get("/user/logout" ,{
        withCredentials:true
      });
      localStorage.removeItem("jwt");
      toast.success("user logged out successfully");
      navigateTo("/login");
      console.log("Logged out user");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  }

  return (
    <div className='bg-zinc-700 max-w-lg lg:max-w-xl rounded-lg shadow-lg sm:mx-auto mx-8 p-6 my-10'>
      <h1 className='text-3xl font-semibold text-center'>TODO App</h1>
      <div className='my-5 flex' >
      <input 
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className='p-2 md:flex-grow text-black outline-none rounded-l-md w-full md:w-auto' 
          type="text" 
          placeholder='add a new todo' 
        />
        <button 
        onClick={todoCreate}
        className='px-4 md:mt-0 py-2 bg-blue-500 rounded-r-md    md:w-auto'>Add</button>
      </div>

      { loading ? (<div className='text-center'> <span>Loading...</span> </div>) :
       error ? (<div className='text-center text-red-400 font-bold'>{error}</div>) :
       (<ul  className='space-y-4'>
        {todos.map((todo, index) =>(
          <li key={todo._id || index }  className='flex justify-between' >
          <div className='space-x-3'>
            <input type="checkbox" checked={todo.completed} onChange={() => todoStatus(todo._id)} />
            <span className={`${todo.completed ? "line-through text-gray-300 font-normal" : "text-white font-semibold"}`}>{todo.text}</span>
          </div>
          <button onClick={() => todoDelte(todo._id)}  className='text-red-400 rounded-md'>Delete</button>
        </li>
        ))}
      </ul>) }

      
      <p className='text-center mt-10 text-lg text-gray-300'>{todos.filter((todo)=> !todo.completed).length} todos remaining</p>
        <button 
        onClick={() => logout()}
      className='px-4 py-2 bg-red-600 rounded-lg block mt-6 mx-auto'>Logout</button>
    </div>
  )
}

export default Home