import React from 'react'
import {
  CRow,
  CCol,
  CWidgetStatsC,
} from '@coreui/react'

import PropTypes from 'prop-types'

const WidgetsDropdown = ({totalPosts, pendingPosts, approvedUsers, pendingUsers}) => {
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsC
          className="mb-3"
          color="primary"
          inverse
          text="Widget helper text"
          title="Total Posts"
          value={totalPosts}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsC
          className="mb-3"
          color="info"
          inverse
          text="Widget helper text"
          title="Posts Pending"
          value={pendingPosts}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsC
          className="mb-3"
          color="success"
          inverse
          text="Widget helper text"
          title="Approved Users"
          value={approvedUsers}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsC
          className="mb-3"
          color="warning"
          inverse
          text="Widget helper text"
          title="Users Pending"
          value={pendingUsers}
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  totalPosts: PropTypes.number.isRequired,
  pendingPosts: PropTypes.number.isRequired,
  approvedUsers: PropTypes.number.isRequired,
  pendingUsers: PropTypes.number.isRequired,
}

export default WidgetsDropdown
