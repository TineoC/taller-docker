import axios from '../axios'

export async function fetchTodos() {
  const { data } = await axios.get('/')

  return data.data
}

export async function addTodo(text: string) {
  const { data } = await axios.post('/todos', { text })

  return data.data
}

export async function deleteTodo(todoId: string) {
  const { data } = await axios.delete(`/todos/${todoId}`)

  return data.data
}
