import React from 'react'
import { NavLink } from 'react-router'
import './style.css'
function Navbars() {
  return (
    <div>
      <div className='header'>
        <div className='header-contain'>
        <NavLink to="/Home">Home</NavLink>
      <NavLink to="/Products">Product</NavLink>
      <NavLink to="/AddProducts">AddData</NavLink>
      <NavLink to="/Login">Login</NavLink>
        </div>
      </div>
     


     
    </div>
  )
}

export default Navbars
