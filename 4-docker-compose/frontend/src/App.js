import React from 'react'
import axios from 'axios'
import './App.scss'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
    }
  }

  componentDidMount() {
    axios
      .get('/api')
      .then((response) => {
        this.setState({
          todos: response.data.data,
        })
      })
      .catch((e) => console.log('Error : ', e))
  }

  handleAddTodo = (value) => {
    axios
      .post('/api/todos', { text: value })
      .then((response) => {
        const newTodo = { id: response.data.data.id, text: value }
        this.setState({
          todos: [...this.state.todos, newTodo],
        })
      })
      .catch((e) => console.log('Error : ', e))
  }

  deleteTodo = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then(() => {
        this.setState({
          todos: this.state.todos.filter(({ id: todoId }) => {
            return todoId !== id
          }),
        })
      })
      .catch((e) => console.error('Error : ', e))
  }

  render() {
    return (
      <div className='App container'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-12 col-sm-8 col-md-8 offset-md-2'>
              <h1>Taller Docker Compose</h1>
              <h4>Cloud Native Santo Domingo</h4>
              <div className='todo-app'>
                <AddTodo handleAddTodo={this.handleAddTodo} />
                <TodoList
                  todos={this.state.todos}
                  deleteTodo={this.deleteTodo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
