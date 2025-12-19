import React from 'react'
import Header from './Header'
import PrescriptionsList from './PrescriptionList'

const page = () => {
    return (
        <div className='px-4 space-y-10'>
            <Header />
            <PrescriptionsList />
        </div>
    )
}

export default page