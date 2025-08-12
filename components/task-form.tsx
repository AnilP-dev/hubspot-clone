"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SelectDropdown } from "@/components/ui/select-dropdown"
import { X, Calendar, Clock, Bold, Italic, Underline, MoreHorizontal, Link, Image } from "lucide-react"
import { addTask, updateTask, deleteTask, type Task } from "@/lib/store/slices/tasksSlice"
import { AppDispatch, RootState } from "@/lib/store"

interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  campaignId?: string
  campaignName?: string
  task?: Task | null // For edit mode
}

interface TaskFormData {
  title: string
  type: string
  status: string
  priority: string
  campaign: string
  assignedTo: string
  dueDate: string
  dueTime: string
  notes: string
}

const taskTypes = [
  { value: "Call", label: "Call" },
  { value: "Email", label: "Email" },
  { value: "Meeting", label: "Meeting" },
  { value: "To-do", label: "To-do" }
]


const taskStatuses = [
  { value: "Not started", label: "Not started" },
  { value: "In progress", label: "In progress" },
  { value: "Completed", label: "Completed" },
  { value: "Waiting on contact", label: "Waiting on contact" },
  { value: "Deferred", label: "Deferred" }
]

const priorityOptions = [
  { value: "None", label: "None" },
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" }
]

const assignees = [
  { value: "Rituparn Gehlot", label: "Rituparn Gehlot" },
  { value: "John Doe", label: "John Doe" },
  { value: "Jane Smith", label: "Jane Smith" }
]

