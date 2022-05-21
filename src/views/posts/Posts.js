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
  cilDescription,
  cilExternalLink,
} from '@coreui/icons'

import { Link } from 'react-router-dom'

import PostService from '../../services/postService'

const Posts = () => {
  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const fetchPosts = async () => {
    let post = [];

    await PostService.getAll().then(res => {
      post = res.data
      setPosts(post.filter(obj => obj.isPublic === false))
      console.log(posts)
      setLoading(false)
    })
  }

  React.useEffect(() => {
    fetchPosts()
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
            <CCardHeader>Posts to be Approved</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive small>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilDescription} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Post</CTableHeaderCell>
                    <CTableHeaderCell>Rent</CTableHeaderCell>
                    <CTableHeaderCell>View Car</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {posts.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.picture} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>Rs. {item.rate} /day</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/posts/${item._id}`}>
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

export default Posts
