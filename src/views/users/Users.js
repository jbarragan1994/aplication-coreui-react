import React, {useState, useEffect} from 'react'

import {CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CButton} from '@coreui/react'
import {cilTrash, cilPen} from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:4000/api/v1/users', {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGVfaWQiOjEsImlhdCI6MTcyOTcwNjQwMSwiZXhwIjoxNzI5NzEwMDAxfQ.f0At5sBr_uqdrseL_jNtbP3PjeUgq0Eq8ZCgkgDoZw8'
                    //Authorization: `Bearer ${token}`,
                }}
            );
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const {msg} = await response.json();
            setUsers(msg);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
    }, []);

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
                    {users.map(user => (
                        <CTableRow key={user.uid} >
                            <CTableHeaderCell>{user.uid}</CTableHeaderCell>
                            <CTableDataCell>{user.email}</CTableDataCell>
                            <CTableDataCell>{user.username}</CTableDataCell>
                            <CTableDataCell>{user.role_id}</CTableDataCell>
                            <CTableDataCell> <CIcon icon={cilPen} size="lg" className="text-info"/> <CIcon icon={cilTrash} size="lg" className="text-danger"/> </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </>
    )
}

export default Users
