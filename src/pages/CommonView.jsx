import React from 'react'
import SideBar from '../components/common/SideBar'
import { Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import TopNavigationBar from '../components/TopNavigationBar'

function CommonView() {
  useAuth(true)

  const location = useLocation()

  return (
    <div className="h-full">
      <TopNavigationBar />
      <div className="flex flex-row h-full">
        <SideBar />
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default CommonView
