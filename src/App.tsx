
import './App.css'
import { Item } from './Components/Item'
import { useItems } from './hooks/useItems'
import { useSEO } from './hooks/useSEO'


export type ItemId =`${string}-${string}-${string}-${string}-${string}` 

export interface Item {
 id: ItemId
 timestamp: number
 text: string

}

function App() {
  const { items, addItem, RemoveItem } = useItems()

  useSEO({
    title: `[${items.length}] My Code Challenge`,
    description: "Add and Eliminate Elements from the List"
  })

  const handleSubmit =(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault

    const {elements} = event.currentTarget
    const input = elements.namedItem("item")
    const isInput = input instanceof HTMLInputElement
    if (! isInput || input == null ) return

    addItem(input.value)
    input.value = ''
  }

    const createHandleRemoveItem = (id: ItemId) => () => {
      RemoveItem(id)
    }


  return (
    <main>
    <aside>
    <h1>My Code Challenge</h1>
    <h2> Add and Eliminate Element from The List </h2>
    
      <form onSubmit={handleSubmit} aria-label='Add Elements to the List'>
        <label >
          Element to Add
          <input
          name='item'
          required
          type='text'
          placeholder='Video games'
          />
        </label>
        <button>Add Element to the List</button>
      </form>
    </aside>
    
    <section>
      <h2>List of Elements</h2>
       {
        items.length === 0 ? (
        <p>
          <strong>There are no elements in the list</strong>
        </p>
          ):(
          <ul>
            {
            items.map((item) => {
          return (
          <Item 
          {...item}
          handleClick={createHandleRemoveItem(item.id)}
           key={item.id} />
            )
          })
          }
        </ul>
        )
      }
    </section>
    </main>
  )
}

export default App
