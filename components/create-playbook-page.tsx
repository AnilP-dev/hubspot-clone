"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Edit,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface PlaybookTemplate {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  category: "build" | "sales" | "service"
  howItWorks: {
    title: string
    description: string
    steps: string[]
    additionalInfo?: string
  }
  preview: {
    description: string
    sections: {
      title: string
      content: string | string[]
      questions?: {
        question: string
        placeholder: string
      }[]
    }[]
  }
}

const templates: PlaybookTemplate[] = [
  {
    id: "start-from-scratch",
    name: "Start from scratch",
    description: "Start with a blank playbook. Add your own instructions and questions.",
    icon: <img src="https://static.hsappstatic.net/ui-images/static-2.802/optimized/building.svg" alt="Building" className="playbook-icons" />,
    category: "build",
    howItWorks: {
      title: "Create a playbook",
      description: "Set your team up for success with sales content when and where they need it. Build a custom playbook by adding content including text, links, images or embed codes.",
      steps: [
        "Add interactive questions",
        "Use questions in your playbook to gather and organize information from prospects. When you enter an answer it will be saved directly in your CRM.",
        "Start using playbooks",
        "Search for and access your playbooks right from the contact, company, deal or ticket record. When you take notes in the playbook, it will save as an engagement in the record's timeline."
      ]
    },
    preview: {
      description: "Introduce the purpose of your playbook here. Include any relevant instructions for your reps.",
      sections: [
        {
          title: "",
          content: "",
          questions: [
            {
              question: "Include a question you'd like answered",
              placeholder: "Notes"
            }
          ]
        }
      ]
    }
  },
  {
    id: "discovery-call",
    name: "Discovery call playbook",
    description: "Create a script to lead successful and insightful conversations with a prospect or customer.",
    icon: <img src="https://static.hsappstatic.net/ui-images/static-2.802/optimized/calling.svg" alt="Calling" className="playbook-icons" />,
    category: "sales",
    howItWorks: {
      title: "Create a playbook",
      description: "Set your team up for success with sales content when and where they need it. Build a custom playbook by adding content including text, links, images or embed codes.",
      steps: [
        "Add interactive questions",
        "Use questions in your playbook to gather and organize information from prospects. When you enter an answer it will be saved directly in your CRM.",
        "Start using playbooks",
        "Search for and access your playbooks right from the contact, company, deal or ticket record. When you take notes in the playbook, it will save as an engagement in the record's timeline."
      ]
    },
    preview: {
      description: "Use this playbook to help guide your first call with a prospect. During this call, you want to ask questions to uncover the prospect's needs, challenges and goals as they relate to your product or service.",
      sections: [
        {
          title: "Before the call, you should:",
          content: [
            "Research your prospect's business",
            "Create an agenda and send it to your prospect", 
            "Set a time and date that works for both of you"
          ]
        },
        {
          title: "Below are some key questions to ask during your discovery call.",
          content: "",
          questions: [
            {
              question: "What are the top initiatives at your company right now?",
              placeholder: "Notes"
            },
            {
              question: "Tell me about your role. What do you do day-to-day?",
              placeholder: "Notes"
            },
            {
              question: "What are your goals for the year?",
              placeholder: "Notes"
            }
          ]
        }
      ]
    }
  },
  {
    id: "qualification",
    name: "Qualification playbook",
    description: "Build a playbook to qualify prospects based on budget, authority, needs and timeline.",
    icon: <img src="https://static.hsappstatic.net/ui-images/static-2.802/optimized/qualify-leads.svg" alt="Qualify Leads" className="playbook-icons" />,
    category: "sales",
    howItWorks: {
      title: "Create a playbook",
      description: "Set your team up for success with sales content when and where they need it. Build a custom playbook by adding content including text, links, images or embed codes.",
      steps: [
        "Add interactive questions",
        "Use questions in your playbook to gather and organize information from prospects. When you enter an answer it will be saved directly in your CRM.",
        "Start using playbooks",
        "Search for and access your playbooks right from the contact, company, deal or ticket record. When you take notes in the playbook, it will save as an engagement in the record's timeline."
      ]
    },
    preview: {
      description: "Use the BANT sales qualification framework to find out:",
      sections: [
        {
          title: "",
          content: [
            "Budget: Is the prospect capable of buying?",
            "Authority: Does your contact have adequate authority to sign off on a purchase?",
            "Need: Does the prospect have a business pain you can solve?",
            "Timeline: When is the prospect planning to buy?"
          ]
        },
        {
          title: "Below are some key questions to ask.",
          content: "",
          questions: [
            {
              question: "Do you have a budget set aside for this purchase? What is it?",
              placeholder: "Notes"
            },
            {
              question: "Who else will be involved in the purchasing decision?",
              placeholder: "Notes"
            },
            {
              question: "What challenges are you struggling with?",
              placeholder: "Notes"
            },
            {
              question: "How quickly do you need to solve your problem?",
              placeholder: "Notes"
            }
          ]
        }
      ]
    }
  },
  {
    id: "business-review",
    name: "Business review playbook",
    description: "Build a playbook to run recurring business reviews that deepen relationships with customers and uncover areas of opportunity.",
    icon: <img src="https://static.hsappstatic.net/ui-images/static-2.802/optimized/conversation-assignment.svg" alt="Conversation Assignment"  className="playbook-icons"/>,
    category: "service",
    howItWorks: {
      title: "Create a playbook",
      description: "Set your team up for success with sales content when and where they need it. Build a custom playbook by adding content including text, links, images or embed codes.",
      steps: [
        "Add interactive questions",
        "Use questions in your playbook to gather and organize information from prospects. When you enter an answer it will be saved directly in your CRM.",
        "Start using playbooks",
        "Search for and access your playbooks right from the contact, company, deal or ticket record. When you take notes in the playbook, it will save as an engagement in the record's timeline."
      ]
    },
    preview: {
      description: "Check-ins, such as a business review, can deepen your relationship with the customer and uncover areas of additional opportunity.",
      sections: [
        {
          title: "Meeting Prep",
          content: "In advance of your quarterly business review with your customer, you should complete the following:"
        },
        {
          title: "",
          content: [
            "Prepare a summary showing customer usage of the product or benefits your service has provided",
            "Measure customer progress against the previous QBR or their success metrics defined during the onboarding process",
            "Review the customer's open tickets for discussion",
            "Share an agenda with your customer in advance of the meeting"
          ]
        },
        {
          title: "Questions to Ask During Meeting",
          content: "",
          questions: [
            {
              question: "Has your team or team structure changed since our last meeting?",
              placeholder: "Notes"
            },
            {
              question: "What are points of frustration with your current products/services?",
              placeholder: "Notes"
            },
            {
              question: "What are your goals for the next business cycle (e.g., quarter) and how will you measure progress?",
              placeholder: "Notes"
            }
          ]
        },
        {
          title: "Fill After Meeting",
          content: "",
          questions: [
            {
              question: "Is the customer a good fit for other products or services?",
              placeholder: "Notes"
            }
          ]
        }
      ]
    }
  },
  {
    id: "customer-onboarding",
    name: "Customer onboarding playbook",
    description: "Build a playbook to kick-off a new customer relationship.",
    icon: <img src="https://static.hsappstatic.net/ui-images/static-2.802/optimized/crm-onboarding-intro.svg" alt="CRM Onboarding" className="playbook-icons" />,
    category: "service",
    howItWorks: {
      title: "Create a playbook",
      description: "Set your team up for success with sales content when and where they need it. Build a custom playbook by adding content including text, links, images or embed codes.",
      steps: [
        "Add interactive questions",
        "Use questions in your playbook to gather and organize information from prospects. When you enter an answer it will be saved directly in your CRM.",
        "Start using playbooks",
        "Search for and access your playbooks right from the contact, company, deal or ticket record. When you take notes in the playbook, it will save as an engagement in the record's timeline."
      ]
    },
    preview: {
      description: "Use this playbook to help guide your first call with a newly acquired customer. During this call, you want to ask questions to uncover the prospect's reason for coming to your company and deepen your partnership.",
      sections: [
        {
          title: "Meeting Prep",
          content: "Review the customer's sales history and speak with the sales rep"
        },
        {
          title: "",
          content: [
            "Share welcome packet with customer. Sample here",
            "Set a time and date that works for both of you.",
            "Set up onboarding-specific properties in appropriate object to update during the call (e.g., primary point-of-contact at company)",
            "Below are some key questions to ask during your introductory call"
          ]
        },
        {
          title: "",
          content: "",
          questions: [
            {
              question: "Have you completed the onboarding guide we shared in advance of this call?",
              placeholder: "Notes"
            },
            {
              question: "What are your overarching goals for this project/product? What needs to be done in the short-term vs. long-term?",
              placeholder: "Notes"
            },
            {
              question: "Have you worked with a similar product/service provider in the past?",
              placeholder: "Notes"
            },
            {
              question: "Who are the main points of contact or agencies we will be working with?",
              placeholder: "Notes"
            },
            {
              question: "What specific metrics can we use to measure success for this project?",
              placeholder: "Notes"
            }
          ]
        }
      ]
    }
  }
]

