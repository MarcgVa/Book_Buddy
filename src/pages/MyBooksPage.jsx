import React, { useEffect } from 'react'
import { useCheckInBookMutation } from '../components/bookReservationSlice'
import { Navigate, useNavigate } from 'react-router-dom';
import { useNavbarContext } from 'flowbite-react';




export default function MyBooksPage({ token }) {
  const navigate = useNavigate();

  const checkInBook = async (id) => { 

    const response = useCheckInBookMutation(id).unwrap();
    if (response) { 
      
    }
  }




useEffect(() => {
    !token ? navigate('/login'): null
  }, [])
  


  return (
    <div>MyBooksPage</div>
  )
}
