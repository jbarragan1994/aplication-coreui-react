import React, { useState, useEffect } from 'react'
import useFetch from '../../hook/useFetch'

import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
} from '@coreui/react'
import { cilTrash, cilPen } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const Users = () => {
  const { data, loading, error } = useFetch('GET', 'users')
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (data) {
      const { msg } = data
      setUsers(msg)
    }
  }, [data])

  return (
    <>
      <CButton color="primary">Crear Usuario</CButton>
      <CTable striped hover>
        <CTableHead align="middle">
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Username</CTableHeaderCell>
            <CTableHeaderCell scope="col">Rol</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody align="middle">
          {users.map((user) => (
            <CTableRow key={user.uid}>
              <CTableHeaderCell>{user.uid}</CTableHeaderCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.username}</CTableDataCell>
              <CTableDataCell>{user.role_id}</CTableDataCell>
              <CTableDataCell>
                {' '}
                <CIcon icon={cilPen} size="lg" className="text-info" />{' '}
                <CIcon icon={cilTrash} size="lg" className="text-danger" />{' '}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Users
