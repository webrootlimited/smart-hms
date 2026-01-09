import React from 'react'
import Stepper from './Stepper'
import { Suspense } from 'react'

const page = () => {
    return (
        <Suspense>
            <Stepper />
        </Suspense>
    )
}

export default page