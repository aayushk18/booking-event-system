import { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './utils/useAuthStore.jsx'
import { Loader } from 'lucide-react';
import SignupPage from './pages/SignupPage.jsx';
import HomePage from './pages/HomePage.jsx';


function App() {

  const {authUser ,  checkAuth, isCheckAuth} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  if (isCheckAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-20 animate-spin' />
    </div>
  )



  return (
    < Routes>

    <Route path='/' element={authUser ? <HomePage/> : <Navigate to='/login' />}>
    <Route path='/add-category' element={authUser ? <HomePage/> : <Navigate to='/login' />}/>

    </Route>
    <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
    <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to='/' />} />

    </Routes>
  )
}

export default App
