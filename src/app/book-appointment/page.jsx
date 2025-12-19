import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import Footer from './Footer'
import Main from './Main'

const page = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Main />
            <Footer />
        </>
    )
}

export default page