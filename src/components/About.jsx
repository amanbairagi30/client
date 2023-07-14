import { Collapse, Space } from 'antd'
import React from 'react'

const About = () => {
  return (
    <div className='h-fit'>
      <div className='w-full text-justify'>
        <h1 className='text-3xl font-semibold leading-normal'>Welcome to <span className='border-b-2 p-1 border-sky-400'>Consistency Maintainer</span> 🙋‍♂️</h1>

        {/* Para 1 */}
        <div className='mt-6 text-base'>
          <span>What is Consistency Maintainer ? </span>
          <p className='mt-1'>
            Consistency Maintainer is a powerful web app that promotes consistency and productivity. It tracks your daily work attendance, ensuring you stay on top of your commitments. With its intuitive to-do list, you can easily manage and prioritize tasks. The app's progress visualization, like <span className='border-b-2 border-green-500'>GitHub/LeetCode's heatmap</span>, providing motivation and a sense of accomplishment as you see your consistent efforts pay off. Whether for work or personal goals, Consistency Maintainer is the ultimate tool for maintaining consistency and achieving success.
          </p>
        </div>

        <div className='w-full my-4'>

          <Space direction="vertical" className='w-[100%]'>
            <Collapse
            defaultActiveKey={[1]}
              className='bg-sky-400 border-none rounded-t-md font-semibold'
              items={[
                {
                  key: '1',
                  label: 'Why to use Consistency Maintainer ?',
                  children: <p className='font-medium'>
                    In the era of social media , the distraction for an individual is at its peak and we unconciously waste our time on social media as we have been getting dopamine pleasure by using them and it has become one of the reason for not maintaining consistency , but after using consistency maintainer you will able to

                    <ul className='mt-2'>
                      <li className='mt-2'>✅ Track work attendance and progress, stay accountable, and achieve success</li>
                      <li className='mt-2'>✅ Organize and prioritize tasks with an intuitive to-do list for increased focus and productivity.</li>
                      <li className='mt-2'>✅ Gain motivation and a sense of accomplishment by visually tracking productivity trends over time</li>
                      <li className='mt-2'>✅ Increase productivity by fostering consistency, providing effective task management, and promoting focus and organization through a structured approach.</li>
                      <li></li>
                    </ul>
                  </p>,
                },
              ]}
            />
            <Collapse
              className='bg-sky-400 border-none rounded-t-md font-semibold'
              items={[
                {
                  key: '1',
                  label: 'How to use Consistency Maintainer ?',
                  children: <div className='font-medium'>
                    <p>
                      First of all , you will see a title and description form and there you need to setup you todo list and bottom of it, you can see the pending and completed tasks and along with the form you will see the current month calendar where you will see the current status of your progress in form of GitHub/LeetCode's heatmap.
                    </p>

                    <p className='mt-2'>
                      Once you have setup the todo list, start working on your goals and complete task, if you would complete more than or equal to <span className='font-semibold italic'>80%</span> of your task then only you will see the <span className="border-b-2 pb-1 border-green-500 font-semibold">green boxes</span> on the heatmap
                    </p>
                  </div>,


                },
              ]}
            />
            <Collapse
              className='bg-sky-400 border-none rounded-t-md font-semibold'

              items={[
                {
                  key: '1',
                  label: "Some points to be remembered while using Consistency Maintainer !",
                  children: <p className='font-medium'>
                    It is in its early stage so that once you complete your tasks you have to press the <span className='font-semibold'>Save Progress</span> button in order to save the progress and in future we will make this feature autonoumous

                    <p className='mt-2'><span className='text-yellow-500 font-semibold'>Note : </span> You can save your progress only once for a day and make sure before going to sleep hit that Save Progress button so that you can save the progress</p>
                  </p>,
                },
              ]}
            />
          </Space>
        </div>


      </div>
    </div >
  )
}

export default About
