import React from 'react'
import {Routes,Route} from 'react-router'
import Home from '../Component/Home'
import Product from '../Component/Products'
import AddProduct from '../Component/AddProducts'
import Login from '../Component/Login'
import Update from '../Component/Update'
import Descriptionpage from '../Component/Descriptionpage'
import {Privates} from '../Component/Private'
function MainRouter() {
  return (
    <div>
      


      <Routes>
        <Route path='/Home' element={<Home/>}></Route>
        <Route path='/Products' element={
          <Privates>
         <Product/>
          </Privates>
          }></Route>
        <Route path='/AddProducts' element={<AddProduct/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Update' element={<Update/>}></Route>
        <Route path='/Descriptionpage/:id' element={<Descriptionpage/>}></Route>
        <Route path='*' element={<h1>404: Page not found</h1>}></Route>
      </Routes>
    </div>
  )
}

export default MainRouter
