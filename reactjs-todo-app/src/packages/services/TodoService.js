import gql from 'graphql-tag'
//import { gql } from 'apollo-boost'

export const GET_ALL_TODOS = gql`
  query {
    getAllTodos {
      id
      isDone
      name
    }
  }
`
// get completed todo list
export const GET_TODOS = gql`
  query($filter: String!) {
    todos(filter: $filter) {
      id
      isDone
      name
    }
  }
`

export const ADD_TODO = gql`
  mutation($name: String!) {
    addTodo(name: $name) {
      id
      isDone
      name
    }
  }
`

export const UPDATE_TODO = gql`
  mutation($name: String!, $id: ID!) {
    updateTodo(name: $name, id: $id) {
      id
      isDone
      name
    }
  }
`
export const TOGGLE_TODO = gql`
  mutation($isDone: Boolean!, $id: ID!) {
    toggleTodo(isDone: $isDone, id: $id) {
      id
      isDone
      name
    }
  }
`

export const TOGGLE_ALL_TODOS = gql`
  mutation($isDone: Boolean!) {
    toggleAll(isDone: $isDone) {
      id
      isDone
      name
    }
  }
`

export const CLEAR_COMPLETED_TODOS = gql`
  mutation($isDone: Boolean) {
    clearCompletedTodo(isDone: $isDone) {
      id
      isDone
      name
    }
  }
`
