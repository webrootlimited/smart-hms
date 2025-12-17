import React from 'react'
import Header from './Header'
import EditForm from './EditForm'

const page = () => {
    return (
        <div className='px-4 space-y-10'>
            <Header />
            <EditForm />
        </div>
    )
}

export default page