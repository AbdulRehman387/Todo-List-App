import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import React from 'react'

const Page = async() => {
    const user = await getServerSession()
    console.log(user);
    
  return (
    <div>Page</div>
  )
}

export default Page