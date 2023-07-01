import { Button, Divider, Form, Input, Tabs, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { SetLoader } from "../redux/loadersSlice"
import { AddTask, GetAllTask } from '../apicalls/task'
import Todo from './Todo'

const rules = [
    {
        required: true,
        message: "required"
    }
]

const AddTodo = () => {
    const dispatch = useDispatch()
    const [todo, setTodo] = React.useState([]);


    const getTodo = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetAllTask();
            dispatch(SetLoader(false))
            if (response.success) {
                setTodo(response.data)
                // message.success("Data Fetched Successfully")
            } else {
                message.error("Something went wrong , try refreshing the page");
            }

        } catch (error) {
            message.error(error.message);
        }
    }

    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true))
            const response = await AddTask(values);
            dispatch(SetLoader(false))

            if (response.success) {
                message.success(response.message);
                await getTodo();
            } else {
                message.error(response.message)
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
        <div>
            <div className=' h-fit items-center gap-[5rem] p-4 border border-solid border-black grid md:grid-cols-2 grid-cols-1  '>
                <div className='w-full'>

                    <h1 className='text-center mt-2 text-2xl'>Target for Today</h1>
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
            <Divider dashed />
            {/* for todos which are going to be mapped */}
            <Tabs defaultActiveKey='1' >
                <Tabs.TabPane tab="Pending" key="1">
                    <Todo todo={todo} check={1} getTodo = {getTodo} setTodo={setTodo}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Completed" key="2">
                    <Todo todo={todo} check={2} getTodo = {getTodo} setTodo={setTodo}/>
                </Tabs.TabPane>
            </Tabs>

        </div>
    )
}

export default AddTodo
