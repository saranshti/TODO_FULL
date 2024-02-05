import React from 'react';
import moment from 'moment/moment'
import { ToastContainer, toast } from 'react-toastify';
import { deleteTodoApi, markTodoApi } from '../../services/api.js';

function Todo({todo,setRefreshList}){
    const handleDelete = async() => {
        const result = await deleteTodoApi({
            todo_id: todo._id
        })
        if(result.data.status===200){
            setRefreshList(new Date());
            toast('Deleted');

        }else{
            toast('Failed To delete');
        }
    }
    
    const handleMarkTodo = async() => {
        const result = await markTodoApi({
            todo_id: todo._id
        })
        if(result.data.status===200){
            setRefreshList(new Date());
            toast(result.data.message);

        }else{
            toast('Failed To Mark');
        }
    }

    return (
        <div className='col-sm-3 mx-4 my-2 alert bg-primary'>
            <div className='card-header'>
                {todo.iSCompleted ? 'Completed' : 'Not Completed'}
            </div>  
            <div className='card-body'>
                <h4 className='card-title'>
                {todo.desc}
                </h4>
                <p className='card-text'>{moment(todo.date).fromNow()}</p>
                
            </div>          
            <div className='actionButtons' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div className='deleteButtoon'>
                        <button style={{background:'red'}} onClick={handleDelete}>Delete</button>
                    </div>
                    <div className='markTodo'>
                        <button onClick={handleMarkTodo} style={{background:''}}>{todo.iSCompleted ? 'Mark Uncompleted' : 'Mark Completed'}</button>
                    </div>
                </div>
        </div>
    )
}

export default Todo;