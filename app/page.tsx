"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdLogout } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getSession, signOut } from "next-auth/react";


const Page = () => {

  const [theme1, setTheme1] = useState(false)
  const { setTheme } = useTheme()

  const [todo, setTodo] = useState({
    content: "",
    isImportant: false
  })
  const [todos, setTodos] = useState([
    {
      content: "",
      isImportant: false
    }
  ])
  const [editedTodo, setEditedTodo] = useState({
    content: "",
    isImportant: false
  })
  const [filter, setFilter] = useState("all")

  const onChangeHandler = (e: any) => {
    setTodo({
      content: e.target.value,
      isImportant: todo.isImportant
    })
  }

  const onChangeEditHandler = (e: any, index: number) => {
    setEditedTodo({
      content: e.target.value,
      isImportant: editedTodo.isImportant
    })

  }

  const onClickAddHandler = (oper: string) => {
    if (filter === "all") { 
      setTodos([...todos, todo])
    }
    else if (filter === "important" && todo.isImportant === true) {
      setTodos([...todos, todo])
    }
    else if (filter === "others" && todo.isImportant === false) {
      setTodos([...todos, todo])
    }
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(todo)
    })
      .then(response => response.json())
      .then(data => console.log(""))
      .catch(error => console.error('Error:', error));
    setTodo({
      content: "",
      isImportant: false
    })
  }

  const onClickDeleteHandler = (index: number) => {
    const temp = todos.filter((item, i) => i !== index ? item : false)
    setTodos(temp)
    fetch('/api/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(todos[index])
    })
      .then(response => response.json())
      .then(data => console.log(""))
      .catch(error => console.error('Error:', error));
  }

  const onClickUpdateHandler = (index: number) => {
    const temp = todos.map((item, i) => {
      if (i === index) {
        item.content = editedTodo.content,
          item.isImportant = editedTodo.isImportant
        return item
      }
      return item
    })
    setTodos(temp)
    fetch(`/api/todos?index=${index}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(editedTodo)
    })
      .then(response => response.json())
      .then((data) => console.log(""))
      .catch(error => console.error('Error:', error));
  }

  const onClickEditHandler = (i: number) => {
    setEditedTodo({
      content: todos[i].content,
      isImportant: todos[i].isImportant
    })
  }


  const filterTodos = async () => {
    fetch("/api/todos")
      .then(res => res.json())
      .then((res) => {
        if (filter === "all") {
          setTodos(res.todos)
        }
        else if (filter === "important") {
          const temp = res.todos.filter((item: any) => item.isImportant ? item : false)
          setTodos(temp)
        }
        else if (filter === "others") {
          const temp = res.todos.filter((item: any) => item.isImportant ? false : item)
          setTodos(temp)
        }
      })
  }
  const getTodos = async () => {
    fetch("/api/todos")
      .then(res => res.json())
      .then(res => setTodos(res.todos))
  }

  useEffect(() => {
    filterTodos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  useEffect(() => {
    getTodos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <main className="flex flex-col items-center gap-y-8 px-5">
        <h1 className="text-4xl font-extrabold mt-16 text-center">Todo List App</h1>
        <div className="flex justify-center gap-x-5 w-full mt-5 mobile:gap-x-0 mobile:flex-col mobile:items-center mobile:gap-y-5">
          <div className="flex flex-col gap-y-2 mobile:w-full">
            <Input name="todo" onChange={onChangeHandler} value={todo.content} placeholder="Enter Your Todo" className="w-[500px] h-12 text-lg mobile:w-[90%] mobile:h-10 mobile:mx-auto" />
            <div className="flex gap-x-2 items-center ml-2 mobile:ml-[6vw]">
              <input onChange={(e: any) => { setTodo({ ...todo, isImportant: e.target.checked }) }} style={{ accentColor: theme1 ? "white" : "black" }} checked={todo.isImportant} type="checkbox" id="checkbox" className="h-4 w-4" /><label className="font-semibold mobile:w-[150px]" htmlFor="checkbox">Mark as Important</label>
            </div>
          </div>
          <Button onClick={() => onClickAddHandler("create")} className="w-28 h-12 text-lg mobile:text-sm mobile:w-[90%] mobile:h-10">Add todo</Button>
        </div>
        <h2 className="text-3xl font-bold text-center">My Todo List</h2>
        <div style={{ backgroundColor: !theme1 ? "black" : "white" }} className="w-[700px] h-1 mobile:w-[95%] mobile:px-1"></div>
        <div className="w-[700px] flex justify-end gap-x-5 relative bottom-2 mobile:w-[95%]">
          <div className="relative">
            <Sun style={{ display: !theme1 ? "block" : "block" }} onClick={() => { setTheme("dark"); setTheme1(true) }} className="h-[2.3rem] w-[2.3rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mobile:h-[2.1rem] mobile:w-[2.1rem] cursor-pointer hover:scale-110" />
            <Moon style={{ display: !theme1 ? "block" : "block" }} onClick={() => { setTheme("light"); setTheme1(false) }} className="absolute top-0 h-[2.3rem] w-[2.3rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mobile:h-[2.1rem] mobile:w-[2.1rem] cursor-pointer dark:hover:scale-125" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger><FaFilter className="text-[27px] mobile:text-2xl hover:scale-125 transition-all ease-in-out duration-150" /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => { setFilter("all") }} style={{ fontSize: filter === "all" ? "21px" : "none", fontWeight: filter === "all" ? "700" : "500" }} className="text-lg">All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setFilter("important") }} style={{ fontSize: filter === "important" ? "21px" : "none", fontWeight: filter === "important" ? "700" : "500" }} className="text-lg">Important</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setFilter("others") }} style={{ fontSize: filter === "others" ? "21px" : "none", fontWeight: filter === "others" ? "700" : "500" }} className="text-lg">Others</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <MdLogout className="text-4xl mobile:text-[33px] cursor-pointer hover:scale-125 transition-all ease-in-out duration-150" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to logout?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => signOut()}>Logout</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="flex flex-col gap-y-5 mobile:w-full mobile:justify-center mobile:items-center">
          {
            todos?.map((item, i) => {
              return (
                <div key={i} style={{ borderWidth: item.isImportant ? "4px" : "2px", borderColor: item.isImportant ? "#00417a" : "" }} className="w-[600px] h-12 flex items-center justify-between px-4 mobile:w-[90%] rounded-lg">
                  <h3 className="w-[80%] text-lg">{item.content}</h3>
                  <div className="flex gap-x-2">
                    <MdDelete key={i} onClick={() => onClickDeleteHandler(i)} className="text-3xl text-red-600 cursor-pointer mobile:text-2xl hover:scale-110 transition-all ease-in-out duration-100" />
                    <AlertDialog>
                      <AlertDialogTrigger><MdEdit key={i} onClick={() => onClickEditHandler(i)} className="text-3xl text-green-500 cursor-pointer mobile:text-2xl hover:scale-110 transition-all ease-in-out duration-100" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-2xl font-bold">Update Your Todo:</AlertDialogTitle>
                          <Input value={editedTodo.content} key={i} onChange={(e) => onChangeEditHandler(e, i)} className="text-lg h-12" />
                          <div className="flex gap-x-2 items-center ml-2">
                            <input onChange={(e: any) => { setEditedTodo({ ...editedTodo, isImportant: e.target.checked }) }} checked={editedTodo.isImportant} id="checkbox2" name="checkbox2" type="checkbox" className="h-4 w-4 accent-black" />
                            <label className="font-semibold" htmlFor="checkbox2">Mark as Important</label>
                          </div>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <div className="flex gap-x-3 mobile:justify-center">
                            <AlertDialogCancel className="text-lg w-28 h-10">Cancel</AlertDialogCancel>
                            <AlertDialogAction key={i} onClick={() => onClickUpdateHandler(i)} className="text-lg w-28 h-10 mobile:mt-2">Update</AlertDialogAction>
                          </div>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )
            })
          }
        </div>
      </main>
    </div>
  )
}

export default Page

