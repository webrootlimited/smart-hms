import React from 'react'
import Header from './Header'
import Stepper from "./Stepper"

const page = () => {
    return (
        <div className='px-4 space-y-10'>
            <Header />
            <Stepper />
        </div>
    )
}

export default page