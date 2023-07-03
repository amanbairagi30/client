import { Divider, Tabs } from 'antd'
import React from 'react'
import AddTodo from '../../components/AddTodo'
import Todo from '../../components/Todo'
import YearCalendar from '../../components/YearCalendar'

const Home = () => {
  return (
    <>

      {/* for setting and creating todos */}
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="Your Todos" key="1">
          <AddTodo />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Graph and Growth" key="2">
          <YearCalendar />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Coins and Achievements" key="3">
          <h1>Coins</h1>
        </Tabs.TabPane>
      </Tabs>


    </>
  )
}

export default Home
