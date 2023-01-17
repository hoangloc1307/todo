import { useState } from 'react'
import { ToDo } from '../../@type/todo.type'
import style from './todoInput.module.scss'

interface TodoInputProps {
  currentToDo: ToDo | null
  addToDo: (name: string) => void
  onEditToDo: (name: string) => void
  onSaveEditToDo: () => void
}

function TodoInput(props: TodoInputProps) {
  const { currentToDo, addToDo, onEditToDo, onSaveEditToDo } = props

  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentToDo) {
      onSaveEditToDo()
      if (name) {
        setName('')
      }
    } else {
      addToDo(name)
      setName('')
    }
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentToDo) {
      onEditToDo(e.target.value)
    } else {
      setName(e.target.value)
    }
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        type='text'
        className={style.input}
        value={currentToDo ? currentToDo.name : name}
        onChange={handleChangeInput}
      />
      <button className={style.button} type='submit'>
        {currentToDo ? '✔' : '➕'}
      </button>
    </form>
  )
}

export default TodoInput
