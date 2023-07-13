import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { SetLoader } from "../redux/loadersSlice"
import { DeleteTask, GetAllTask, UpdateTask } from '../apicalls/task';
import { message } from 'antd';


const Todo = ({ todo, check, getTodo }) => {
    const remainingTasks = todo.filter((task) => !task.completed);
    const completedTasks = todo.filter((task) => task.completed);
    const dispatch = useDispatch();

    const updateCheck = async (id) => {
        try {

            dispatch(SetLoader(true))
            const response = await UpdateTask(id);
            dispatch(SetLoader(false))

            if (response.success) {
                await getTodo();
                message.success(response.message);

            } else {
                message.error(response.message);
            }

        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message);
        }
    }
    const deleteTask = async (id) => {
        try {

            dispatch(SetLoader(true))
            const response = await DeleteTask(id);
            dispatch(SetLoader(false))

            if (response.success) {
                getTodo();
                message.success(response.message);

            } else {
                message.error(response.message);
            }

        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message);
        }
    }

    useEffect(() => {
        getTodo();
        
    }, [])

    return (
        <>
            {check === 1 ? <div>Task Remaining : {remainingTasks.length}</div> : <div>Task Completed : {completedTasks.length}</div>}
            {check === 1
                ? todo.map((items) =>
                    !items.completed ? (

                        <div className='flex todo hover:transition-all hover:scale-[1.01] hover:duration-200 rounded-lg  border-[0.5px] my-4 border-solid border-black justify-between items-center text-base' key={items.id}>
                            <div className='md:w-[80%] w-[60%] p-4 flex flex-col flex-wrap'>
                                <div>
                                    <span className='text-xl font-semibold'>{items.title}</span>
                                </div>
                                <div className='mt-4'>{items.description}</div>
                            </div>
                            <div className='checked'>
                                <input type='checkbox' className='w-[4rem] bg-green-400 mr-2' name='' id='' onClick={() => updateCheck(items._id)} />
                            </div>
                            <div className='cursor-pointer bg-red-600 mr-4 py-2 px-4 rounded-md text-white' onClick={() => deleteTask(items._id)}>
                                Delete
                            </div>
                        </div>


                    ) : null

                )
                : todo.map((items) =>
                    items.completed ? (

                        <div className='todo flex border my-4 border-solid hover:transition-all hover:scale-[1.01] hover:duration-200 bg-green-600 text-white rounded-lg justify-around items-center text-base' key={items.id}>
                            <div className='md:w-[80%] w-[60%] p-4 flex flex-col flex-wrap '>
                                <div>
                                    <span className='text-xl font-semibold'>{items.title}</span>
                                </div>
                                <div className='mt-4'>{items.description}</div>
                            </div>
                            <div className='checked'>
                                <input type='checkbox' className='w-[4rem] mr-2' name='' id='' checked={!!items.completed}  />
                            </div>
                            <div className='cursor-pointer bg-red-600 mr-4 py-2 px-4 rounded-md text-white ml-2' onClick={() => deleteTask(items._id)}>
                                Delete
                            </div>
                        </div>
                    ) : null
                )}
        </>
    )
}

export default Todo
