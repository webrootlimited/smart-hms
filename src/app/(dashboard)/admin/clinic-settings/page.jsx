import React from 'react'
import Header from './Header'
import ClinicLocations from './ClinicLocations'

const page = () => {
    return (
        <div className='px-4 space-y-10'>
            <Header />
            <ClinicLocations />
        </div>
    )
}

export default page