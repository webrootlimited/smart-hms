import React, { Suspense } from 'react'
import OTPVerificationPage from './OtpVerify'

const page = () => {
    return (
        <Suspense>
            <OTPVerificationPage />
        </Suspense>
    )
}

export default page