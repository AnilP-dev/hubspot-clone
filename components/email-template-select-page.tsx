"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export function EmailTemplateSelectPage() {
  const router = useRouter()
  const categories = [
    { name: "All templates", count: 45, active: true },
    { name: "Ecommerce", count: 18 },
    { name: "Engagement", count: 4 },
    { name: "Event", count: 9 },
    { name: "Greeting", count: 6 },
    { name: "Newsletter", count: 5 },
    { name: "Plain text", count: 7 },
    { name: "Other", count: 2 },
  ]

  const templates = [
    { title: "Start from scratch", img: "/placeholder.svg", enabled: true},
    { title: "Announcement", img: "https://7528311.fs1.hubspotusercontent-na1.net/hubfs/7528311/raw_assets/public/mV0_d-EmailTemplate_hubspot/email/images/announcement-2.png" },
    { title: "Birthday", img: "https://7528302.fs1.hubspotusercontent-na1.net/hubfs/7528302/raw_assets/public/mV0_d-EmailTemplate_hubspot/email/images/birthday-2.png" },
    { title: "Black Friday", img: "https://7528315.fs1.hubspotusercontent-na1.net/hubfs/7528315/raw_assets/public/mV0_d-EmailTemplate_hubspot/email/images/black-friday-2.png" },
    { title: "Cyber Monday", img: "https://7528315.fs1.hubspotusercontent-na1.net/hubfs/7528315/raw_assets/public/mV0_d-EmailTemplate_hubspot/email/images/cyber-monday-2.png" },
    { title: "E-Book", img: "https://7528304.fs1.hubspotusercontent-na1.net/hubfs/7528304/raw_assets/public/mV0_d-EmailTemplate_hubspot/email/images/ebook-2.png" },
  ];

  const openTemplate = (t) => {
    if (t.enabled) {
      router.push('/marketing/email/builder')
    } else {
      console.log('Template not enabled:', t.title)
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6">
          <div className="text-sm text-hubspot-secondary cursor-pointer mb-2">{`< Back to emails`}</div>
          <h1 className="text-2xl font-semibold text-hubspot-primary">Select a template</h1>
        </div>

        <Tabs defaultValue="drag" className="w-full">
          <TabsList className="h-12 bg-transparent border-b border-gray-200 rounded-none p-0 w-full justify-start">
            <TabsTrigger 
              value="drag" 
              className="rounded-none border-b-5 border-transparent data-[state=active]:border-[rgb(51,71,91)] data-[state=active]:bg-transparent bg-transparent text-hubspot-primary data-[state=active]:text-hubspot-primary px-6 py-3 mr-6 font-medium"
              style={{ borderBottomWidth: '5px' }}
            >
              Drag and drop
            </TabsTrigger>
            <TabsTrigger 
              value="custom" 
              className="rounded-none border-b-5 border-transparent data-[state=active]:border-[rgb(51,71,91)] data-[state=active]:bg-transparent bg-transparent text-hubspot-primary data-[state=active]:text-hubspot-primary px-6 py-3 mr-6 font-medium"
              style={{ borderBottomWidth: '5px' }}
            >
              Custom
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drag" className="mt-6">
            {/* Top search and create */}
            
            <div className="flex gap-8">
              {/* Left categories */}
              <div className="w-64 rounded-md p-2 h-fit">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-64 p-2 ">
                    <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-hubspot-primary/70" />
                    <input
                        className='bg-inactive-background border rounded-sm border-hubspot-view-tab-border-color font-medium text-hubspot-primary text-base pl-3 h-10 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-hubspot-inset-ring-color'
                        type="text"
                        placeholder='Search templates'
                    />
                  </div>
                </div>
                <div className="px-3 py-2 text-sm flex justify-between font-light text-gray-500">
                  <span>
                    Saved templates
                  </span>
                  <span>
                    0
                  </span>
                </div>
                <div className="border-t border-gray-200 my-2" />
                <div className="flex flex-col">
                  {categories.map((c) => (
                    <button key={c.name} className={`flex rounded-tl-none rounded-bl-none items-center justify-between px-3 py-2 text-sm rounded ${c.active ? 'border-l-4 border-hubspot-secondary bg-[rgb(229,245,248)] text-hubspot-secondary' : 'hover:bg-gray-50 text-hubspot-primary'}`}>
                      <span>{c.name}</span>
                      <span className="text-hubspot-primary">{c.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right templates */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-hubspot-primary mb-4">All templates</h2>
               

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((t, idx) => (
                    <div key={`${t.title}-${idx}`} className="flex flex-col items-start justify-start">
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden min-h-72 relative">
                        <div className="bg-gray-100 relative flex items-center justify-center h-full">
                          <img src={t.img} alt={t.title} className="w-full h-full object-fit opacity-80" />
                          
                          {/* Disabled overlay */}
                          {!t.enabled && (
                            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                              <div className="bg-white px-4 py-2 rounded text-gray-600 font-medium">
                                Coming Soon
                              </div>
                            </div>
                          )}
                          
                          {/* Hover overlay */}
                          {t.enabled && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Button onClick={() => openTemplate(t)} className="mb-2 bg-white text-hubspot-primary border border-gray-300 hover:bg-gray-50">Choose template</Button>
                              <Button variant="outline" className="bg-white text-hubspot-primary border border-gray-300">Preview</Button>
                            </div>
                          )}
                        </div>
                      </div>

                      <button className='flex justify-start items-center py-4 px-2 relative '>
                      <a
                          href='#'
                          className={`font-bold text-sm ${t.enabled ? 'text-hubspot-secondary' : 'text-gray-400'}`}
                      >
                          {t.title}
                      </a>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="mt-6">
            <div className="text-hubspot-primary text-sm">Custom templates coming soon.</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 