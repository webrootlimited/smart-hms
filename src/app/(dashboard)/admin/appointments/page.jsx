import React from 'react'
import Header from './Header'
import AppointmentTypesTable from './AppointmentsTable'

const page = () => {
    return (
        <div className='px-4 space-y-10'>
            <Header />
            <AppointmentTypesTable />
        </div>
    )
}

export default page