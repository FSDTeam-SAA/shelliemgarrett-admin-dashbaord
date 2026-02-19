import React from 'react'
import { AllCompaignsCard } from './_components/AllCompaignsCard'

function page() {
  return (
    <div>
        <div>
            <h1 className='text-center text-[48px] font-medium leading-[150%] my-8'>All Campaigns</h1>
        </div>
        <AllCompaignsCard />
    </div>
  )
}

export default page