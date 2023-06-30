
import React, { useEffect } from 'react'
import { GetCurrentUser } from '../apicalls/users';
import { Avatar, Badge, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../redux/loadersSlice';
import { SetUser } from '../redux/usersSlice';

const ProtectedPage = ({ children }) => {

  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {

    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));

      if (response.success) {
        dispatch(SetUser(response.data))
      }
      else {
        navigate("/login")
        message.error(response.message)
      }

    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login")
      message.error(error.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      // setTimeout(() => {
      //     window.location.reload();
      // }, 1000);


      // navigate(0)
      // window.location.reload()
      // window.location.reload(false)
    } else {
      message.error("Please Login to Continue");
      navigate("/login")
    }

  }, [])
  return (

    user && (
      <div>
        {/* header */}
        <div className='flex justify-between items-center bg-[#373535] p-5'>
          <div className='text-white cursor-pointer' onClick={() => { navigate("/") }}>
            <h1 className='text-2xl font-semibold'>Consistency</h1>
            <span>Maintainer</span>
            <div className='bg-orange-500 h-[0.2rem]'></div>
          </div>
          <div className='bg-white rounded-md py-2 px-5 flex items-center gap-8'>
            <div className='flex items-center gap-2'>
              <img className='w-8' src={user.profilePic} alt="" />
              <span className='underline cursor-pointer' onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                }
                else {
                  navigate("/admin");
                }
              }}>{user?.name}</span>

            </div>
            <i className="text-md text-black ri-logout-box-r-line cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="p-5">{children}</div>


      </div>
    )

  )
}

export default ProtectedPage
