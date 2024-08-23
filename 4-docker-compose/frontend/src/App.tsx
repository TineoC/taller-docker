import { FormEvent, FormEventHandler, useEffect, useState } from 'react'
import './App.css'
import { Button } from '@headlessui/react'
import { Input } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/20/solid'
import { fetchTodos, addTodo, deleteTodo } from './api/toDos'

type Todo = {
  id: string | number
  text: string
}

function App() {
  const [toDo, setToDo] = useState<string>('')
  const [toDos, setToDos] = useState<Todo[]>([])

  useEffect(() => {
    fetchTodos().then((data) => {
      setToDos(data)
    })
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (toDo.trim() === '') return

    const temporaryId = Date.now()
    const previousToDos = [...toDos]
    const newToDo = { id: temporaryId, text: toDo }

    setToDos([...toDos, newToDo])
    setToDo('')

    try {
      const addedToDo = await addTodo(toDo)
      // Replace the temporary toDo with the one from the API response
      setToDos((currentToDos) =>
        currentToDos.map((todo) => (todo.id === temporaryId ? addedToDo : todo))
      )
    } catch (error) {
      // Revert to the previous state if the API call fails
      setToDos(previousToDos)
      console.error('Failed to add todo:', error)
    }
  }

  const handleDelete = async (id: string) => {
    const newToDos = toDos.filter(({ id: toDoId }) => toDoId !== id)
    setToDos(newToDos)

    try {
      await deleteTodo(id)
    } catch (error) {
      // Revert to the previous state if the API call fails
      setToDos([
        ...toDos,
        {
          id,
          text: newToDos.find(({ id: toDoId }) => toDoId === id)?.text || '',
        },
      ])
      console.error('Failed to delete todo:', error)
    }
  }

  return (
    <main className='w-full h-screen flex justify-center items-center flex-col text-sky-600'>
      <article className='flex flex-col items-center gap-y-3 border rounded-lg p-3'>
        <img
          src='https://imgs.search.brave.com/ZtGht1pPK2AhRAFDeV-Xz9PlVOnznlJzMrbT_b8_FT0/rs:fit:860:0:0:0/g:ce/aHR0cDovL2FsbHZl/Y3RvcmxvZ28uY29t/L2ltZy8yMDIyLzEy/L2Nsb3VkLW5hdGl2/ZS1jb21wdXRpbmct/Zm91bmRhdGlvbi1j/bmNmLWxvZ28tdmVj/dG9yLnBuZw'
          width='200'
          // height='100'
        />
        <h1 className='font-bold text-2xl'>Taller Docker Compose</h1>
        <h4 className='font-semibold text-sm'>Cloud Native Santo Domingo</h4>

        <AddTodo toDo={toDo} setToDo={setToDo} handleSubmit={handleSubmit} />
        <ListTodos toDos={toDos} onDelete={handleDelete} />
      </article>
    </main>
  )
}

function AddTodo(props: {
  toDo: string
  setToDo: (value: string) => void
  handleSubmit: FormEventHandler<HTMLFormElement>
}) {
  const { toDo, setToDo, handleSubmit } = props

  return (
    <section>
      <form className='flex flex-row gap-x-3' onSubmit={handleSubmit}>
        <Input
          className='border rounded-lg p-2'
          name='toDo'
          placeholder='Add Todo...'
          type='text'
          value={toDo}
          onChange={(event) => {
            const value = event.target.value
            setToDo(value)
          }}
        />
        <Button
          className='rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 font-bold disabled:opacity-50'
          type='submit'
          disabled={toDo.trim() === ''}
        >
          Add
        </Button>
      </form>
    </section>
  )
}

function ListTodos(props: { toDos?: Todo[]; onDelete: (id: string) => void }) {
  const { toDos, onDelete } = props

  if (!toDos || toDos.length === 0) {
    return <p className='text-sm'>No todos yet...</p>
  }

  return (
    <section className='flex flex-col gap-y-2 w-full'>
      {toDos.map((toDo, index) => (
        <ToDo key={index} toDo={toDo} onDelete={onDelete} />
      ))}
    </section>
  )
}

function ToDo(props: { toDo: Todo; onDelete: (id: string) => void }) {
  const { toDo, onDelete } = props

  return (
    <div className='text-sm flex justify-between py-2 px-3 bg-sky-200 text-sky-600 font-bold rounded-lg w-full'>
      {toDo.text}

      <aside className='py-auto'>
        <Button
          className='rounded bg-red-600 disabled:opacity-50 text-white py-1 px-2 text-xs font-bold'
          disabled={!toDo.id}
          onClick={() => {
            if (!toDo.id) return
            onDelete(toDo.id as string)
          }}
        >
          <TrashIcon className='h-4 w-4' />
        </Button>
      </aside>
    </div>
  )
}

export default App
