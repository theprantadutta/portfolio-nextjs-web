import React from 'react'
import './iphone-mockup.css'

interface IphoneMockupProps {
  children: React.ReactNode
}

const IphoneMockup: React.FC<IphoneMockupProps> = ({ children }) => {
  return (
    <div className='marvel-device iphone-x'>
      <div className='notch'>
        <div className='camera'></div>
        <div className='speaker'></div>
      </div>
      <div className='top-bar'></div>
      <div className='sleep'></div>
      <div className='bottom-bar'></div>
      <div className='volume'></div>
      <div className='overflow'>
        <div className='inner-shadow'></div>
        <div className='screen'>{children}</div>
      </div>
    </div>
  )
}

export default IphoneMockup
