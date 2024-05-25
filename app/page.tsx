"use client"
import { todoType } from "./Types/componentsTypes";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
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
import { IoSunnyOutline } from "react-icons/io5";

const Page = () => {

  const [theme1, setTheme1] = useState(false)

  const [todo, setTodo] = useState<todoType>({
    todo: "",
    isImportant: false
  })
  const [todoToBeEdited, setTodoToBeEdited] = useState<todoType>({
    todo: "",
    isImportant: false
  })

  const [todos, setTodos] = useState<todoType[]>([{
    todo: "",
    isImportant: false
  }])
  const [todosToBeDisplayed, setTodosToBeDisplayed] = useState<todoType[]>([todo])

  const [checkbox1, setCheckBox1] = useState<boolean>(false)
  const [checkbox2, setCheckBox2] = useState<boolean>(false)

  const { setTheme } = useTheme()

  const onChangeHandler = (event: any, name: string) => {
    if (event.target.name === "todo" || event.target.name === "checkbox1") {
      if (event.target.name === "todo") {
        setTodo({
          ...todo,
          todo: event.target.value,
        })
      }
      else if (event.target.name === "checkbox1") {
        setTodo({
          ...todo,
          isImportant: event.target.checked,
        })
      }
    }
    else if (event.target.name === "todoToBeEdited" || event.target.name === "checkbox2") {
      if (event.target.name === "todoToBeEdited") {
        setTodoToBeEdited({
          ...todoToBeEdited,
          todo: event.target.value,
        })
      }
      else if (event.target.name === "checkbox2") {
        setTodoToBeEdited({
          ...todoToBeEdited,
          isImportant: event.target.checked
        })
      }
    }
  }
  const onClickHandler = () => {
    if (todo.todo) {

      setTodos([...todos, todo])
      setTodosToBeDisplayed([...todos, todo])
      setCheckBox2(checkbox1)
      setCheckBox1(false)
      setTodo({
        todo: "",
        isImportant: false
      })
    }
    else {
      alert("Please Enter a Todo!")
    }
  }
  const onClickDeleteHandler = (index: number) => {
    setTodos(todos.filter((item, i) => (index !== i ? item : false)))
    setTodosToBeDisplayed(todos.filter((item, i) => (index !== i ? item : false)))
  }
  const onClickEditHandler = (index: number) => {
    setTodoToBeEdited(todos[index])
  }
  const onClickUpdateHandler = (index: number) => {
    setTodos(todos.map((item, i) => (index === i ? todoToBeEdited : item)))
    setTodosToBeDisplayed(todos.map((item, i) => (index === i ? todoToBeEdited : item)))
  }
  const onClickCheckbox1 = () => {
    setCheckBox1(!checkbox1)
  }
  const onClickCheckbox2 = (index: number) => {
    setTodos(todos.map((item, i) => {
      if (index === i) {
        setCheckBox2(!checkbox2)
        return { ...item, isImportant: checkbox2 }
      }
      else {
        return item
      }
    }))
    setTodosToBeDisplayed(todos.map((item, i) => {
      if (index === i) {
        setCheckBox2(!checkbox2)
        return { ...item, isImportant: checkbox2 }
      }
      else {
        return item
      }
    }))
  }

  const onClickAll = () => {
    setTodosToBeDisplayed(todos)
  }
  const onClickImportant = () => {
    setTodosToBeDisplayed(todos.filter((item, i) => {
      if (i === 0) {
        if (item.isImportant == false) {
          return item
        }
      }
      else {
        if (item.isImportant == true) {
          return item
        }
      }
    }))
  }
  const onClickOthers = () => {
    console.log(todos);
    setTodosToBeDisplayed(todos.filter((item) => item.isImportant === false ? item : false))
  }

  return (
    <main className="flex flex-col items-center gap-y-8 px-5">
      <h1 className="text-4xl font-extrabold mt-16 text-center">Todo List App</h1>
      <div className="flex justify-center gap-x-5 w-full mt-5 mobile:gap-x-0 mobile:flex-col mobile:items-center mobile:gap-y-5">
        <div className="flex flex-col gap-y-2 mobile:w-full">
          <Input name="todo" onChange={(event: any) => onChangeHandler(event, "todo")} value={todo.todo} placeholder="Enter Your Todo" className="w-[500px] h-12 text-lg mobile:w-[90%] mobile:h-10 mobile:mx-auto" />
          <div className="flex gap-x-2 items-center ml-2 mobile:ml-[6vw]">
            <input style={{ accentColor: theme1 ? "white" : "black" }} id="checkbox1" onClick={onClickCheckbox1} checked={checkbox1} name="checkbox1" type="checkbox" onChange={(event) => onChangeHandler(event, "todo")} className="h-4 w-4" /><label className="font-semibold mobile:w-[150px]" htmlFor="checkbox1">Mark as Important</label>
          </div>
        </div>
        <Button onClick={onClickHandler} className="w-28 h-12 text-lg mobile:text-sm mobile:w-[90%] mobile:h-10">Add todo</Button>
      </div>
      <h2 className="text-3xl font-bold text-center">My Todo List</h2>
      <div style={{ backgroundColor: !theme1 ? "black" : "white" }} className="w-[700px] h-1 mobile:w-[95%] mobile:px-1"></div>
      <div className="w-[700px] flex justify-end gap-x-5 relative bottom-2 mobile:w-[95%]">
        <div className="relative">
          <Sun style={{ display: !theme1 ? "block" : "block" }} onClick={() => { setTheme("dark"); setTheme1(true) }} className="h-[2.3rem] w-[2.3rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mobile:h-7 mobile:w-7 cursor-pointer" />
          <Moon style={{ display: !theme1 ? "block" : "block" }} onClick={() => { setTheme("light"); setTheme1(false) }} className="absolute top-0 h-[2.3rem] w-[2.3rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mobile:h-7 mobile:w-7 cursor-pointer" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger><FaFilter className="text-3xl mobile:text-2xl" /></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onClickAll} className="text-lg font-bold">All</DropdownMenuItem>
            <DropdownMenuItem onClick={onClickImportant} className="text-lg">Important</DropdownMenuItem>
            <DropdownMenuItem onClick={onClickOthers} className="text-lg">Others</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-y-5 mobile:w-full mobile:justify-center mobile:items-center">
        {
          todosToBeDisplayed.map((item, i) => {
            if (i !== 0) {
              return (
                <div style={{ borderColor: item.isImportant ? "#01579B" : "gray" }} key={i} className="w-[600px] h-12 border-2 flex items-center justify-between px-4 mobile:w-[90%] rounded-lg">
                  <h3 className="w-[80%] text-lg">{item.todo}</h3>
                  <div className="flex gap-x-2">
                    <MdDelete onClick={() => onClickDeleteHandler(i)} key={i} className="text-3xl text-red-600 cursor-pointer mobile:text-2xl hover:scale-110 transition-all ease-in-out duration-100" />
                    <AlertDialog>
                      <AlertDialogTrigger><MdEdit onClick={() => onClickEditHandler(i)} key={i} className="text-3xl text-green-500 cursor-pointer mobile:text-2xl hover:scale-110 transition-all ease-in-out duration-100" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-2xl font-bold">Update Your Todo:</AlertDialogTitle>
                          <Input name="todoToBeEdited" value={todoToBeEdited.todo} key={i} onChange={(event: any) => onChangeHandler(event, "todoToBeEdited")} className="text-lg h-12" />
                          <div className="flex gap-x-2 items-center ml-2">
                            <input id="checkbox2" name="checkbox2" checked={todos[i].isImportant} type="checkbox" onClick={() => onClickCheckbox2(i)} onChange={(event) => onChangeHandler(event, "todoToBeEdited")} className="h-4 w-4 accent-black" />
                            <label className="font-semibold" htmlFor="checkbox2">Mark as Important</label>
                          </div>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <div className="flex gap-x-3 mobile:justify-center">
                            <AlertDialogCancel className="text-lg w-28 h-10">Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onClickUpdateHandler(i)} className="text-lg w-28 h-10 mobile:mt-2">Update</AlertDialogAction>
                          </div>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    </main>
  )
}

export default Page