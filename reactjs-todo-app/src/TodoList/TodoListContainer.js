import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { TodoListContext } from 'context'

import {
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL_TODOS,
  CLEAR_COMPLETED_TODOS
} from 'services/TodoService'

import Component from './TodoList'

export const TodoListContainer = restProps => {
  const [filter, setFilter] = useState('showAll')

  /// get completed todo list with filter
  const { data: { todos = [] } = {}, refetch } = useQuery(GET_TODOS, {
    variables: {
      filter //
    }
  })

  const [addTodoMutation] = useMutation(ADD_TODO)
  const [updateTodoMutation] = useMutation(UPDATE_TODO)
  const [toggleTodoMutation] = useMutation(TOGGLE_TODO)
  const [toggleAllTodosMutation] = useMutation(TOGGLE_ALL_TODOS)
  const [clearCompletedTodosMutation] = useMutation(CLEAR_COMPLETED_TODOS)

  const addTodo = async ({ name }) => {
    await addTodoMutation({
      variables: {
        name
      }
    })
    refetch()
  }

  const updateTodo = async ({ id, name }) => {
    await updateTodoMutation({
      variables: {
        id,
        name
      }
    })
  }

  const toggleTodo = async ({ id, isDone }) => {
    await toggleTodoMutation({
      variables: {
        id,
        isDone
      }
    })
  }

  const toggleAllTodos = isDone => {
    toggleAllTodosMutation({
      variables: {
        isDone
      }
    })
    refetch()
  }

  const clearCompletedTodos = () => {
    clearCompletedTodosMutation({

    })
    refetch()
  }

  const props = {
    todos,
    count: todos.length,
    addTodo,
    updateTodo,
    toggleTodo,
    toggleAllTodos,
    clearCompletedTodos,
    setFilter,
    filter
  }

  return (
    <TodoListContext.Provider value={props}>
      <Component {...restProps} />
    </TodoListContext.Provider>
  )
}

export default TodoListContainer
