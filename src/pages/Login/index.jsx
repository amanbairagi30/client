import React, { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import {LoginUser} from "../../apicalls/users"
import { useDispatch } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'

const rules = [
    {
        required: true,
        message: "required"
    }
]

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await LoginUser(values);
      dispatch(SetLoader(false));
      
      if (response.success) {
        message.success(response.message)
        localStorage.setItem("token", response.data);
        navigate("/")
      } else {
        throw new Error(response.message);
      }

    } catch (error) {
      dispatch(SetLoader(false));
      console.log(error)
      message.error(error.message);
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/")
    }
  },[])

  return (
    <div>
      <div className='h-screen bg-[#252424] flex justify-center items-center'>
        <div className="bg-white p-5 w-[500px]">
          <h1 className="text-primary text-2xl font-semibold text-center my-4">
            Consistency Maintainer <span className='text-gray-500'>Login</span>
          </h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
          >

            <Form.Item label="Email : " name={"email"} rules={rules}>
              <Input placeholder='Email?' />
            </Form.Item>
            <Form.Item label="Password : " name={"password"} rules={rules}>
              <Input type='password' placeholder='Password?'  rules={rules}/>
            </Form.Item>

            <Button type='primary' className='bg-black hover:bg-gray-900' block htmlType='submit'>Login</Button>


            <div className="mt-5 text-center">
              <span className='text-gray-500'>
                 <Link to="/forget-password" className='text-primary underline'>Forgot Password ?</Link>
              </span>
            </div>

            <div className="mt-5 text-center">
              <span className='text-gray-500'>
                Donot have an account ? <Link to="/register" className='text-primary underline'>Register</Link>
              </span>
            </div>
          </Form>
        </div>

      </div>
    </div>
  )
}

export default Login
