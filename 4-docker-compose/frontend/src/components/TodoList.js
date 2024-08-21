import React from 'react'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0,
    }
  }

  handleActive(index) {
    this.setState({
      activeIndex: index,
    })
  }

  renderTodos(todos) {
    return (
      <ul className='list-group'>
        {todos.map(({ text, id }, i) => (
          <li
            className={
              'list-group-item cursor-pointer d-flex justify-content-between ' +
              (i === this.state.activeIndex ? 'active' : '')
            }
            key={i}
            onClick={() => {
              this.handleActive(i)
            }}
          >
            <span>{text}</span>
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => {
                this.props.deleteTodo(id)
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    let { todos } = this.props
    return todos.length > 0 ? (
      this.renderTodos(todos)
    ) : (
      <div className='alert alert-primary' role='alert'>
        No Todos to display
      </div>
    )
  }
}
