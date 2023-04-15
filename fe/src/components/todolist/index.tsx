import React, { useState, useEffect } from 'react'
import { TodoItemProps } from '@src/interfaces/todoList'

function TodoItem(props: TodoItemProps) {
  const { id, content, deleteCb } = props

  return (
    <>
      <div>id: {id}</div>
      <div>content: {content}</div>
      <div>
        <button
          onClick={(e) => {
            deleteCb()
          }}>
          delete
        </button>
      </div>
    </>
  )
}

function TodoList() {
  const [list, setList] = useState([] as TodoItemProps[])
  const [id, setId] = useState('')
  const [content, setContent] = useState('')

  const addTodo = ({ id, content }) => {
    setList([
      ...list,
      {
        id,
        content,
        deleteCb: () => {
          deleteTodo(id)
        },
      },
    ])
    setId('')
    setContent('')
  }

  const deleteTodo = (deleteId) => {
    setList(
      list.filter(({ id }) => {
        return id != deleteId
      })
    )
  }
}
