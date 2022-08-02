import Backdrop from './components/Backdrop.js';
import Todo from './components/Todo.js'
import Modal from './components/Modal.js'

function App() {
  return <div>
    <h1>My todos</h1>
    <Todo text='Learn React'/>
    <Todo text='Eat bread'/>
    <Todo text='Go workout' />
    <Modal />
    <Backdrop />
  </div>;
}


export default App;