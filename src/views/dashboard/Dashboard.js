import React from 'react'

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilDescription,
} from '@coreui/icons'

import avatar from 'src/assets/images/avatars/10.png'

import WidgetsDropdown from '../widgets/WidgetsDropdown'

import UserService from '../../services/userService'
import PostService from '../../services/postService'

const Dashboard = () => {
  const [users, setUsers] = React.useState([])
  const [posts, setPosts] = React.useState([])
  const [postLoading, setPostLoading] = React.useState(true)
  const [userLoading, setUserLoading] = React.useState(true)

  const [totalPosts, setTotalPosts] = React.useState(0)
  const [pendingPosts, setPendingPosts] = React.useState(0)
  const [approvedUsers, setApprovedUsers] = React.useState(0)
  const [pendingUsers, setPendingUsers] = React.useState(0)

  const fetchUsers = async () => {
    let user = [];

    await UserService.getAll().then(res => {
      user = res.data.users
      setUsers(user.filter(obj => obj.isVerified === false))
      console.log(users)
      setUserLoading(false)
    })

    setApprovedUsers(user.filter(obj => obj.isVerified === true).length)
    setPendingUsers(user.filter(obj => obj.isVerified === false).length)
  }

  const fetchPosts = async () => {
    let post = [];

    await PostService.getAll().then(res => {
      post = res.data
      setPosts(post.filter(obj => obj.isPublic === false))
      console.log(posts)
      setPostLoading(false)
    })

    setPendingPosts(post.filter(obj => obj.isPublic === false).length)
    setTotalPosts(post.length)
  }

  React.useEffect(() => {
    fetchUsers()
    fetchPosts()
  }, [])

  if (userLoading && postLoading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <CSpinner/>
      </div>
    );
  }

  return (
    <>
      <WidgetsDropdown 
        totalPosts={totalPosts}
        pendingPosts={pendingPosts}
        approvedUsers={approvedUsers}
        pendingUsers={pendingUsers}
      />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Posts to be Approved</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilDescription} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Car</CTableHeaderCell>
                    <CTableHeaderCell>City</CTableHeaderCell>
                    <CTableHeaderCell>Rent</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {posts.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.picture}/>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.modelYear} {item.make} {item.model}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.pickupCity}</strong>
                          </div>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>Rs. {item.rate} /day </strong>
                          </div>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <div align="right">
                <a href="/posts" className="small">
                  View All
                </a>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
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
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <div align="right">
                <a href="/users" className="small">
                  View All
                </a>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
