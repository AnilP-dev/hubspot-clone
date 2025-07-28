"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Search, X, Info } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { addTicket } from "@/lib/store/slices/ticketsSlice"
import { toast } from "sonner"

interface CreateTicketModalProps {
  isOpen: boolean
  onClose: () => void
}

const sourceOptions = ["Chat", "Email", "Form", "Phone"]

const pipelineOptions = ["Support Pipeline", "Sales Pipeline", "Service Pipeline"]

const statusOptions = ["New", "Waiting on contact", "Waiting on us", "Closed"]

const priorityOptions = [
  { value: "Low", color: "bg-green-500" },
  { value: "Medium", color: "bg-yellow-500" },
  { value: "High", color: "bg-orange-500" },
  { value: "Urgent", color: "bg-red-500" },
]

const ownerOptions = ["Anil Kumar Pandiya", "Brian Halligan", "Maria Johnson", "TestUser"]

export function CreateTicketModal({ isOpen, onClose }: CreateTicketModalProps) {
  const dispatch = useAppDispatch()
  const contacts = useAppSelector((state) => state.contacts.contacts)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pipeline: "Support Pipeline",
    status: "New",
    source: "",
    owner: "Anil Kumar Pandiya",
    priority: "Low" as "Low" | "Medium" | "High" | "Urgent",
    createDate: new Date(),
    associatedContact: "",
    associatedCompany: "",
    addTimelineActivity: false,
  })

  const [contactSearch, setContactSearch] = useState("")
  const [showContactDropdown, setShowContactDropdown] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
      contact.email.toLowerCase().includes(contactSearch.toLowerCase()),
  )

  const handleSubmit = (createAnother = false) => {
    if (!formData.name.trim()) {
      toast.error("Please enter a ticket name")
      return
    }

    const newTicket = {
      name: formData.name,
      description: formData.description,
      pipeline: formData.pipeline,
      status: `${formData.status} (${formData.pipeline})`,
      source: formData.source,
      owner: formData.owner,
      priority: formData.priority,
      createDate: format(formData.createDate, "MMM d, yyyy h:mm a 'GMT'xxx"),
      lastActivityDate: format(new Date(), "MMM d, yyyy h:mm a 'GMT'xxx"),
      associatedContact: formData.associatedContact,
      associatedCompany: formData.associatedCompany,
    }

    dispatch(addTicket(newTicket))
    toast.success("Ticket created successfully!")

    if (createAnother) {
      setFormData({
        ...formData,
        name: "",
        description: "",
        associatedContact: "",
        associatedCompany: "",
      })
    } else {
      onClose()
      setFormData({
        name: "",
        description: "",
        pipeline: "Support Pipeline",
        status: "New",
        source: "",
        owner: "Anil Kumar Pandiya",
        priority: "Low",
        createDate: new Date(),
        associatedContact: "",
        associatedCompany: "",
        addTimelineActivity: false,
      })
    }
  }

  const handleClose = () => {
    onClose()
    setFormData({
      name: "",
      description: "",
      pipeline: "Support Pipeline",
      status: "New",
      source: "",
      owner: "Anil Kumar Pandiya",
      priority: "Low",
      createDate: new Date(),
      associatedContact: "",
      associatedCompany: "",
      addTimelineActivity: false,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-teal-500 text-white p-6 flex items-center justify-between">
          <DialogTitle className="text-xl font-medium">Create Ticket</DialogTitle>
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:bg-teal-600 h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Ticket Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Ticket name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full"
              placeholder="Enter ticket name"
            />
          </div>

          {/* Pipeline */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Pipeline *</Label>
            <Select value={formData.pipeline} onValueChange={(value) => setFormData({ ...formData, pipeline: value })}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pipelineOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ticket Status */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Ticket status *</Label>
            <div className="relative">
              <Button
                variant="outline"
                className="w-full justify-between bg-transparent"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                {formData.status}
                <Search className="h-4 w-4" />
              </Button>
              {showStatusDropdown && (
                <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search" className="pl-10 border-teal-500 focus:border-teal-500" />
                    </div>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {statusOptions.map((option) => (
                      <button
                        key={option}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                        onClick={() => {
                          setFormData({ ...formData, status: option })
                          setShowStatusDropdown(false)
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ticket Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Ticket description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full min-h-[80px]"
              placeholder="Enter ticket description"
            />
          </div>

          {/* Source */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Source</Label>
            <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <div className="bg-teal-50 p-2 space-y-1">
                  {sourceOptions.map((option) => (
                    <button
                      key={option}
                      className="w-full text-left px-2 py-1 hover:bg-white rounded text-sm"
                      onClick={() => setFormData({ ...formData, source: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>

          {/* Ticket Owner */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Ticket owner</Label>
            <Select value={formData.owner} onValueChange={(value) => setFormData({ ...formData, owner: value })}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ownerOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Priority</Label>
            <div className="relative">
              <Button
                variant="outline"
                className="w-full justify-between bg-transparent"
                onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${priorityOptions.find((p) => p.value === formData.priority)?.color}`}
                  />
                  {formData.priority}
                </div>
                <Search className="h-4 w-4" />
              </Button>
              {showPriorityDropdown && (
                <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                  <div className="bg-teal-50 p-2 space-y-1">
                    {priorityOptions.map((option) => (
                      <button
                        key={option.value}
                        className="w-full text-left px-2 py-1 hover:bg-white rounded text-sm flex items-center gap-2"
                        onClick={() => {
                          setFormData({ ...formData, priority: option.value as any })
                          setShowPriorityDropdown(false)
                        }}
                      >
                        <div className={`w-2 h-2 rounded-full ${option.color}`} />
                        {option.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Create Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Create date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.createDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.createDate ? format(formData.createDate, "MM/dd/yyyy") : "MM/DD/YYYY"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.createDate}
                  onSelect={(date) => date && setFormData({ ...formData, createDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Associate Ticket with */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-sm font-medium text-gray-700">Associate Ticket with</h3>

            {/* Contact */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Contact</Label>
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-full justify-between bg-transparent"
                  onClick={() => setShowContactDropdown(!showContactDropdown)}
                >
                  {formData.associatedContact || "Search"}
                  <Search className="h-4 w-4" />
                </Button>
                {showContactDropdown && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                    <div className="p-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search"
                          value={contactSearch}
                          onChange={(e) => setContactSearch(e.target.value)}
                          className="pl-10 border-teal-500 focus:border-teal-500"
                        />
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto bg-teal-50">
                      {filteredContacts.map((contact) => (
                        <button
                          key={contact.id}
                          className="w-full text-left px-4 py-2 hover:bg-white text-sm"
                          onClick={() => {
                            setFormData({ ...formData, associatedContact: `${contact.name} (${contact.email})` })
                            setShowContactDropdown(false)
                            setContactSearch("")
                          }}
                        >
                          {contact.name} (Sample Contact) ({contact.email})
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Checkbox
                  id="timeline"
                  checked={formData.addTimelineActivity}
                  onCheckedChange={(checked) => setFormData({ ...formData, addTimelineActivity: checked as boolean })}
                />
                <label htmlFor="timeline" className="flex items-center gap-1">
                  Add timeline activity from this contact
                  <Info className="h-3 w-3" />
                </label>
              </div>
            </div>

            {/* Company */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label className="text-sm font-medium text-gray-700">Company</Label>
                <Info className="h-3 w-3 text-gray-400" />
              </div>
              <Input
                value={formData.associatedCompany}
                onChange={(e) => setFormData({ ...formData, associatedCompany: e.target.value })}
                placeholder="Search for company"
                className="w-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t">
            <Button onClick={() => handleSubmit(false)} className="bg-orange-500 hover:bg-orange-600 text-white px-6">
              Create
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSubmit(true)}
              className="border-orange-500 text-orange-500 hover:bg-orange-50 px-6"
            >
              Create and add another
            </Button>
            <Button variant="outline" onClick={handleClose} className="px-6 bg-transparent">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
