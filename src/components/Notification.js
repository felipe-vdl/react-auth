import React from 'react'

export default function Notification(props) {
  return (
    <p className={`rounded text-base px-3 py-2 ${props.className} ${props.status === 'error' ? 'bg-red-500' : 'text-red-600'}`}>{props.message}</p>
  )
}
