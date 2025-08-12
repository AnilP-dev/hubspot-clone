'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { EmailDetailView } from '@/components/email-detail-view'

interface EmailDetailPageProps {
  params: {
    id: string
  }
}

export default function EmailDetailPage({ params }: EmailDetailPageProps) {
  const email = useSelector((state: RootState) => 
    state.emails.emails.find(e => e.id === params.id)
  )

  if (!email) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Email Not Found</h1>
          <p className="text-sm text-gray-600 mt-1">The email with ID "{params.id}" was not found.</p>
        </div>
      </div>
    )
  }

  return <EmailDetailView email={email} />
}