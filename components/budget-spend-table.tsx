"use client"

import { Button } from "@/components/ui/button"

export interface BudgetSpendItem {
  id: string
  name: string
  description: string
  unitPrice: number
  currency?: string
  campaignId: string
  createdDate: string
  modifiedDate: string
}

interface BudgetSpendTableProps {
  title: string
  items: BudgetSpendItem[]
  onCreateItem: () => void
  emptyStateTitle: string
  emptyStateDescription: string
  emptyStateIcon: string
  createButtonText: string
  totalLabel: string
  additionalInfo?: string
}

export function BudgetSpendTable({
  title,
  items,
  onCreateItem,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateIcon,
  createButtonText,
  totalLabel,
  additionalInfo
}: BudgetSpendTableProps) {
  const total = items.reduce((sum, item) => sum + item.unitPrice, 0)

  // If no items, don't show the section at all
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="mb-8 px-8 py-8 shadow-sm bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-hubspot-primary">{title}</h2>
        <Button 
          className="h-8 bg-gray-100 hover:bg-gray-200 text-hubspot-tertiary-text-color border border-gray-300 font-light"
          onClick={onCreateItem}
        >
          {createButtonText}
        </Button>
      </div>

      {additionalInfo && (
        <div className="mb-4">
          <span className="font-light text-xs">
            {additionalInfo}
          </span>
        </div>
      )}

      {/* Items Table - only show when items exist */}
      <div className="bg-white border border-gray-200 rounded">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-600 border-b border-gray-200">
          <div className="col-span-1">
            <span className="text-gray-400">⋮⋮</span>
          </div>
          <div className="col-span-7">NAME</div>
          <div className="col-span-2">DESCRIPTION</div>
          <div className="col-span-2">UNIT PRICE</div>
        </div>

        {/* Items */}
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
            <div className="col-span-1 flex items-center">
              <span className="text-gray-400 cursor-move">⋮⋮</span>
            </div>
            <div className="col-span-7 flex items-center">
              <span className="text-gray-900 font-light">{item.name}</span>
            </div>
            <div className="col-span-2 flex items-center">
              <span className="text-gray-600">{item.description || '—'}</span>
            </div>
            <div className="col-span-2 flex items-center">
              <span className="text-gray-900 font-light">
                ${item.unitPrice.toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        {/* Total Row */}
        <div className="bg-gray-50 p-4 border-t-2 border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">{totalLabel}</span>
            <span className="text-xl font-bold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}