export function CreatePlaybookPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<PlaybookTemplate | null>(null)
  const [activeTab, setActiveTab] = useState<"how-it-works" | "preview">("how-it-works")
  const [playbookTitle, setPlaybookTitle] = useState("Add title")

  const buildYourOwnTemplates = templates.filter(t => t.category === "build")
  const salesTemplates = templates.filter(t => t.category === "sales")
  const serviceTemplates = templates.filter(t => t.category === "service")

  const handleTemplateSelect = (template: PlaybookTemplate) => {
    setSelectedTemplate(template)
  }

  const handleBackToPlaybooks = () => {
    router.push("/crm/playbooks")
  }

  const handleCreatePlaybook = () => {
    // Navigate to the editor with the selected template
    router.push("/crm/playbooks/editor")
  }

  return (
    <div className="h-full bg-white relative" style={{ fontFamily: '"Lexend Deca",Helvetica,Arial,sans-serif' }}>
      <style jsx>{`
        * {
          font-family: "Lexend Deca", Helvetica, Arial, sans-serif;
        }
        .text-primary { color: #33475b; }
        .text-teal { color: #00BDA5; }
        .bg-teal { background-color: #00BDA5; }
        .border-teal { border-color: #00BDA5; }
        .text-orange { color: #FF7A00; }
        .bg-orange { background-color: #FF7A00; }
      `}</style>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gray-700 text-white px-6 py-3 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 justify-between w-1/2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToPlaybooks}
              className="text-white text-lg font-semibold hover:text-white hover:bg-gray-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to playbooks
            </Button>
            <div className="flex items-center gap-2">
              <Input
                value={playbookTitle}
                onChange={(e) => setPlaybookTitle(e.target.value)}
                className="bg-transparent border-none text-white text-lg font-medium focus:ring-0 p-0 h-auto"
              />
              <Edit className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <Button 
            className="bg-orange-500 hover:bg-orange/90 text-white font-semibold px-8"
            onClick={handleCreatePlaybook}
          >
            Create playbook
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full pt-16">
        {/* Left Sidebar - Templates */}
        <div className="max-w-xl border-r border-gray-200 p-6 overflow-y-auto">
          
          {/* Build your own */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-primary mb-4">Build your own</h3>
            {buildYourOwnTemplates.map((template) => (
              <div
                key={template.id}
                className={`p-4 border-teal-500 border rounded-lg cursor-pointer mb-3 ${
                  selectedTemplate?.id === template.id 
                    ? "border-teal-500 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="flex  gap-3 items-center min-h-40">
                  <div className="text-teal">{template.icon}</div>
                  <div>
                    <h4 className="font-medium text-primary mb-1">{template.name}</h4>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sales playbook templates */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-primary mb-4">Sales playbook templates</h3>
            {salesTemplates.map((template) => (
              <div
                key={template.id}
                className={`p-4 border-teal-500 border rounded-lg cursor-pointer mb-3 ${
                  selectedTemplate?.id === template.id 
                    ? "border-teal bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="flex items-center gap-3 min-h-40">
                  <div className="text-teal w-[120px]">{template.icon}</div>
                  <div>
                    <h4 className="font-medium text-primary mb-1">{template.name}</h4>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service playbook templates */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">Service playbook templates</h3>
            {serviceTemplates.map((template) => (
              <div
                key={template.id}
                className={`p-4 border-teal-500 border rounded-lg cursor-pointer mb-3 ${
                  selectedTemplate?.id === template.id 
                    ? "border-teal bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="flex items-center gap-3 min-h-40">
                  <div className="text-teal-200 w-[120px]">{template.icon}</div>
                  <div>
                    <h4 className="font-medium text-primary mb-1">{template.name}</h4>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col">
          {selectedTemplate ? (
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
              <div className="max-w-2xl">
                {/* Card container with tabs */}
                <div className="bg-white rounded-xs border border-gray-200" style={{boxShadow: 'rgba(44, 61, 79, 0.12) 0px 1px 5px 0px'}}>
                  {/* Tabs inside card */}
                  <div className="border-b border-gray-200 px-6 py-3 pb-0">
                    <div className="flex gap-6">
                      <button
                        className={`px-3 py-2 text-sm font-medium border-b-2 ${
                          activeTab === "how-it-works"
                            ? "border-teal-500 text-teal"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setActiveTab("how-it-works")}
                      >
                        How it works
                      </button>
                      <button
                        className={`px-3 py-2 text-sm font-medium border-b-2 ${
                          activeTab === "preview"
                            ? "border-teal-500 text-teal"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setActiveTab("preview")}
                      >
                        Preview
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {activeTab === "how-it-works" ? (
                      <div>
                        <h2 className="text-xl font-medium text-primary mb-4">
                          {selectedTemplate.howItWorks.title}
                        </h2>
                        <p className="text-gray-600 mb-6">
                          {selectedTemplate.howItWorks.description}
                        </p>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-primary">
                            Add interactive questions
                          </h3>
                          <p className="text-gray-600">
                            Use questions in your playbook to gather and organize information from prospects. When you 
                            enter an answer it will be saved directly in your CRM.
                          </p>
                          
                          <h3 className="text-lg font-medium text-primary">
                            Start using playbooks
                          </h3>
                          <p className="text-gray-600">
                            Search for and access your playbooks right from the contact, company, deal or ticket record. 
                            When you take notes in the playbook, it will save as an engagement in the record's timeline.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-700 mb-6">
                          {selectedTemplate.preview.description}
                        </p>

                        {selectedTemplate.preview.sections.map((section, index) => (
                          <div key={index} className="mb-6">
                            {section.title && (
                              <h4 className="text-lg font-medium text-primary mb-4">{section.title}</h4>
                            )}
                            
                            {typeof section.content === "string" && section.content && (
                              <p className="text-gray-600 mb-4">{section.content}</p>
                            )}
                            
                            {Array.isArray(section.content) && section.content.length > 0 && (
                              <ol className="list-decimal list-inside text-gray-600 mb-4 space-y-1">
                                {section.content.map((item, itemIndex) => (
                                  <li key={itemIndex}>{item}</li>
                                ))}
                              </ol>
                            )}

                            {section.questions && (
                              <div className="space-y-4">
                                {section.questions.map((q, qIndex) => (
                                  <div key={qIndex} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white text-sm font-medium mt-1 flex-shrink-0">
                                      Q
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium text-primary mb-3">{q.question}</p>
                                      <Textarea
                                        placeholder={q.placeholder}
                                        className="bg-gray-100 border-gray-200 resize-none min-h-[80px]"
                                        rows={3}
                                        disabled
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <p className="text-lg mb-2">Select a template to get started</p>
                <p className="text-sm">Choose from the templates on the left to see how it works and preview the content.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
