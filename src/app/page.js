import Features from '@/components/home/FeaturesSection'
import StepsTogetStarted from '@/components/home/StepsToGetStarted'
import HeroSection from '@/components/home/HeroSection'
import React from 'react'
import TestimonialSection from '@/components/home/TestimonialSection'
import FaqSection from '@/components/home/FaqSection'
import FooterWithQuote from '@/components/layout/FooterWithQuote'
import TeleHealthSection from '@/components/home/TeleHealthSection'
import HealthcareProviderSection from '@/components/home/HealthcareProviderSection'

const page = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <HealthcareProviderSection />
      <TeleHealthSection />
      <StepsTogetStarted />

      <TestimonialSection />
      <FaqSection />
      <FooterWithQuote />
    </>
  )
}

export default page