export function TaskForm({ isOpen, onClose, campaignId, campaignName, task }: TaskFormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const campaigns = useSelector((state: RootState) => state.campaigns.campaigns)
  
  // Convert campaigns to dropdown options
  const campaignOptions = campaigns.map(campaign => ({
    value: campaign.name,
    label: campaign.name
  }))
  
  // Add "No campaign" option if no campaigns exist
  if (campaignOptions.length === 0) {
    campaignOptions.push({ value: "", label: "No campaigns available" })
  }
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    type: "To-do",
    status: "Not started",
    priority: "None",
    campaign: campaignName || "",
    assignedTo: "Rituparn Gehlot",
    dueDate: "08/14/2025",
    dueTime: "8:00 AM GMT+5:30",
    notes: ""
  })

  // Check if this is edit mode
  const isEditMode = !!task

  // Update form data when task changes (for edit mode)
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        type: task.type || "To-do",
        status: task.status || "Not started",
        priority: task.priority || "None",
        campaign: campaignName || "",
        assignedTo: task.assignedTo || "Rituparn Gehlot",
        dueDate: task.dueDate || "",
        dueTime: task.dueTime || "",
        notes: task.notes || ""
      })
    } else {
      // Reset form for create mode
      setFormData({
        title: "",
        type: "To-do",
        status: "Not started",
        priority: "None",
        campaign: campaignName || "",
        assignedTo: "Rituparn Gehlot",
        dueDate: "08/14/2025",
        dueTime: "8:00 AM GMT+5:30",
        notes: ""
      })
    }
  }, [task, campaignName])

  const handleInputChange = (field: keyof TaskFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = (addAnother = false) => {
    if (!formData.title.trim()) {
      alert("Please enter a task title")
      return
    }

    if (isEditMode && task) {
      // Edit existing task
      const updatedTask: Task = {
        ...task,
        title: formData.title,
        type: formData.type as Task["type"],
        status: formData.status as Task["status"],
        priority: formData.priority as Task["priority"],
        assignedTo: formData.assignedTo,
        dueDate: formData.dueDate,
        dueTime: formData.dueTime,
        notes: formData.notes,
        modifiedDate: new Date().toISOString()
      }

      dispatch(updateTask(updatedTask))
      onClose()
    } else {
      // Create new task
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: formData.title,
        type: formData.type as Task["type"],
        status: formData.status as Task["status"],
        priority: formData.priority as Task["priority"],
        assignedTo: formData.assignedTo,
        dueDate: formData.dueDate,
        dueTime: formData.dueTime,
        notes: formData.notes,
        associatedCampaign: campaignId,
        createdDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString()
      }

      dispatch(addTask(newTask))

      if (addAnother) {
        // Reset form but keep campaign and assignee
        setFormData(prev => ({
          ...prev,
          title: "",
          type: "To-do",
          status: "Not started",
          priority: "None",
          notes: "",
          dueDate: "08/14/2025",
          dueTime: "8:00 AM GMT+5:30"
        }))
      } else {
        onClose()
      }
    }
  }

  const handleDelete = () => {
    if (!isEditMode || !task) return
    
    const confirmed = window.confirm("Are you sure you want to delete this task? This action cannot be undone.")
    if (confirmed) {
      dispatch(deleteTask(task.id))
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="hubspot-gradient-header flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-white">{isEditMode ? 'Edit task' : 'Create task'}</h2>
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
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Title Field */}
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="mt-1"
                placeholder="Task title"
              />
            </div>

            {/* Type Field */}
            <div>
              <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                Type
              </Label>
              <SelectDropdown
                options={taskTypes}
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
                placeholder="No type"
                className="mt-1"
              />
            </div>

            {/* Status Field - Only show in edit mode */}
            {isEditMode && (
              <div>
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                  Status
                </Label>
                <SelectDropdown
                  options={taskStatuses}
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                  placeholder="Select status"
                  className="mt-1"
                />
              </div>
            )}

            {/* Priority Field - Only show in edit mode */}
            {isEditMode && (
              <div>
                <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                  Priority
                </Label>
                <SelectDropdown
                  options={priorityOptions}
                  value={formData.priority}
                  onValueChange={(value) => handleInputChange("priority", value)}
                  placeholder="Select priority"
                  className="mt-1"
                />
              </div>
            )}

            {/* Campaign Field */}
            <div>
              <Label htmlFor="campaign" className="text-sm font-medium text-gray-700">
                Campaign
              </Label>
              <SelectDropdown
                options={campaignOptions}
                value={formData.campaign}
                onValueChange={(value) => handleInputChange("campaign", value)}
                placeholder="Select campaign"
                className="mt-1"
              />
            </div>

            {/* Assigned to Field */}
            <div>
              <Label htmlFor="assignedTo" className="text-sm font-medium text-gray-700">
                Assigned to
              </Label>
              <SelectDropdown
                options={assignees}
                value={formData.assignedTo}
                onValueChange={(value) => handleInputChange("assignedTo", value)}
                placeholder="Select assignee"
                className="mt-1"
              />
            </div>

            {/* Due Date and Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
                  Due date <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="dueDate"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange("dueDate", e.target.value)}
                    placeholder="MM/DD/YYYY"
                    className="pr-8"
                  />
                  <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <Label htmlFor="dueTime" className="text-sm font-medium text-gray-700">
                  Due time
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="dueTime"
                    value={formData.dueTime}
                    onChange={(e) => handleInputChange("dueTime", e.target.value)}
                    placeholder="Time"
                    className="pr-8"
                  />
                  <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Settings Link */}
            <div className="text-sm">
              <span className="text-gray-600">Customize your default task settings. </span>
              <a href="#" className="text-blue-600 hover:underline">Go to settings</a>
            </div>

            {/* Notes Field */}
            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Notes
              </Label>
              <div className="mt-1">
                {/* Toolbar */}
                <div className="border border-gray-300 rounded-t-md px-3 py-2 bg-gray-50 flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Bold className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Italic className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Underline className="h-4 w-4 text-gray-600" />
                  </button>
                  <div className="w-px h-4 bg-gray-300 mx-1" />
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Link className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Image className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded ml-auto">
                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                {/* Text Area */}
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="rounded-t-none border-t-0 min-h-[120px] resize-none"
                  placeholder="Add notes..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between">
            {isEditMode ? (
              <Button 
                variant="outline" 
                onClick={handleDelete}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Delete task
              </Button>
            ) : (
              <div></div>
            )}
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={onClose}
                className="text-gray-700 border-gray-300"
              >
                Cancel
              </Button>
              {isEditMode ? (
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => handleSave(false)}
                >
                  Save changes
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => handleSave(false)}
                    className="text-gray-700 border-gray-300"
                  >
                    Save
                  </Button>
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => handleSave(true)}
                  >
                    Save and add another
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}