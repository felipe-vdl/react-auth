import React from 'react';
import './LoadingSpinner.css';

export default function LoadingSpinner(props) {
  return (
    <div className={`lds-dual-ring ${props.className}`}></div>
  )
}
