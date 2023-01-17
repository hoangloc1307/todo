import { ToDo } from '../../@type/todo.type'
import style from './todoList.module.scss'

interface TodoListProps {
  taskDone?: boolean
  todos: ToDo[]
  onChangeToDo: (id: string) => void
  onStartEditToDo: (todo: ToDo) => void
  onDeleteToDo: (id: string) => void
}

function TodoList(props: TodoListProps) {
  const { taskDone, todos, onChangeToDo, onStartEditToDo, onDeleteToDo } = props

  return (
    <div>
      <h2 className={style.title}>{taskDone ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <div className={style.tasks}>
        {todos.map((todo) => (
          <div className={`${style.task} ${todo.done && style.taskDone}`} key={todo.id}>
            <input
              type='checkbox'
              className={style.taskCheckbox}
              checked={todo.done}
              onChange={() => onChangeToDo(todo.id)}
            />
            <span className={style.taskName}>{todo.name}</span>
            <div className={style.taskAction}>
              <button className={style.taskButton} onClick={() => onStartEditToDo(todo)}>
                📝
              </button>
              <button className={style.taskButton} onClick={() => onDeleteToDo(todo.id)}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoList
