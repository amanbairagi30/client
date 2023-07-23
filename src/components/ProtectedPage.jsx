
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

  const userFirstName = (user?.name?.split(" ")[0]) || "";


  const validateToken = async () => {

    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));

      if (response.success) {
        dispatch(SetUser(response.data))
        navigate("/")
        navigate("/")
        navigate("/")
      }
      else {
        navigate("/login")
        // message.error(response.message)
      }

    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login")
      // message.error(error.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      message.error("Please Login to Continue");
      navigate("/login")
    }

  }, [])
  return (

    user && (
      <div>
        {/* header */}
        <div className='flex justify-between gap-4 items-center bg-[#292a2e] p-5'>
          <div className='text-white cursor-pointer' onClick={() => { navigate("/") }}>
            <h1 className='text-2xl font-semibold'>Consistency</h1>
            <span>Maintainer</span>
            <div className='bg-sky-500 h-[0.2rem]'></div>
          </div>
          <div className='bg-white rounded-md py-2 px-1 flex items-center gap-8'>
            <div className='flex items-center gap-1'>
              <img className='w-8' src={user.profilePic} alt="" />
              <span className='underline cursor-pointer' onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                }
                else {
                  navigate("/admin");
                }
              }}>{userFirstName}</span>

            </div>
            <i className="text-md m-1 text-black ri-logout-box-r-line cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="p-5 bg-[#191919]">{children}</div>


      </div>
    )

  )
}

export default ProtectedPage
