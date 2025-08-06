"use client"

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Plus,
  Edit,
  Users,
  Building2,
  DollarSign,
  ShoppingCart,
  Diamond,
  X,
  Sparkles,
  Check,
} from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { addList } from "@/lib/store/slices/listsSlice"

const getListTypeIcon = (type: string) => {
  switch (type) {
    case "contacts":
      return <Users className="w-4 h-4" />
    case "companies":
      return <Building2 className="w-4 h-4" />
    case "deals":
      return <DollarSign className="w-4 h-4" />
    case "tickets":
      return <Diamond className="w-4 h-4" />
    case "carts":
      return <ShoppingCart className="w-4 h-4" />
    case "orders":
      return <Building2 className="w-4 h-4" />
    default:
      return <Users className="w-4 h-4" />
  }
}

const getEstimatedSize = (type: string, allState: any) => {
  switch (type) {
    case "contacts":
      return allState.contacts?.contacts?.length || 0
    case "companies":
      return allState.companies?.companies?.length || 0
    case "deals":
      return allState.deals?.deals?.length || 0
    case "tickets":
    case "carts":
    case "orders":
      return 0 // No slices available yet
    default:
      return 0
  }
}

function ListBuilderContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const allState = useAppSelector((state) => state)
  
  const listType = searchParams.get("type") || "contacts"
  const [showReviewSidebar, setShowReviewSidebar] = useState(false)
  const [processingType, setProcessingType] = useState("static")
  const [description, setDescription] = useState("")
  const [isEditingName, setIsEditingName] = useState(false)
  const [listName, setListName] = useState(() => {
    const now = new Date()
    return `Unnamed list ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
  })
  const [tempName, setTempName] = useState(listName)

  const handleSaveList = () => {
    const now = new Date()
    
    const newList = {
      id: Date.now().toString(),
      name: listName,
      size: getEstimatedSize(listType, allState),
      type: processingType === "static" ? "Static" : "Active",
      object: listType.charAt(0).toUpperCase() + listType.slice(1),
      lastUpdated: now.toLocaleDateString(),
      creator: "You",
      folder: null,
      usedInCount: 0,
      description: description,
    }

    dispatch(addList(newList))
    router.push("/crm/lists")
  }

  const handleNameEdit = () => {
    setTempName(listName)
    setIsEditingName(true)
  }

  const handleNameSave = () => {
    setListName(tempName)
    setIsEditingName(false)
  }

  const handleNameCancel = () => {
    setTempName(listName)
    setIsEditingName(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave()
    } else if (e.key === 'Escape') {
      handleNameCancel()
    }
  }

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: '"Lexend Deca",Helvetica,Arial,sans-serif' }}>
      <style jsx>{`
        .text-primary { color: #33475b; }
      `}</style>
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/crm/lists" className="text-[#00BDA5] hover:text-[#00BDA5]/80 text-sm">
                  All lists
                </Link>
                <span className="text-gray-400">/</span>
                <Link href="/crm/lists/create" className="text-[#00BDA5] hover:text-[#00BDA5]/80 text-sm">
                  Add to folder
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Use AI to create filters
                </Button>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => setShowReviewSidebar(true)}
                >
                  Review and save
                </Button>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="text-xl font-medium text-primary border-[#00BDA5] focus:ring-[#00BDA5]"
                      autoFocus
                    />
                    <Button variant="ghost" size="sm" onClick={handleNameSave} className="p-1 h-auto">
                      <Check className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleNameCancel} className="p-1 h-auto">
                      <X className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-xl font-medium text-primary">{listName}</h1>
                    <Button variant="ghost" size="sm" className="p-1 h-auto" onClick={handleNameEdit}>
                      <Edit className="w-4 h-4 text-gray-400" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-2 flex items-center gap-4">
              <Badge className="bg-[#00BDA5] text-white text-xs px-2 py-1">
                {listType.toUpperCase()}
              </Badge>
              <div className="flex items-center gap-2">
                {getListTypeIcon(listType)}
                <span className="text-sm text-gray-600">Change object</span>
              </div>
              <div className="text-sm text-gray-600">
                Estimated size: {getEstimatedSize(listType, allState)} {listType}
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-180px)]">
          {/* Left Sidebar - Filters */}
          <div className="w-80 border-r border-gray-200 bg-gray-50 p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">Filters</h2>
            
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">This list doesn't have any filters</p>
              <Button className="bg-[#516F90] hover:bg-[#516F90]/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add filter
              </Button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-48 h-48 mx-auto mb-4">
                  <img className="w-full" src="https://static.hsappstatic.net/ui-images/static-2.810/optimized/contacts.svg" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Add filters to start building your list
              </h3>
              <p className="text-gray-600">
                Your filtered results will appear here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blur Overlay */}
      {showReviewSidebar && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setShowReviewSidebar(false)}
        />
      )}

      {/* Right Sidebar - Review and Save */}
      {showReviewSidebar && (
        <div className="w-[35%] bg-white border-l border-gray-200 flex flex-col fixed right-0 top-0 bottom-0 z-50 shadow-2xl">
          {/* Sidebar Header */}
          <div className="bg-[#00BDA5] text-white p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Review and save</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReviewSidebar(false)}
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div>
              <p className="text-sm text-gray-600 mb-1">Estimated list size</p>
              <p className="font-semibold text-primary">{getEstimatedSize(listType, allState)} {listType.charAt(0).toUpperCase() + listType.slice(1)}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-sm font-medium text-primary">Choose processing type</p>
                <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">?</div>
              </div>
              
              <div className="space-x-2 flex items-center">
                <div
                  className={`border-2 grow rounded-lg p-4 cursor-pointer transition-colors ${
                    processingType === "active" 
                      ? "border-[#00BDA5] bg-[#00BDA5]/5" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setProcessingType("active")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        processingType === "active" ? "border-[#00BDA5]" : "border-gray-300"
                      }`}>
                        {processingType === "active" && (
                          <div className="w-2 h-2 rounded-full bg-[#00BDA5]"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-primary">Active</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{10 - (allState.lists?.lists?.filter(l => l.type === "Active").length || 0)} available</p>
                  </div>
                </div>
                
                <div
                  className={`border-2 grow rounded-lg p-4 cursor-pointer transition-colors ${
                    processingType === "static" 
                      ? "border-[#00BDA5] bg-[#00BDA5]/5" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setProcessingType("static")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        processingType === "static" ? "border-[#00BDA5]" : "border-gray-300"
                      }`}>
                        {processingType === "static" && (
                          <div className="w-2 h-2 rounded-full bg-[#00BDA5]"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-primary">Static</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{1000 - (allState.lists?.lists?.filter(l => l.type === "Static").length || 0)} available</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-primary mb-2">Properties</p>
            </div>

            <div>
              <p className="text-sm font-medium text-primary mb-2">Description</p>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[80px] resize-none border-gray-300"
                placeholder="Add a description for this list..."
              />
              <div className="flex items-center gap-2 mt-2">
                <Button variant="ghost" size="sm" className="text-[#00BDA5] hover:bg-[#00BDA5]/10 p-0 h-auto text-sm">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Generate with AI
                </Button>
                <Badge className="bg-blue-600 text-white text-xs">BETA</Badge>
              </div>
              
              <div className="mt-4">
                <Link href="#" className="text-sm text-[#00BDA5] underline hover:no-underline">
                  Customize the 'Create list' form
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  There are no custom properties selected.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-200 p-6 space-x-3 flex ">
            <Button 
              onClick={handleSaveList}
              className=" bg-orange-500 hover:bg-orange-600 text-white"
            >
              Save and process list
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowReviewSidebar(false)}
              className=" border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export function ListBuilderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListBuilderContent />
    </Suspense>
  )
}
