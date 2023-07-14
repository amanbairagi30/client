import { Button, Divider, Form, Input, Tabs, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { SetLoader } from "../redux/loadersSlice"
import { AddTask, GetAllTask } from '../apicalls/task'
import Todo from './Todo'
import Calendar from './Calendar'
import Progress_bar from './ProgressBar'
import { GetContribution, SaveCalendarContribution } from '../apicalls/contribution'
// import moment from "moment"

const rules = [
    {
        required: true,
        message: "required"
    }
]

const AddTodo = () => {
    const dispatch = useDispatch()
    const [todo, setTodo] = React.useState([]);
    const [save, setSave] = React.useState(false);
    // const [date, setDate] = useState("")
    const [todayDate, setTodayDate] = useState(null)
    const [data, setData] = useState([])
    const [completionPercentage, setCompletionPercentage] = React.useState(0);

    const { user } = useSelector((state) => state.users)


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

    const getTodo = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetAllTask({
                userId: user._id
            });
            dispatch(SetLoader(false))
            if (response.success) {
                setTodo(response.data)
                const completedTasks = response.data.filter(task => task.completed);
                const percentage = (completedTasks.length / response.data.length) * 100;
                setCompletionPercentage(percentage.toFixed(2));
                // message.success("Data Fetched Successfully")
            } else {
                message.error("Something went wrong , try refreshing the page");
            }

        } catch (error) {
            message.error(error.message);
        }
    }



    const SaveContribution = async (completionPercentage) => {
        try {
            dispatch(SetLoader(true));
            const response = await SaveCalendarContribution(completionPercentage)
            dispatch(SetLoader(false));

            if (response.success) {
                // const dateString = response.data.date;
                // const dateParts = dateString.split('T')[0];
                // const dateNumber = parseInt(dateParts.split('-')[2], 10);
                // console.log(dateNumber)
                // setData(response.data.completedData)
                // setTodayDate(dateNumber)
                message.success(response.message)
                // setSave(true)
                await GetContInfo()
                // message.success(response.message + " and " + response.data.date + " and " + dateString)

            } else {
                message.error(response.message)
            }

        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    // getting info
    const GetContInfo = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetContribution({
                userId: user._id
            });
            dispatch(SetLoader(false))

            if (response.success) {
                console.log("get Contribution :")
                // console.log(data)
                setData(response.data)
                console.log(response.data)
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
        // if(completionPercentage >= 80){
        //     // alert("inside if useff")
        //     SaveContribution(completionPercentage);
        // }
        GetContInfo();
    }, [])

    const checkBtnStatus = data.some((item) => new Date(item.date).getDate() === new Date().getDate());

    return (
        <div className='text-white'>
            <div className=' h-fit items-center gap-[5rem] p-4 border border-solid border-black grid md:grid-cols-2 grid-cols-1  '>
                <div className='w-full'>

                    <h1 className='text-center mt-2 text-2xl'>Target for Today</h1>
                    <div className='flex items-center  justify-center h-fit m-0 p-0 border-black'>

                        <Progress_bar bgcolor={(completionPercentage >= 80 ? "bg-green-500 text-white" : "bg-yellow-400 ")} progress={completionPercentage === "NaN" ? "0" : completionPercentage} height={20} />
                    </div>
                    <div className="m-auto flex flex-col text-white  px-4">
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            className='w-full'
                        >
                            <Form.Item label="" style={{ color: 'white' }} name={"title"} rules={rules}>
                                <Input placeholder='Title?' className='placeholder-gray-500 placeholder:font-semibold text-white border-none rounded-md' style={{ backgroundColor: '#3e3e3e' }} />
                            </Form.Item>
                            <Form.Item label="" name={"description"} rules={rules}>
                                <Input placeholder='Description?' className='placeholder-gray-500 placeholder:font-semibold text-white border-none rounded-md' style={{ backgroundColor: '#3e3e3e' }} />
                            </Form.Item>


                            <Button type='primary' className='bg-sky-500 border-none hover:bg-gray-900 w-[5rem]' block htmlType='submit'>Set Target</Button>


                        </Form>
                        <button disabled={checkBtnStatus} title={checkBtnStatus ? "You have submitted today's progress" : "Save your progress for today, but after submitiing you will not able to submit again for today"} className={`border -border-solid px-2 w-full mt-4 h-[2rem] ${checkBtnStatus ? `cursor-not-allowed opacity-20` : `hover:bg-white hover:text-black`} hover:transition-all duration-200 ease-in-out  border-white`} onClick={() => SaveContribution(completionPercentage)}>Save Progress</button>
                    </div>
                </div>
                <div className='w-full  p-4 mr-4 flex flex-col items-center justify-center'>

                    <div className='!w-full  py-4 flex-wrap  !h-full flex items-center justify-center gap-[4rem]'>
                        <div className='bg-[#282828] rounded-md !w-[15rem] !h-fit'>
                            <Calendar contributionData={data} dbDate={todayDate} completedData={data} />
                        </div>
                        <div className='flex flex-col h-full items-center gap-[3rem]'>
                            <div className='flex justify-between items-center border border-dashed border-white  w-[15rem] h-[5rem] p-4'>
                                <span>Total Active Days</span>
                                <h1 className='text-3xl bg-[#3e3e3e] text-white p-2 px-4 rounded-md'>{data.length}</h1>
                            </div>
                            <div className='flex justify-between items-center border border-dashed border-white  w-[15rem] h-[5rem] p-4'>
                                <span>Total Successfull Days</span>
                                <h1 className='text-3xl bg-green-600 text-white p-2 px-4 rounded-md'>{data.filter((contribution) => contribution.completedData >= 80).length}</h1>
                            </div>


                            {/* <div className='flex flex-col  justify-center items-center border border-dashed border-black w-[15rem] h-[5rem]'>
                                <h1>June 2023</h1>
                                Max. Streak  : 26 days
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <Divider dashed />
            {/* for todos which are going to be mapped */}
            <Tabs defaultActiveKey='1' style={{ color: "white" }}>
                <Tabs.TabPane tab="Pending" key="1">
                    <Todo todo={todo} check={1} getTodo={getTodo} setTodo={setTodo} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Completed" key="2">
                    <Todo todo={todo} check={2} getTodo={getTodo} setTodo={setTodo} />
                </Tabs.TabPane>
            </Tabs>

        </div>
    )
}

export default AddTodo
