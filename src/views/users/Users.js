import React from 'react'

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilExternalLink,
} from '@coreui/icons'

import avatar from 'src/assets/images/avatars/10.png'

import UserService from '../../services/userService'
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const fetchUsers = async () => {
    let user = [];

    await UserService.getAll().then(res => {
      user = res.data.users
      setUsers(user.filter(obj => obj.isVerified === false))
      console.log(users)
      setLoading(false)
    })
  }

  React.useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <CSpinner/>
      </div>
    );
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Users to be Verified</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive small>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilUser} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>View User</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.profilePicture === '' ? item.profilePicture : avatar} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/users/${item._id}`}>
                          <CIcon icon={cilExternalLink} />
                        </Link>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Users
