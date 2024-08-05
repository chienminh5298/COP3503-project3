import React from 'react'

import './index.scss'
import Skeleton from '../skeleton'

const Index = ({setScreen}) => {
  
  return (
    <div className='container'>
      <div className='greetingContainer'>
        <h1>Welcome to our Project 3</h1>
        <h1>COP3503</h1>
        <h1>Task Scheduling System</h1>
      </div> 
      <div className='buttonContainer'>
        <button onClick={()=> setScreen(<Skeleton/>)}>Continue</button>
      </div>
    </div>
  )
}

export default Index