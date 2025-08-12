"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Edit2, ArrowLeft } from "lucide-react"
import { Email } from "@/lib/store/slices/emailsSlice"

interface EmailDetailViewProps {
  email: Email
}

export function EmailDetailView({ email }: EmailDetailViewProps) {
  const router = useRouter()
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const renderEmailContent = () => {
    if (!email.content || email.content.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No email content available</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {email.content.map((element, index) => {
          switch (element.type) {
            case 'text':
              return (
                <div key={element.id} className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Something Powerful</h2>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Tell The Reader More</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The headline and subheader tells us what you're <span className="text-blue-600 underline">offering</span>, and the form 
                    header closes the deal. Over here you can explain why your offer is so great 
                    it's worth filling out a form for.
                  </p>
                  <p className="text-gray-600 mb-2">Remember:</p>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Bullets are great</li>
                    <li>• For spelling out <span className="text-blue-600 underline">benefits</span> and</li>
                    <li>• Turning visitors into leads.</li>
                  </ul>
                </div>
              )
            case 'button':
              return (
                <div key={element.id} className="flex justify-center py-4">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium"
                    style={element.style}
                  >
                    {element.content}
                  </button>
                </div>
              )
            default:
              return (
                <div key={element.id} className="p-4 border border-gray-200 rounded">
                  <p>{element.content}</p>
                </div>
              )
          }
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-4">
            <button 
              onClick={() => router.push('/marketing/email')}
              className="flex items-center text-sm text-hubspot-secondary hover:text-hubspot-secondary/80 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to all emails
            </button>
          </div>

          {/* Title and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-hubspot-primary flex items-center gap-2">
                {email.name}
                <Edit2 className="w-5 h-5 text-gray-400 hover:text-hubspot-secondary cursor-pointer" />
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-hubspot-primary">
                    {email.status === 'draft' ? 'Pre-processing' : email.status}
                  </span>
                </div>
                <span className="text-sm text-hubspot-secondary">| Regular email</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-1 text-hubspot-primary border-hubspot-view-tab-border-color hover:bg-gray-50">
                Actions
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="gap-1 text-hubspot-primary border-hubspot-view-tab-border-color hover:bg-gray-50">
                Export
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-sm">
                Edit email
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Email Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Email Preview</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                {renderEmailContent()}
              </div>
            </div>
          </div>

          {/* Right Column - Email Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Email Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="text-sm text-hubspot-secondary block mb-1">Subject</label>
                    <div className="text-sm text-hubspot-primary">{email.subject || 'test mail'}</div>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm text-hubspot-secondary block mb-1">Preview text</label>
                    <div className="text-sm text-hubspot-primary">{email.previewText || 'No preview text'}</div>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm text-hubspot-secondary block mb-1">From name</label>
                    <div className="text-sm text-hubspot-primary">{email.fromName}</div>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm text-hubspot-secondary block mb-1">From address</label>
                    <div className="text-sm text-hubspot-primary">{email.fromAddress}</div>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="text-sm text-hubspot-secondary block mb-1">Included lists</label>
                    <div className="text-sm text-hubspot-secondary hover:underline cursor-pointer">
                      Unnamed list {formatDate(email.createdAt)}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm text-hubspot-secondary block mb-1">Simple workflows (0)</label>
                    <div className="text-sm text-hubspot-primary">None</div>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm text-hubspot-secondary block mb-1">Sent date</label>
                    <div className="text-sm text-hubspot-primary">
                      {formatDate(email.updatedAt)} UTC-04:00 by {email.lastUpdatedBy}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="text-hubspot-secondary hover:underline text-sm">
                  See details
                </button>
              </div>
            </div>

            {/* Performance Tabs */}
            <Tabs defaultValue="performance" className="w-full">
              <TabsList className="h-12 bg-transparent border-b border-hubspot-view-tab-border-color rounded-none p-0 w-full justify-start">
                <TabsTrigger 
                  value="performance" 
                  className="rounded-none border-b-5 border-transparent data-[state=active]:border-hubspot-primary data-[state=active]:bg-transparent bg-transparent text-hubspot-secondary data-[state=active]:text-hubspot-primary px-6 py-3 mr-8 font-medium"
                  style={{ borderBottomWidth: '5px' }}
                >
                  Performance
                </TabsTrigger>
                <TabsTrigger 
                  value="recipients" 
                  className="rounded-none border-b-5 border-transparent data-[state=active]:border-hubspot-primary data-[state=active]:bg-transparent bg-transparent text-hubspot-secondary data-[state=active]:text-hubspot-primary px-6 py-3 mr-8 font-medium"
                  style={{ borderBottomWidth: '5px' }}
                >
                  Recipients
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="performance" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  {email.status === 'draft' ? (
                    <div className="text-center py-12">
                      <div className="mx-auto w-24 h-24 mb-6">
                        <div className="relative">
                          {/* Hourglass icon */}
                          <div className="w-16 h-20 mx-auto">
                            <div className="w-16 h-8 bg-orange-200 rounded-t-full relative">
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full"></div>
                            </div>
                            <div className="w-16 h-8 bg-orange-300 rounded-b-full relative">
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-orange-400 rounded-b-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Nicely done</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Your email is processing. Check back soon for more
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">Performance data will appear here once the email is sent.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="recipients" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <div className="text-center py-12">
                    <p className="text-gray-500">Recipient data will appear here.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Bot filtering status */}
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-700">Bot filtering</span>
                <span className="text-gray-500">is currently</span>
                <span className="font-medium text-gray-900">ON</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}