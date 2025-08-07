"use client"

import { Button } from "@/components/ui/button"
import { 
  Megaphone, 
  Mail, 
  Share2, 
  Target, 
  Calendar, 
  FileText, 
  MousePointer, 
  Smartphone, 
  UserCheck, 
  Trophy, 
  Route,
  ArrowRight 
} from "lucide-react"
import Link from "next/link"

const marketingTools = [
  {
    title: "Campaigns",
    description: "Build end-to-end campaigns to maximize your marketing ROI",
    icon: Megaphone,
    href: "/marketing/campaigns",
    color: "bg-orange-500",
    comingSoon: false,
  },
  {
    title: "Email",
    description: "Create and send personalized email campaigns",
    icon: Mail,
    href: "/marketing/email", 
    color: "bg-blue-500",
    comingSoon: true,
  },
  {
    title: "Social",
    description: "Manage and publish social media content",
    icon: Share2,
    href: "/marketing/social",
    color: "bg-purple-500", 
    comingSoon: true,
  },
  {
    title: "Ads",
    description: "Create and manage advertising campaigns",
    icon: Target,
    href: "/marketing/ads",
    color: "bg-green-500",
    comingSoon: true,
  },
  {
    title: "Events",
    description: "Plan and manage marketing events",
    icon: Calendar,
    href: "/marketing/events",
    color: "bg-indigo-500",
    comingSoon: true,
  },
  {
    title: "Forms",
    description: "Create forms to capture leads",
    icon: FileText,
    href: "/marketing/forms",
    color: "bg-teal-500",
    comingSoon: true,
  },
  {
    title: "CTAs",
    description: "Design call-to-action buttons",
    icon: MousePointer,
    href: "/marketing/ctas",
    color: "bg-pink-500",
    comingSoon: true,
  },
  {
    title: "SMS",
    description: "Send SMS marketing campaigns",
    icon: Smartphone,
    href: "/marketing/sms",
    color: "bg-yellow-500",
    comingSoon: true,
  },
  {
    title: "Buyer Intent",
    description: "Track and analyze buyer intent signals",
    icon: UserCheck,
    href: "/marketing/buyer-intent",
    color: "bg-red-500",
    comingSoon: true,
  },
  {
    title: "Lead Scoring",
    description: "Score and prioritize your leads",
    icon: Trophy,
    href: "/marketing/lead-scoring",
    color: "bg-amber-500",
    comingSoon: true,
  },
  {
    title: "Journeys",
    description: "Create automated customer journeys",
    icon: Route,
    href: "/marketing/journeys",
    color: "bg-cyan-500",
    comingSoon: true,
    badge: "BETA",
  },
]

export function MarketingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Marketing Hub</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Attract visitors, convert leads, and close customers with powerful marketing tools
              that work together seamlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketingTools.map((tool) => (
            <div
              key={tool.title}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 ${
                tool.comingSoon ? 'opacity-75' : 'hover:scale-105'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex gap-2">
                  {tool.badge && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {tool.badge}
                    </span>
                  )}
                  {tool.comingSoon && (
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{tool.description}</p>
              
              {!tool.comingSoon ? (
                <Link href={tool.href}>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white group">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <Button disabled className="w-full bg-gray-100 text-gray-400 cursor-not-allowed">
                  Coming Soon
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to grow your business?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start with campaigns to create your first end-to-end marketing campaign 
            and see results immediately.
          </p>
          <Link href="/marketing/campaigns">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-medium rounded-lg">
              Start Your First Campaign
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}