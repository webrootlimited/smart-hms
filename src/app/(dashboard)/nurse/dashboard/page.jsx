import React from 'react'
import Header from './Header'
import Dashboard from './Dashboard'

const page = () => {
    return (
        <div className='px-4 space-y-10'>
            <Header />
            <Dashboard />
        </div>
    )
}

export default page