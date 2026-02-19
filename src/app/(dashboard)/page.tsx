import DashboardHeader from '@/components/share/DashboardHeader'
import React from 'react'
import OverViewCard from './_components/OverViewCard'
import { DonationReportChart } from './_components/DonationReportChart'
import { TopDonors } from './_components/TopDoners'
import { AllCampaign } from './_components/AllCampaign'

function page() {
  return (
    <div>
      <DashboardHeader />
      <OverViewCard />
      <DonationReportChart />
      <TopDonors />
      <AllCampaign />
    </div>
  )
}

export default page