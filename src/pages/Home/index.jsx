import { Divider, Tabs, message } from 'antd'
import React, { useEffect, useState } from 'react'
import AddTodo from '../../components/AddTodo'
import Todo from '../../components/Todo'
import YearCalendar from '../../components/YearCalendar'
import { GetContribution } from '../../apicalls/contribution'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'

const Home = () => {
  const { user } = useSelector((state) => state.users)
  const [data, setData] = useState([])
  const dispatch = useDispatch()


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
    // getTodo();
    // if(completionPercentage >= 80){
    //     // alert("inside if useff")
    //     SaveContribution(completionPercentage);
    // }
    GetContInfo();
  }, [])
  // useEffect(()=>{},[])
  return (
    <>
      <div>

        {/* for setting and creating todos */}
        <Tabs defaultActiveKey='1' style={{color : "white"}}>
          <Tabs.TabPane tab="Your Todos" key="1">
            <AddTodo />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Graph and Growth" key="2">
            <YearCalendar contributionData={data} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Coins and Achievements" key="3">
            <h1>Coins</h1>
          </Tabs.TabPane>
        </Tabs>

      </div>

    </>
  )
}

export default Home
