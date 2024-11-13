import React, { useState, useEffect } from 'react'
import useFetch from '../../../hook/useFetch'

import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  //const { data, loading, error } = useFetch('POST', 'users/login')
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const [showAlert, setShowAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()

  const login = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      const result = await response.json()

      if (result.error) {
        setShowAlert(true)
        setErrorMessage(result.error)
        setTimeout(() => {
          setShowAlert(false)
          setErrorMessage(null)
        }, 3000)
        return
      }

      localStorage.setItem('token', result.msg.token)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, loading, error } = useFetch('POST', 'users/login', JSON.stringify(loginData))
    console.log(data)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setLoginData({
      ...loginData,
      [name]: value,
    })
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        name="email"
                        value={loginData.email}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={login}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
                {showAlert && <CAlert color="danger">{errorMessage}</CAlert>}
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
