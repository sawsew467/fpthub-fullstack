import React from 'react'
import BoxChat from '../components/BoxChat'
import DirecList from '../components/DirecList'
import Header from '../parts/Header'

function Chat() {
  return (
    <>
    <div className="light">
        <Header></Header>
        <div className="bg-zinc-200 dark:bg-black dark:text-white700 z-10 h-[calc(100vh-80px)] mt-[80px]">
          <div className="h-full mx-auto container lg-auto sm:p-7 p-2 flex sm:flex-row flex-col justify-between items-start gap-7">
            <div className='w-full h-full bg-white rounded-xl drop-shadow-xl flex flex-row'>
                <DirecList></DirecList>
                <BoxChat></BoxChat>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat