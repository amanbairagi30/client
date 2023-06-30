import React from 'react'

const Todo = () => {
    return (
        <div className='flex border my-4 border-solid border-black justify-between items-center text-base'>
            <div className='w-[80%] p-4 flex flex-col flex-wrap '>
                <div className='border-b-2  border-black border-dashed'>
                    <span className='mb-2'>Title</span> 
                </div>
                <div className='mt-4'>
                    Description
                </div>
            </div>
            <div className="checked">
                <input type="checkbox" className='w-[4rem]' name="" id="" />
            </div>
        </div>
    )
}

export default Todo
