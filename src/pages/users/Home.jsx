import React, { useContext } from 'react'
import UserContext from '../../context/User_Context'

const Home = () => {

  const userContext=useContext(UserContext)
  return (
    <div>
      <h1>Welcome {userContext.userData?.user?.name}</h1>
      <h1>user is logged in {userContext?.isLogin+''}</h1>
    </div>
  )
}

export default Home