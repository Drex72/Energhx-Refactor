import React, { useEffect, useState } from 'react'

const StatusMessage = ({statusMessage, danger}) => {
    const [message, setMessage] = useState('')
    useEffect(() => {
        setMessage(statusMessage)
        setTimeout(() => setMessage(' '), 5000)
    }, [])
  return (
    <h2 className={`w-full text-center mb-3 ${danger ? 'text-red-300' : 'text-green-300'}`}>{message}</h2>
  )
}

export default StatusMessage