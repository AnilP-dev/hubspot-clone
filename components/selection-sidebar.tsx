"use client"

import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export interface SelectionOption {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  badge?: string | null
}

interface SelectionSidebarProps {
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  title: string
  options: SelectionOption[]
}

export function SelectionSidebar({ isOpen, onClose, onNext, title, options }: SelectionSidebarProps) {
  const [selectedOption, setSelectedOption] = useState<string>("")

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="hubspot-gradient-header flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-white/10 text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="space-y-3">
            {options.map((option) => (
              <div
                key={option.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                  selectedOption === option.id 
                    ? "hubspot-selected shadow-sm" 
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-semibold text-gray-900 text-base">{option.title}</h5>
                      {option.badge && (
                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="text-gray-600 border-gray-300"
            >
              Cancel
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={!selectedOption}
              onClick={onNext}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  )
} 