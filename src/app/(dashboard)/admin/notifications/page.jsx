import React from 'react'
import Header from './Header'
import Notifications from './Notifications'

const page = () => {
    return (
        <div className='px-4 space-y-10'>
            <Header />
            <Notifications />
        </div>
    )
}

export default page