import { Button, Form, Input } from 'antd'
import React from 'react'

const rules = [
    {
        required: true,
        message: "required"
    }
]

const AddTodo = () => {

    const onFinish = () => {

    }

    return (
        <div className=' h-fit items-center gap-[5rem] p-4 border border-solid border-black grid md:grid-cols-2 grid-cols-1  '>
            <div className='w-full'>

                <h1 className='text-center mt-2 text-2xl'>Todo</h1>
                <div className="m-auto flex  px-4">
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        className='w-full'
                    >
                        <Form.Item label="Title : " name={"title"} rules={rules}>
                            <Input placeholder='Title?' />
                        </Form.Item>
                        <Form.Item label="Description : " name={"description"} rules={rules}>
                            <Input placeholder='Description?' />
                        </Form.Item>


                        <Button type='primary' className='bg-black hover:bg-gray-900' block htmlType='submit'>Set Target</Button>

                    </Form>
                </div>
            </div>
            <div className='w-full  p-4 mr-4 flex flex-col items-center justify-center'>

                <div className='!w-full border border-dashed border-black py-4 flex-wrap  !h-full flex items-center justify-center gap-[4rem]'>
                    <div className='bg-gray-200 !w-[15rem] !h-[18rem]'>26</div>
                    <div className='flex flex-col h-full items-center gap-[3rem]'>
                        <div className='flex flex-col justify-center items-center border border-dashed border-black w-[15rem] h-[5rem]'>
                            <h1>June 2023</h1>
                            Max. Streak  : 26 days
                        </div>
                        <div className='flex flex-col  justify-center items-center border border-dashed border-black w-[15rem] h-[5rem]'>
                            <h1>June 2023</h1>
                            Max. Streak  : 26 days
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTodo
