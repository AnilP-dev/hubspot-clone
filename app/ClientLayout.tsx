"use client"

import type React from "react"
import "./globals.css"
import { HubSpotSidebar } from "@/components/hubspot-sidebar"
import { HubSpotTopBar } from "@/components/hubspot-topbar"
import { Toaster } from "sonner"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { useState } from "react"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
  }

  return (
    <html lang="en">
      <body className="font-sans">
        <ReduxProvider>
          <div className="flex min-h-screen w-full">
            <HubSpotSidebar isExpanded={sidebarExpanded} onToggle={toggleSidebar} />
            <div className="hubspot-main-content">
              <HubSpotTopBar onSidebarToggle={toggleSidebar} />
              <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
            </div>
          </div>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  )
}
