import React from 'react'
import Header from './Header';
import ProvidersTable from './ProvidersTable'


const page = () => {
    return (
        <div className='px-4 space-y-10'>
            <Header />
            <ProvidersTable />
        </div>
    )
}

export default page