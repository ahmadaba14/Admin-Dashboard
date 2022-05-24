import React from 'react'

import moment from 'moment'

import {
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
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilExternalLink,
} from '@coreui/icons'

import { Link } from 'react-router-dom'

import ComplaintService from 'src/services/complaintService'

const Complaints = () => {
  const [complaints, setComplaints] = React.useState([])
  const [complaintLoading, setComplaintLoading] = React.useState(true)

  const fetchComplaints = async () => {
    let complaint = [];

    await ComplaintService.getAll().then(res => {
      complaint = res.data
      setComplaints(complaint.filter(obj => obj.status === "Pending"))
      console.log(res.data)
      setComplaintLoading(false)
    })
  }

  React.useEffect(() => {
    fetchComplaints()
  }, [])

  if (complaintLoading) {
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
            <CCardHeader>Complaints to be Checked</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive small>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilDescription} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Complaint Subject</CTableHeaderCell>
                    <CTableHeaderCell>Issued At</CTableHeaderCell>
                    <CTableHeaderCell>View Complaint</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {complaints.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <div>{index + 1}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.subject}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{moment(item.createdAt).format('L').toString()}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/complaints/${item._id}`}>
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

export default Complaints
