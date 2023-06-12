import React from 'react'
import about from "../Assets/About-Us.jpeg"

const About = () => {
  return (
    <div>
      <div className='container-fluid mt-2 bg-primary'>
        <div className='row'>
       
        <div className='col-lg-6'>
        <h1> About Us </h1>
          <p> Food is any substance consumed by an organism for nutritional support.
             Food is usually of plant, animal, or fungal origin, and contains essential nutrients,
             such as carbohydrates, fats, proteins, vitamins, or minerals
          </p>
        </div>

        <div className='col-lg-6'>
          <img src={about} alt='about' width={400} height={400}></img>
        </div>
        </div>
      
      </div>
    </div>
  )
}

export default About
