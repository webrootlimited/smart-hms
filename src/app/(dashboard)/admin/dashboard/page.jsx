import React from 'react'
import TopStats from './TopStats'
import DashboardAlerts from './DashboardAlerts'
import DailyAppointmentVolumeChart from './DailyAppointmentVolumeChart'
import ProviderMetrics from './ProvideMetrics'
import QuickActionsAndPatientLoad from './QuickActions'

const page = () => {
    return (
        <div className='px-4 py-5'>
            <TopStats />
            <DailyAppointmentVolumeChart />
            <ProviderMetrics />
            <QuickActionsAndPatientLoad />
            <DashboardAlerts />

        </div>
    )
}

export default page