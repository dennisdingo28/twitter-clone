import LoginModal from '@/components/LoginPage/LoginModal'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='h-[100vh] w-[100vw] bg-[#242d34]'>
        <div className="container mx-auto">
            <LoginModal/>
        </div>
    </div>
  )
}

export default LoginPage