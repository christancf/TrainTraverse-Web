import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookmarkIcon,
  GlobeAltIcon,
  PresentationChartLineIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { Sidebar } from 'flowbite-react'
import useAuth from '../../hooks/useAuth'

const Item = ({ name, icon, onClick }) => (
  <Sidebar.Item onClick={onClick} icon={icon}>
    <p>{name}</p>
  </Sidebar.Item>
)

function SideBar() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('/travellers')
  const [functions, setFunctions] = useState([])
  const loginState = useAuth()

  let backOfficerFunctions = [
    {
      icon: GlobeAltIcon,
      name: 'Travellers',
      href: '/travellers',
    },
    {
      icon: PresentationChartLineIcon,
      name: 'Trains',
      href: '/trains',
    },
    {
      icon: BookmarkIcon,
      name: 'Reservations',
      href: '/bookings',
    },
    {
      icon: UserIcon,
      name: 'Employees',
      href: '/employees',
    },
  ]

  let travelAgentFunctions = [
    {
      icon: GlobeAltIcon,
      name: 'Travellers',
      href: '/travellers',
    },
    {
      icon: BookmarkIcon,
      name: 'Reservations',
      href: '/bookings',
    },
  ]

  useEffect(() => {
    let role = loginState.role
    let f = role == 'back_officer' ? backOfficerFunctions : travelAgentFunctions

    setFunctions(
      f.map(elem => {
        elem.selected = selected == elem.href
        elem.onClick = () => {
          navigate(elem.href)
          setSelected(elem.href)
        }
        return elem
      }),
    )
  }, [])

  return (
    <div>
      <Sidebar aria-label="Default sidebar example" className="h-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {functions.map(props => (
              <Item key={props.name} {...props} />
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}

export default SideBar
