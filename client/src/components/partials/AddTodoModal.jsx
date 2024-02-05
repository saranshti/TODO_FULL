import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { createTodoApi } from '../../services/api.js';
;

function AddTodoModal({ setRefreshList }) {
    const [todoDesc, setTodoDesc] = useState('');
    const handleTodoSubmit = async ()=>{
        console.log(todoDesc,'todoDesc');
        if(todoDesc === ''){
            toast('Todo is Required');
            setRefreshList(new Date());
            return;
        }

        const result = await createTodoApi({desc:todoDesc});
        
        if(result.status===200){
            toast('Todo Added');

        }else{
            toast(result.data.message);
        }
    }
  return (
    <div className='modal mt-5' id="exampleModal">
    <ToastContainer/>
        <div className='modal-dialog' role="document"> 
          <div className='modal-content'> 
            <div className='modal-header'> 
              <div className='modal-title'>
                Add New Todo
              </div>
              <button type="button" className='btn-close'
              data-bs-dismiss="modal"
              aria-label="close">
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='form-group'>
                <textarea name="" className='form-control' rows={3} onChange={(e)=>{setTodoDesc(e.target.value)}} placeholder='Write Todo...'></textarea>
              </div>
            </div>
            <div className='modal-footer'>
                <button className='btn btn-secondary' onClick={()=>{setTodoDesc(' ')}} data-bs-dismiss="modal">Close</button>
                <button className='btn btn-secondary' onClick={handleTodoSubmit} data-bs-dismiss="modal">Save Todo</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AddTodoModal
