"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"

interface CreateCampaignModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateCampaignModal({ isOpen, onClose }: CreateCampaignModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Create your first campaign
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="px-6 py-8 text-center">
          <p className="text-gray-600 mb-8">
            Let us help you set up a marketing campaign.
          </p>

          {/* Illustration */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-24">
              {/* Campaign illustration - simplified version matching the modal */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Computer/laptop screen */}
                  <div className="w-20 h-12 bg-gray-200 rounded-t-lg border-2 border-gray-300">
                    <div className="w-16 h-8 bg-blue-100 rounded mt-1 mx-auto flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded"></div>
                        <div className="w-2 h-2 bg-green-400 rounded"></div>
                        <div className="w-2 h-2 bg-orange-400 rounded"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded"></div>
                      </div>
                    </div>
                  </div>
                  {/* Computer base */}
                  <div className="w-24 h-2 bg-gray-300 rounded-b-lg -mt-0.5"></div>
                  
                  {/* Charts floating around */}
                  <div className="absolute -top-2 -right-4 w-6 h-6 bg-teal-400 rounded flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                  
                  <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-blue-400 rounded flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                  
                  <div className="absolute -top-1 -left-6 w-5 h-5 bg-green-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-8">
            This should take about three minutes
          </p>

          {/* Action buttons */}
          <div className="flex gap-3 justify-center">
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 font-medium"
            >
              Help me get started
            </Button>
            <Button 
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-2 font-medium"
            >
              I'll do it myself
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}