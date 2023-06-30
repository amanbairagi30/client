import React, { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
// import { RegisterUser } from '../../apicalls/users'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'
import { RegisterUser } from '../../apicalls/users'

const rules = [
    {
        required: true,
        message: "required"
    }
]

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[msg , setMsg] = React.useState("");


    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            const response = await RegisterUser(values);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message)
                setMsg(response.message)
                // navigate("/login")
            } else {
                throw new Error(response.message);
            }

        } catch (error) {
            dispatch(SetLoader(false));

            message.error(error.message);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/")
        }
    }, [])

    return (
        <div className='h-screen  flex justify-center items-center bg-[#252424]'>
            <div className="bg-white p-5 w-[500px] border border-solid rounded-lg border-black">
                <h1 className="text-primary text-center text-2xl font-semibold my-4">
                    Consistency Maintainer <span className='text-gray-500'>Register</span>
                </h1>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item label="Name : " name={"name"} rules={rules}>
                        <Input placeholder='Name?' />
                    </Form.Item>
                    <Form.Item label="Email : " name={"email"} rules={rules}>
                        <Input placeholder='Email?' />
                    </Form.Item>
                    <Form.Item label="Password : " name={"password"} rules={rules}>
                        <Input type='password' placeholder='Password?' />
                    </Form.Item>

                    {msg && <div className='bg-green-300 text-green-800 my-2 p-2 rounded-md'>{msg}</div>}

                    <Button type='primary' className='bg-black hover:bg-gray-900' block htmlType='submit'>Register</Button>


                    <div className="mt-5 text-center">
                        <span className='text-gray-500'>
                            Already have an account ? <Link to="/login" className='text-primary'>Login</Link>
                        </span>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default Register
