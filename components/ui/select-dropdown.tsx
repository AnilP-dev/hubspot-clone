"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"

interface Option {
  value: string
  label: string
}

interface SelectDropdownProps {
  options: Option[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SelectDropdown({ 
  options, 
  value, 
  onValueChange, 
  placeholder = "Select an option",
  className = ""
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (option: Option) => {
    onValueChange(option.value)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none flex items-center justify-between"
              >
                <span className="text-gray-900">{option.label}</span>
                {selectedOption?.value === option.value && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}