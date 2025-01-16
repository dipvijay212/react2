import React from 'react'
  

 export const Privates=({children})=>{
    let isAuth=localStorage.getItem('token');

    if(!isAuth){
        window.location.href="./Login"
    }
    else{
        return children
    }
}
