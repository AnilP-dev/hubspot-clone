"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Users,
  Building2,
  DollarSign,
  ShoppingCart,
  Diamond,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/store/hooks"

interface ListType {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  count: number
}

interface EntityCounts {
  contacts: number
  companies: number
  deals: number
  tickets: number
  carts: number
  orders: number
}

const getListTypes = (counts: EntityCounts): ListType[] => {
  return [
    {
      id: "contacts",
      name: "Contacts",
      icon: <Users className="w-3 h-3" />,
      description: "Create lists of contacts",
      count: counts.contacts,
    },
    {
      id: "companies",
      name: "Companies",
      icon: <Building2 className="w-3 h-3" />,
      description: "Create lists of companies", 
      count: counts.companies,
    },
    {
      id: "deals",
      name: "Deals",
      icon: <DollarSign className="w-3 h-3" />,
      description: "Create lists of deals",
      count: counts.deals,
    },
    {
      id: "tickets",
      name: "Tickets", 
      icon: <Diamond className="w-3 h-3" />,
      description: "Create lists of tickets",
      count: counts.tickets,
    },
    {
      id: "carts",
      name: "Carts",
      icon: <ShoppingCart className="w-3 h-3" />,
      description: "Create lists of carts",
      count: counts.carts,
    },
    {
      id: "orders",
      name: "Orders",
      icon: <Building2 className="w-3 h-3" />,
      description: "Create lists of orders",
      count: counts.orders,
    },
  ]
}

export function CreateListPage() {
  const router = useRouter()
  const allState = useAppSelector((state) => state)
  const [selectedType, setSelectedType] = useState<string>("contacts")
  const [aiPrompt, setAiPrompt] = useState("")
  
  const entityCounts: EntityCounts = {
    contacts: allState.contacts?.contacts?.length || 0,
    companies: allState.companies?.companies?.length || 0,
    deals: allState.deals?.deals?.length || 0,
    tickets: 0, // No slice available yet
    carts: 0,   // No slice available yet
    orders: 0,  // No slice available yet
  }
  
  const listTypes = getListTypes(entityCounts)

  const handleNext = () => {
    router.push(`/crm/lists/create/builder?type=${selectedType}`)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: '"Lexend Deca",Helvetica,Arial,sans-serif' }}>
      <style jsx>{`
        .text-primary { color: #33475b; }
        .ai-section-title {
          font-size: 14px;
          font-style: unset;
          font-weight: 600;
          line-height: 18px;
          color: #33475b;
        }
        .disabled-textarea {
          background-color: rgb(234, 240, 246);
          cursor: not-allowed;
        }
        .advantage-item {
          margin-bottom: 16px;
        }
      `}</style>
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/crm/lists" className="text-[#00BDA5] hover:text-[#00BDA5]/80">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-primary">Create a list</h1>
              </div>
            </div>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6"
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-8xl px-16 pr-0 py-8 pt-0 grow">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - List Creation */}
          <div className="lg:col-span-2 space-y-2 px-4">
            {/* List Type Selection */}
            <div className="py-6 border-5 border-gray-600">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold mb-2 text-primary">Create a list of...</h2>
                <p className="text-sm text-primary">{listTypes.find(t => t.id === selectedType)?.count} {selectedType} in your CRM</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {listTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-4 py-2  rounded-lg border-2 text-left transition-all hover:border-[#00BDA5] ${
                      selectedType === type.id
                        ? "border-[#00BDA5] bg-[#00BDA5]/5"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-0">
                      <div className={`p-2 text-xs rounded ${selectedType === type.id ? "bg-[#00BDA5] text-white" : "bg-gray-100 text-gray-600"}`}>
                        {type.icon}
                      </div>
                      <div className="grow text-center">
                        <span className="text-primary font-bold">{type.name}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Filter Generation */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="ai-section-title">Generate list filters with AI</h2>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="bg-blue-700 text-white text-[10px] rounded-sm">BETA</Badge>
                  <Badge variant="secondary" className="bg-pink-700 text-white text-[10px] rounded-sm">AI</Badge>
                </div>
              </div>
              <p className="text-sm text-primary mb-2 font-light text-[rgb(81, 111, 144)] text-xs">
                Describe the types of {selectedType.toLowerCase()} you'd like to see on this list
              </p>
              <p className="text-sm text-primary mb-4">
                To use this feature, <Link href="#" className="text-[#00BDA5] underline hover:text-[#00BDA5]/80">upgrade to Marketing Hub Starter</Link>.
              </p>
              
              <Textarea
                placeholder="Example prompt: Contacts who opened an email in the last 30 days"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="min-h-[80px] mb-4 text-base disabled-textarea"
                style={{ backgroundColor: 'rgb(234, 240, 246)' }}
                disabled
              />
            </div>

            {/* List Limits */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-primary mb-4">List limits</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-primary">Active lists used</span>
                    <span className="text-sm font-medium text-primary">-- of 10</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-primary">Static lists used</span>
                    <span className="text-sm font-medium text-primary">2 of 1,000</span>
                  </div>
                  <Progress value={0.2} className="h-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Information */}
          <div className="lg:col-span-3 space-y-6 bg-gray-50 pt-16 px-16">
            <div className="bg-white rounded-sm  shadow-md  p-6">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Use all your unified data to build the right segment
              </h3>
              <p className="text-sm text-primary mb-6">
                Building the right list allows for targeted communication. You can use your lists across various tools, such as:
              </p>

              <div className="space-y-10">
                <div className="flex items-start gap-3 advantage-item">
                  <div className="w-15 h-15 flex-shrink-0">
                    <img 
                      src="https://static.hsappstatic.net/segments-assets-lib/static-1.45/images/campaigns.svg" 
                      alt="Email Campaigns" 
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-primary mb-1 font-semibold">Email Campaigns:</h4>
                    <p className="text-sm text-primary">
                      tailored lists ensure your email campaigns reach the right audience, driving higher engagement and conversion rates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 advantage-item">
                  <div className="w-15 h-15 flex-shrink-0">
                    <img 
                      src="https://static.hsappstatic.net/segments-assets-lib/static-1.45/images/automation.svg" 
                      alt="Automation" 
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Automation:</h4>
                    <p className="text-sm text-primary">
                      segmented lists allow for more personalized, trigger-based workflows, improving the customer journey with timely and relevant messages.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 advantage-item">
                  <div className="w-15 h-15 flex-shrink-0">
                    <img 
                      src="https://static.hsappstatic.net/segments-assets-lib/static-1.45/images/reporting.svg" 
                      alt="Reporting" 
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Reporting:</h4>
                    <p className="text-sm text-primary">
                      organized lists help you better understand how each segment is engaging with you as well as the make-up of that segment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 advantage-item">
                  <div className="w-15 h-15 flex-shrink-0">
                    <img 
                      src="https://static.hsappstatic.net/segments-assets-lib/static-1.45/images/personalization.svg" 
                      alt="Personalization" 
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Personalization:</h4>
                    <p className="text-sm text-primary">
                      lists empower you to show relevant messaging to each segment by powering your smart content, chatbots, and ads.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}