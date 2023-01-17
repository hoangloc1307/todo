import { useEffect, useState } from 'react'

import { ToDo } from '../../@type/todo.type'
import TodoInput from '../TodoInput'
import TodoList from '../TodoList'
import style from './todo.module.scss'

interface HandleNewToDos {
  (todos: ToDo[]): ToDo[]
}

const syncReactToLocal = (handleNewToDos: HandleNewToDos) => {
  const todoObj: ToDo[] = JSON.parse(localStorage.getItem('todos') || '[]')
  const newToDos = handleNewToDos(todoObj)
  localStorage.setItem('todos', JSON.stringify(newToDos))
}

function Todo() {
  const [todos, setTodos] = useState<ToDo[]>([])
  const [currentToDo, setCurrentToDo] = useState<ToDo | null>(null)

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('todos') || '[]'))
  }, [])

  const doneToDos = todos.filter((todo) => todo.done)
  const notDoneToDos = todos.filter((todo) => !todo.done)

  const addToDo = (name: string) => {
    if (name) {
      const todo = { name, done: false, id: new Date().toISOString() }
      const handler = (toDoObj: ToDo[]) => [...toDoObj, todo]
      syncReactToLocal(handler)
      setTodos(handler)
    }
  }

  const changeDoneToDo = (id: string) => {
    const handler = (toDoObj: ToDo[]) =>
      toDoObj.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done }
        }
        return todo
      })
    syncReactToLocal(handler)
    setTodos(handler)
  }

  const startEditToDo = (todo: ToDo) => {
    setCurrentToDo(todo)
  }

  const editToDo = (name: string) => {
    setCurrentToDo((prev) => {
      if (prev) {
        return { ...prev, name }
      }
      return null
    })
  }

  const saveEditToDo = () => {
    const handler = (toDoObj: ToDo[]) =>
      toDoObj.map((todo) => {
        if (todo.id === currentToDo?.id) {
          return currentToDo
        }
        return todo
      })
    syncReactToLocal(handler)
    setTodos(handler)
    setCurrentToDo(null)
  }

  const deleteToDo = (id: string) => {
    if (currentToDo) {
      setCurrentToDo(null)
    }
    const handler = (toDoObj: ToDo[]) => {
      const index = toDoObj.findIndex((todo) => todo.id === id)
      if (index > -1) {
        const result = [...toDoObj]
        result.splice(index, 1)
        return result
      }
      return toDoObj
    }
    syncReactToLocal(handler)
    setTodos(handler)
  }

  return (
    <div className={style.todo}>
      <h1 className={style.title}>Todo list with typescript</h1>
      <TodoInput addToDo={addToDo} currentToDo={currentToDo} onEditToDo={editToDo} onSaveEditToDo={saveEditToDo} />
      <TodoList
        todos={notDoneToDos}
        onChangeToDo={changeDoneToDo}
        onStartEditToDo={startEditToDo}
        onDeleteToDo={deleteToDo}
      />
      <TodoList
        taskDone
        todos={doneToDos}
        onChangeToDo={changeDoneToDo}
        onStartEditToDo={startEditToDo}
        onDeleteToDo={deleteToDo}
      />
    </div>
  )
}

export default Todo
