import { Divider, Tabs } from 'antd'
import React from 'react'
import AddTodo from '../../components/AddTodo'
import Todo from '../../components/Todo'

const Home = () => {
  return (
    <>

      {/* for setting and creating todos */}
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="Your Todos" key="1">
          <AddTodo />


          <Divider dashed />
          {/* for todos which are going to be mapped */}
          <Tabs defaultActiveKey='1' >
            <Tabs.TabPane tab="Pending" key="1">
              <Todo />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Completed" key="2">
              <Todo />
            </Tabs.TabPane>
          </Tabs>



        </Tabs.TabPane>
        <Tabs.TabPane tab="Graph and Growth" key="2">
          <h1>Graph</h1>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Coins and Achievements" key="3">
          <h1>Coins</h1>
        </Tabs.TabPane>
      </Tabs>


    </>
  )
}

export default Home
