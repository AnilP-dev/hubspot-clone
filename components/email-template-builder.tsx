"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addEmail, updateEmail } from "@/lib/store/slices/emailsSlice"
import type { DroppedElement } from "@/lib/store/slices/emailsSlice"
import { 
  ChevronDown, 
  Search, 
  Plus, 
  X,
  Edit,
  Inbox,
  Send,
  Calendar,
  Settings,
  Zap,
  TestTube,
  Monitor,
  Smartphone,
  Undo,
  Redo,
  Eye,
  Globe,
  HelpCircle
} from "lucide-react"

interface Module {
  id: string
  name: string
  icon: React.ReactNode
  category: string
  badge?: string
}


export function EmailTemplateBuilder() {
  const dispatch = useDispatch()
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [droppedElements, setDroppedElements] = useState<DroppedElement[]>([])
  const [draggedModule, setDraggedModule] = useState<Module | null>(null)
  const [draggedElement, setDraggedElement] = useState<DroppedElement | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  
  // Email details state
  const [emailName, setEmailName] = useState("New email")
  const [isEditingName, setIsEditingName] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [previewText, setPreviewText] = useState("")
  const [fromName, setFromName] = useState("Rituparn Gehlot")
  const [fromAddress, setFromAddress] = useState("rituparn.g@turing.com")

  const recentlyUsedModules: Module[] = [
    {
      id: "text-1",
      name: "Text", 
      icon: (
        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white">
          <div className="text-xs text-gray-600">
            <div className="w-7 h-1 bg-gray-400 mb-0.5"></div>
            <div className="w-6 h-1 bg-gray-400 mb-0.5"></div>
            <div className="w-5 h-1 bg-gray-400"></div>
          </div>
        </div>
      ),
      category: "recently-used"
    },
    {
      id: "button-1", 
      name: "Button",
      icon: (
        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white">
          <div className="w-14 h-4 bg-blue-500 rounded-sm text-[6px] text-white flex items-center justify-center">
            BTN
          </div>
        </div>
      ),
      category: "recently-used"
    }
  ]

  const baseModules: Module[] = [
    {
      id: "text-base",
      name: "Text",
      icon: (
        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white">
          <div className="text-xs text-gray-600">
            <div className="w-4 h-1 bg-gray-400 mb-0.5"></div>
            <div className="w-3 h-1 bg-gray-400 mb-0.5"></div>
            <div className="w-4 h-1 bg-gray-400"></div>
          </div>
        </div>
      ),
      category: "base"
    },
    {
      id: "button-base",
      name: "Button", 
      icon: (
        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white">
          <div className="w-14 h-4 bg-blue-500 rounded-sm text-[6px] text-white flex items-center justify-center">
            BTN
          </div>
        </div>
      ),
      category: "base"
    },
    {
      id: "social",
      name: "Social",
      icon: (
        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          </div>
        </div>
      ),
      category: "base"
    },
    {
      id: "html", 
      name: "HTML",
      icon: (
        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white">
          <div className="text-base text-gray-600 font-mono">
            &lt;/&gt;
          </div>
        </div>
      ),
      category: "base"
    }
  ]

  const mediaModules: Module[] = [
    {
      id: "image",
      name: "Image",
      icon: (
        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white">
          <div className="w-4 h-3 border border-gray-400 rounded-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 border border-gray-400 rounded-full"></div>
          </div>
        </div>
      ),
      category: "media"
    },
    {
      id: "video",
      name: "Video", 
      icon: (
        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white">
          <div className="w-4 h-3 bg-gray-800 rounded-sm flex items-center justify-center">
            <div className="w-0 h-0 border-l-[3px] border-l-white border-y-[2px] border-y-transparent"></div>
          </div>
        </div>
      ),
      category: "media"
    }
  ]

  const structureModules: Module[] = [
    {
      id: "divider",
      name: "Divider",
      icon: (
        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white">
          <div className="w-5 h-px bg-gray-400"></div>
        </div>
      ),
      category: "structure"
    },
    {
      id: "footer", 
      name: "Footer",
      icon: (
        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white">
          <div className="text-xs">
            <div className="w-5 h-2 bg-gray-300 rounded-t mb-0.5"></div>
            <div className="w-4 h-1 bg-gray-400"></div>
          </div>
        </div>
      ),
      category: "structure"
    }
  ]

  const ecommerceModules: Module[] = [
    {
      id: "products",
      name: "Products",
      icon: (
        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white">
          <div className="w-6 h-6 bg-orange-100 rounded border-2 border-orange-300 flex items-center justify-center">
            <div className="w-4 h-4 bg-orange-400 rounded"></div>
          </div>
        </div>
      ),
      category: "ecommerce"
    },
    {
      id: "cart",
      name: "Cart", 
      icon: (
        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white">
          <div className="text-blue-500 text-2xl font-semibold">
            🛒
          </div>
        </div>
      ),
      category: "ecommerce",
      badge: "BETA"
    },
    {
      id: "payments",
      name: "Payments",
      icon: (
        <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white">
          <div className="w-12 h-6 bg-green-100 rounded border border-green-300 flex items-center justify-center">
            <div className="text-base text-green-600">$</div>
          </div>
        </div>
      ),
      category: "ecommerce"
    }
  ]

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, module: Module) => {
    setDraggedModule(module)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    // Set appropriate drop effect based on what's being dragged
    if (draggedElement) {
      e.dataTransfer.dropEffect = 'move'
    } else if (draggedModule) {
      e.dataTransfer.dropEffect = 'copy'
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    
    // Handle dropping new modules from sidebar (only when no element is being dragged)
    if (draggedModule && !draggedElement) {
      const newElement: DroppedElement = {
        id: `${draggedModule.id}-${Date.now()}`,
        type: draggedModule.name.toLowerCase(),
        content: draggedModule.name === 'Text' 
          ? 'Something Powerful\nTell The Reader More\n\nThe headline and subheader tells us what you\'re offering, and the form header closes the deal. Over here you can explain why your offer is so great it\'s worth filling out a form for.\n\nRemember:\n• Bullets are great\n• For spelling out benefits and\n• Turning visitors into leads.'
          : draggedModule.name === 'Button' 
          ? 'Edit this button'
          : `${draggedModule.name} content`,
        style: draggedModule.name === 'Button' 
          ? { backgroundColor: '#007cba', color: 'white', padding: '12px 24px', borderRadius: '4px' }
          : {}
      }

      setDroppedElements(prev => [...prev, newElement])
      setDraggedModule(null)
    }
    
    // Only clean up drag states if this is a module drop, not element reordering
    if (draggedModule && !draggedElement) {
      setDraggedElement(null)
      setDragOverIndex(null)
    }
  }

  // New handlers for element dragging
  const handleElementDragStart = (e: React.DragEvent, element: DroppedElement) => {
    setDraggedElement(element)
    setDraggedModule(null) // Clear any module drag
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', '') // Required for some browsers
  }


  const handleElementDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!draggedElement) return

    const currentIndex = droppedElements.findIndex(el => el.id === draggedElement.id)
    
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      const newElements = [...droppedElements]
      const [movedElement] = newElements.splice(currentIndex, 1)
      
      // Insert at the target index (adjust for removal if moving forward)
      const insertIndex = currentIndex < targetIndex ? targetIndex - 1 : targetIndex
      newElements.splice(insertIndex, 0, movedElement)
      
      setDroppedElements(newElements)
    }
    
    setDraggedElement(null)
    setDragOverIndex(null)
  }

  const handleReviewAndSend = () => {
    // Create new email object
    const emailId = `email-${Date.now()}`
    const now = new Date()
    
    const newEmail = {
      id: emailId,
      name: emailName,
      delivered: 0,
      openRate: '0%',
      clickRate: '0%',
      lastUpdatedAt: now.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      lastUpdatedBy: fromName,
      status: 'draft' as const,
      type: 'marketing' as const,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      // Email builder data
      subject: emailSubject,
      previewText: previewText,
      fromName: fromName,
      fromAddress: fromAddress,
      content: droppedElements,
      template: 'drag-drop'
    }
    
    // Save to Redux store (localStorage sync happens automatically in reducer)
    dispatch(addEmail(newEmail))
    
    // Navigate to email details page
    router.push(`/marketing/email/${emailId}`)
  }

  const handleNameEdit = () => {
    setIsEditingName(true)
  }

  const handleNameSave = () => {
    setIsEditingName(false)
  }

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditingName(false)
    }
    if (e.key === 'Escape') {
      setIsEditingName(false)
    }
  }

  const renderDroppedElement = (element: DroppedElement, index: number) => {
    
    switch (element.type) {
      case 'text':
        return (
          <div 
            key={element.id} 
            className={`group relative p-4 hover:bg-blue-50 border-2 rounded cursor-move transition-all border-transparent hover:border-blue-200 ${
              draggedElement?.id === element.id ? 'opacity-50' : ''
            }`}
            draggable
            onDragStart={(e) => handleElementDragStart(e, element)}
          >
            <div className="prose max-w-none">
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
            {/* Drag handle indicator */}
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="p-1 bg-white border border-gray-300 rounded shadow-sm cursor-move">
                <svg className="w-3 h-3 text-gray-400" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM8 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM11 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"/>
                  <path d="M2 4a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM8 4a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM11 4a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"/>
                  <path d="M2 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM8 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM11 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"/>
                </svg>
              </div>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <button className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50">
                  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                </button>
                <button className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50">
                  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </button>
                <button className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50">
                  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )
      case 'button':
        return (
          <div 
            key={element.id} 
            className={`group relative p-4 hover:bg-blue-50 border-2 rounded cursor-move transition-all border-transparent hover:border-blue-200 ${
              draggedElement?.id === element.id ? 'opacity-50' : ''
            }`}
            draggable
            onDragStart={(e) => handleElementDragStart(e, element)}
          >
            <div className="flex justify-center">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium"
                style={element.style}
              >
                {element.content}
              </button>
            </div>
            {/* Drag handle indicator */}
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="p-1 bg-white border border-gray-300 rounded shadow-sm cursor-move">
                <svg className="w-3 h-3 text-gray-400" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM8 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM11 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"/>
                  <path d="M2 4a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM8 4a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM11 4a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"/>
                  <path d="M2 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM8 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM11 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"/>
                </svg>
              </div>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <button className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50">
                  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                </button>
                <button className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50">
                  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </button>
                <button className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50">
                  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div key={element.id} className="p-4 border border-gray-200 rounded">
            <p>{element.content}</p>
          </div>
        )
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Header */}
      <div className="bg-hubspot-primary text-white px-4 py-2 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 h-8">
            Exit
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 h-8 gap-1">
              File
              <ChevronDown className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 h-8 gap-1">
              Help
              <ChevronDown className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Center - Email Name */}
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <input
              type="text"
              value={emailName}
              onChange={(e) => setEmailName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={handleNameKeyDown}
              className="bg-white/10 text-white font-medium px-2 py-1 rounded border border-white/20 focus:outline-none focus:ring-1 focus:ring-white/40 focus:border-white/40 min-w-[200px]"
              autoFocus
            />
          ) : (
            <>
              <span className="text-white font-medium">{emailName}</span>
              <Edit 
                className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" 
                onClick={handleNameEdit}
              />
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 h-8">
            Save
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 h-8 gap-1">
            Preview and test
            <ChevronDown className="w-3 h-3" />
          </Button>
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white h-8"
            onClick={handleReviewAndSend}
          >
            Review and send
          </Button>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex items-center justify-between py-4 pb-0">
          <div className="flex items-center mx-auto gap-4">
            
            <Button variant="ghost" size="sm" className="text-hubspot-primary border-b-4 border-hubspot-primary h-10 rounded-none">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>


            <Button disabled variant="ghost" size="sm" className="text-gray-600 hover:text-hubspot-secondary h-10">
              <Inbox className="w-4 h-4 mr-2" />
              <span className="flex flex-col">
                Inbox
                <span className="text-xs">
                </span>
              </span>

            </Button>
            <Button disabled variant="ghost" size="sm" className="text-gray-600 hover:text-hubspot-secondary h-10">
              <Send className="w-4 h-4 mr-2" />
             
              <span className="flex flex-col">
                Send to
                <span className="text-xs">
                </span>
              </span>
            </Button>
            <Button disabled variant="ghost" size="sm" className="text-gray-600 hover:text-hubspot-secondary h-10">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="flex flex-col">
              Schedule
                <span className="text-xs">
                </span>
              </span>
            </Button>
            <Button disabled variant="ghost" size="sm" className="text-gray-600 hover:text-hubspot-secondary h-10">
              <Settings className="w-4 h-4 mr-2" />
              
              <span className="flex flex-col">
                Setup
                <span className="text-xs">
                </span>
              </span>
            </Button>
            <Button disabled variant="ghost" size="sm" className="text-gray-600 hover:text-hubspot-secondary h-10">
              <Zap className="w-4 h-4 mr-2" />
              
              <span className="flex flex-col">
                Automate
                <span className="text-xs">
                </span>
              </span>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="p-1">
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1">
                <Redo className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-hubspot-secondary gap-1">
              <TestTube className="w-4 h-4" />
              A/B test
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Sidebar - Tool Icons */}
        <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-4">
          <button
            className={`p-3 rounded-lg transition-colors ${
              activeTab === "modules" 
                ? "bg-gray-300" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(activeTab === "modules" ? "" : "modules")}
          >
            <Plus className="w-5 h-5" />
          </button>
          
          <button
            className="p-3 rounded-lg text-gray-400 cursor-not-allowed"
            disabled
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z"/>
              <polyline points="7.5,10.5 12,8 16.5,10.5"/>
              <polyline points="7.5,13.5 12,11 16.5,13.5"/>
            </svg>
          </button>
          
          <button
            className="p-3 rounded-lg text-gray-400 cursor-not-allowed"
            disabled
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c-1.2-4.8-6-8-9-8s-7.8 3.2-9 8c1.2 4.8 6 8 9 8s7.8-3.2 9-8z"/>
            </svg>
          </button>
        </div>

        {/* Expandable Sidebar Tray */}
        <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
          activeTab === "modules" ? "w-[434px]" : "w-0"
        } overflow-hidden`}>
          {activeTab === "modules" && (
            <>
              {/* Add Header */}
              <div className="p-0 ">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                      <span className="font-medium px-4">Add</span>
                  </div>

                  <Button variant="ghost" size="sm" className="p-1">
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Internal Tabs */}
                <div className="flex">
                {/* <div
                className={`grow max-w-md relative flex items-center px-4 py-3 border-r border-b border-l border-t border-hubspot-view-tab-border-color cursor-pointer  ${
                  activeTab === tab.id
                    ? 'bg-white text-hubspot-primary border-b-0'
                    : 'bg-inactive-background text-hubspot-primary hover:bg-gray-100'
                }`}
                draggable
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span className="text-sm font-light">{tab.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleTabClose(tab.id)
                    }}
                    className="p-0.5 hover:bg-gray-200 rounded ml-auto"
                  >
                    <X className="h-3 w-3 text-gray-400" />
                  </button>
              </div> */}

                  <button 
                    className="flex-1 px-4 py-2 text-sm font-medium border-r border-l-0 border-t border-hubspot-view-tab-border-color cursor-pointer bg-white text-hubspot-primary border-b-0">
                    Modules
                  </button>

                  <button 
                    className="flex-1 px-4 py-2 text-sm font-medium border border-l-0  border-hubspot-view-tab-border-color cursor-pointer bg-inactive-background text-hubspot-primary hover:bg-gray-100">
                    Sections
                  </button>
                </div>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">

            <div className=' bg-inactive-background w-full relative'>
                <input
                    className='border py-5 rounded-sm bg-inactive-background border-hubspot-view-tab-border-color font-medium text-hubspot-primary text-base pl-2 h-8 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-hubspot-inset-ring-color'
                    type="text"
                    placeholder='Search'
                />
                <Search size={15} color='#33475b' className=' text-hubspot-primary font-light absolute right-6 top-1/2 -translate-y-1/2'/>
            </div>
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-9"
              />
            </div> */}
          </div>

              {/* Modules Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-6">
                {/* Recently Used */}
                <div className="border-b border-gray-200">
                  <button className="flex items-center justify-between w-full mb-3 text-left">
                    <span className="text-sm font-medium text-gray-900">Recently used modules</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  <div className="grid grid-cols-4 gap-3 ">
                    {recentlyUsedModules.map((module) => (
                      <div 
                        key={module.id} 
                        className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                        draggable
                        onDragStart={(e) => handleDragStart(e, module)}
                      >
                        {module.icon}
                        <span className="text-xs text-gray-700 mt-1">{module.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Default Modules */}
                <div>
                  <button className="flex items-center justify-between w-full mb-3 text-left">
                    <span className="text-sm font-medium text-gray-900">All default modules (11)</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Base */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-600 mb-2">Base</h4>
                    <div className="grid grid-cols-4 gap-3">
                      {baseModules.map((module) => (
                        <div 
                          key={module.id} 
                          className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                          draggable
                          onDragStart={(e) => handleDragStart(e, module)}
                        >
                          {module.icon}
                          <span className="text-xs text-gray-700 mt-1">{module.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Media */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-600 mb-2">Media</h4>
                    <div className="grid grid-cols-4 gap-3">
                      {mediaModules.map((module) => (
                        <div key={module.id} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                          {module.icon}
                          <span className="text-xs text-gray-700 mt-1">{module.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Structure */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-600 mb-2">Structure</h4>
                    <div className="grid grid-cols-4 gap-3">
                      {structureModules.map((module) => (
                        <div key={module.id} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                          {module.icon}
                          <span className="text-xs text-gray-700 mt-1">{module.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ecommerce */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-600 mb-2">Ecommerce</h4>
                    <div className="grid grid-cols-4 gap-3">
                      {ecommerceModules.map((module) => (
                        <div key={module.id} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer relative">
                          {module.icon}
                          <span className="text-xs text-gray-700 mt-1">{module.name}</span>
                          {module.badge && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-[8px] px-1 rounded">
                              {module.badge}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Header */}
          <div className="bg-inactive-background border-b border-gray-200 px-6 py-3 flex items-center justify-center">
            <div className="flex-1 flex items-center justify-center gap-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Monitor className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Smartphone className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-hubspot-secondary gap-1">
                  Display options
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </div>
            </div>

            
            <div className="text-right">
              <span className="text-sm text-gray-600">Estimated size: 9.9KB</span>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-white p-6 overflow-auto">
            <div className="max-w-2xl mx-auto">
              {/* Email Canvas */}
              <div className="bg-inactive-background shadow-lg rounded-lg overflow-hidden mt-10">
                {/* Canvas Drop Zone */}
                <div 
                  className="min-h-32 border-2 border-dashed border-gray-300 flex items-center justify-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {droppedElements.length === 0 ? (
                    <div className="text-center">
                      <p className="text-gray-400 mb-2">Drop and drop content or a grid layout here.</p>
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <button className="text-hubspot-secondary hover:underline">Unsubscribe</button>
                        <button className="text-hubspot-secondary hover:underline">Manage preferences</button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full space-y-2">
                      {droppedElements.map((element, index) => (
                        <div key={element.id}>
                          {/* Drop zone above each element for reordering */}
                          <div 
                            className={`h-2 transition-all ${
                              draggedElement && dragOverIndex === index 
                                ? 'bg-blue-200 border-t-2 border-blue-400' 
                                : 'hover:bg-gray-100'
                            }`}
                            onDragOver={(e) => {
                              e.preventDefault()
                              if (draggedElement) {
                                setDragOverIndex(index)
                              }
                            }}
                            onDrop={(e) => {
                              e.preventDefault()
                              if (draggedElement) {
                                handleElementDrop(e, index)
                              }
                            }}
                          />
                          {renderDroppedElement(element, index)}
                          {/* Drop zone at the end if this is the last element */}
                          {index === droppedElements.length - 1 && (
                            <div 
                              className={`h-2 transition-all ${
                                draggedElement && dragOverIndex === index + 1 
                                  ? 'bg-blue-200 border-t-2 border-blue-400' 
                                  : 'hover:bg-gray-100'
                              }`}
                              onDragOver={(e) => {
                                e.preventDefault()
                                if (draggedElement) {
                                  setDragOverIndex(index + 1)
                                }
                              }}
                              onDrop={(e) => {
                                e.preventDefault()
                                if (draggedElement) {
                                  handleElementDrop(e, index + 1)
                                }
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Tools */}
        <div className="w-16 bg-white border-l border-gray-200 flex flex-col items-center py-4 gap-4">
          <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-sm"></div>
              </div>
            </div>
          </Button>

          <div className="w-full h-px bg-gray-200"></div>

          <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
            <div className="w-6 h-6 text-blue-500">✦</div>
          </Button>

          <div className="w-full h-px bg-gray-200"></div>

          <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
            <div className="w-6 h-6 text-gray-400 flex items-center justify-center">📄</div>
          </Button>

          <div className="flex-1"></div>

          <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
            <Globe className="w-5 h-5 text-gray-400" />
          </Button>

          <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
            <HelpCircle className="w-5 h-5 text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  )
}