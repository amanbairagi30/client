import React, { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'
import { SendEmail } from '../apicalls/users'

const rules = [
    {
        required: true,
        message: "required"
    }
]

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [msg,setMsg] = React.useState("")

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await SendEmail(values);
      dispatch(SetLoader(false));
      
      if (response.success) {
        message.success(response.message)
        setMsg(response.message)
        // localStorage.setItem("token", response.data);
        // navigate("/")
      } else {
        throw new Error(response.message);
      }

    } catch (error) {
      dispatch(SetLoader(false));
      console.log(error)
      message.error(error.message);
    }
  }

//   useEffect(()=>{
//     if(localStorage.getItem("token")){
//       navigate("/")
//     }
//   },[])

  return (
    <div>
      <div className='h-screen bg-[#252424] flex justify-center items-center'>
        <div className="bg-white p-5 w-[500px]">
          <h1 className="text-primary text-2xl font-semibold text-center my-4">
            Consistency Maintainer <span className='text-gray-500'>Forget Password</span>
          </h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
          >

            <Form.Item label="Email : " name={"email"} rules={rules}>
              <Input placeholder='Email?' />
            </Form.Item>

            <div className="my-2 bg-green-300 text-green-800">{msg}</div>

            <Button type='primary' className='bg-black hover:bg-gray-900' block htmlType='submit'>Send Mail</Button>

            <div className="mt-5 text-center">
              <span className='text-gray-500'>
                <Link to="/login" className='text-primary underline'>Login Page</Link>
              </span>
            </div>
          </Form>
        </div>

      </div>
    </div>
  )
}

export default Login
