import React from 'react'
import Header from './Header'
import AllUsersTable from './UsersTable'

const page = () => {
    return (
        <div className='px-4 space-y-10'>
            <Header />
            <AllUsersTable />
        </div>
    )
}

export default page