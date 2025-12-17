import React from 'react'
import AddNewUserHeader from './Header'
import NewUserForm from './NewUserForm'

const page = () => {
    return (
        <div className="px-4 space-y-10">
            <AddNewUserHeader />
            <NewUserForm />
        </div>
    )
}

export default page