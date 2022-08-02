import { useState } from 'react';
import Backdrop from './Backdrop.js';
import Modal from './Modal.js';

function Todo(props) {
  const [ modalIsOpen, setModalIsOpen ] = useState(false); // 컴포넌트 안에 바로 쓰기

  function deleteHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }
  return (
    <div className='card'>
      <h2>{props.text}</h2>
      <div className='actions'>
        <button className='btn' onClick={deleteHandler}>Delete</button>
      </div>
      {modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={ closeModalHandler } /> }
      {modalIsOpen && <Backdrop onClick={ closeModalHandler } /> }
    </div>
  );
}

export default Todo;