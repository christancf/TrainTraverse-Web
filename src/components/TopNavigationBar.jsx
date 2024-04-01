import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import BrandLogo from './BrandLogo'
import { useEffect, useState } from 'react'
import { parseJwt } from '../utils/jwt'

const TopNavigationBar = () => {
  const [role, setRole] = useState()
  const [name, setName] = useState()

  useEffect(() => {
    let r = 'travel_agent'
    let n = ''

    try {
      let token = sessionStorage.getItem('access_token')
      let state = parseJwt(token)
      r = state.role || travel_agent
      n = state.sub

      // console.log(state, n, r)
    } catch (e) {
      // console.error(e)
    }

    setName(n)
    setRole(r)
  }, [])

  function signOut() {
    localStorage.removeItem('access_token')
    sessionStorage.removeItem('access_token')
    navigate('/signin')
    navigate(0)
  }

  return (
    <Navbar fluid rounded className="bg-slate-50 border-b border-slate-100">
      <Navbar.Brand href="http://localhost:5173/">
        <BrandLogo />
      </Navbar.Brand>
      <div className="">
        {role == 'back_officer' ? 'Back Officer' : 'Travel agent'}
      </div>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{name}</span>
            <span className="block truncate text-sm font-medium">@{name}</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  )
}

export default TopNavigationBar
