import React, {useState} from 'react'
// import {store} from '../store'
import { Counter } from '../Counter'

// let state=store.getState()

const Home = () => {
  return (
    <div>
        <img className="homepage_photo" src={"https://media.istockphoto.com/id/949190756/photo/various-sport-equipments-on-grass.jpg?s=1024x1024&w=is&k=20&c=sMZL6tZpKAZihvQMPn5YnJaTMGh5bhrxsNJ_rJA0bWs="} alt={"Sport equipment"}/>
        <h2 className='homepage_h2'>Ready for your next adventure?</h2>
        <h2 className='homepage_h2'>Check out sport equipment that's available to rent</h2>   
        <h3>Category:</h3>
        <h2 className='homepage_h2'>Available equipment near you:</h2>
        <Counter/>
    </div>
  )
}

export default Home

