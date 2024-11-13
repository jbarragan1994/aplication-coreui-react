import { useState, useEffect } from 'react'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const useFetch = (method, endpoint, body) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    let headers = {
      'Content-Type': 'application/json',
    }

    if (localStorage.getItem('token')) {
      headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }

    const url = `${backendUrl}/${endpoint}`
    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
      })
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`)
      }
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [endpoint])

  return { data, loading, error, fetchData }
}

export default useFetch
