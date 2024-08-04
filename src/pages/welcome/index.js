import React from 'react'

import './index.scss'
import Skeleton from '../skeleton'

const Index = ({setScreen}) => {
  
  return (
    <div className='container'>
      <div className='greetingContainer'>
        <h1>Welcome to our Project 3</h1>
        <h2>COP3503</h2>
        <h2>Task Scheduling System</h2>
      </div> 
      <div className='buttonContainer'>
        <button onClick={()=> setScreen(<Skeleton/>)}>Continue</button>
      </div>
    </div>
  )
}

export default Index