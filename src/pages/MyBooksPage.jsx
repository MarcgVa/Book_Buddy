import React, { useEffect } from 'react'
import { useCheckInBookMutation } from '../components/bookReservationSlice'
import { Navigate } from 'react-router-dom';


export default function MyBooksPage({ token }) {


  const checkInBook = async (id) => { 

    const response = await useCheckInBookMutation(id).unwrap();
    if (response) { 
        console.log()
    }
  }




useEffect(() => {
    !token ? navigate('/login'): null
  }, [])
  


  return (
    <div>MyBooksPage</div>
  )
}
