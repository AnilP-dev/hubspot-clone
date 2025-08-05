"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  ChevronDown,
  ArrowUpDown,
  Plus,
  X,
  Calendar,
  Clock,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  List,
  AlignLeft,
} from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { addTask, updateTask, deleteTask, deleteTasks, type Task } from "@/lib/store/slices/tasksSlice"
import { toast } from "sonner"

export function TasksPage() {
  const dispatch = useAppDispatch()
  const { tasks } = useAppSelector((state) => state.tasks)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showCreateTask, setShowCreateTask] = useState(false)
  
  // Create task form state
  const [taskTitle, setTaskTitle] = useState("")
  const [taskType, setTaskType] = useState("To-do")
  const [taskPriority, setTaskPriority] = useState("None")
  const [taskAssignee, setTaskAssignee] = useState("Rituparn Gehlot")
  const [taskQueue, setTaskQueue] = useState("None")
  const [taskDueDate, setTaskDueDate] = useState("In 3 business days (Friday)")
  const [taskDueTime, setTaskDueTime] = useState("8:00 AM")
  const [taskReminder, setTaskReminder] = useState("No reminder")
  const [taskNotes, setTaskNotes] = useState("")

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTasksByTab = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    switch (activeTab) {
      case "due-today":
        return filteredTasks.filter(task => {
          const dueDate = new Date(task.dueDate)
          return dueDate >= today && dueDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
        })
      case "overdue":
        return filteredTasks.filter(task => new Date(task.dueDate) < today)
      case "upcoming":
        return filteredTasks.filter(task => new Date(task.dueDate) > new Date(today.getTime() + 24 * 60 * 60 * 1000))
      default:
        return filteredTasks
    }
  }

  const displayTasks = getTasksByTab()

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(displayTasks.map((task) => task.id))
    } else {
      setSelectedTasks([])
    }
  }

  const handleSelectTask = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, taskId])
    } else {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId))
    }
  }

  const handleDeleteSelected = () => {
    if (selectedTasks.length > 0) {
      dispatch(deleteTasks(selectedTasks))
      setSelectedTasks([])
      toast.success(`${selectedTasks.length} task(s) deleted successfully`)
    }
  }

  const handleMarkAsCompleted = () => {
    if (selectedTasks.length > 0) {
      selectedTasks.forEach(taskId => {
        const task = tasks.find(t => t.id === taskId)
        if (task) {
          dispatch(updateTask({
            ...task,
            status: "Completed",
            modifiedDate: new Date().toISOString()
          }))
        }
      })
      setSelectedTasks([])
      toast.success(`${selectedTasks.length} task(s) marked as completed`)
    }
  }

  const handleChangeQueue = () => {
    toast.info("Change queue functionality not implemented yet")
  }

  const handleEditSelected = () => {
    if (selectedTasks.length === 1) {
      toast.info("Edit functionality not implemented yet")
    } else {
      toast.error("Please select only one task to edit")
    }
  }

  const handleCreateTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      type: taskType as Task["type"],
      status: "Not started",
      dueDate: `August 1, 2025 ${taskDueTime}`,
      priority: taskPriority as Task["priority"],
      assignedTo: taskAssignee,
      queue: taskQueue === "None" ? undefined : taskQueue,
      notes: taskNotes,
      reminder: taskReminder === "No reminder" ? undefined : taskReminder,
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
    }

    dispatch(addTask(newTask))
    setShowCreateTask(false)
    resetCreateTaskForm()
    toast.success("Task created successfully")
  }

  const resetCreateTaskForm = () => {
    setTaskTitle("")
    setTaskType("To-do")
    setTaskPriority("None")
    setTaskAssignee("Rituparn Gehlot")
    setTaskQueue("None")
    setTaskDueDate("In 3 business days (Friday)")
    setTaskDueTime("8:00 AM")
    setTaskReminder("No reminder")
    setTaskNotes("")
  }

  return (
    <div className="flex flex-col h-full bg-white" style={{ fontFamily: '"Lexend Deca",Helvetica,Arial,sans-serif' }}>
      <style jsx>{`
        .text-primary { color: #33475b; }
      `}</style>

      {/* Header - Full Width */}
      <div className="w-full px-4 py-3 border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-primary">Tasks</h1>
            <p className="text-sm text-gray-600 mt-0.5">{tasks.length} record{tasks.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-orange-500 border-orange-500 hover:text-orange-500"
            >
              Manage queues
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-orange-500 border-orange-500 hover:text-orange-500"
            >
              Import
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => setShowCreateTask(true)}
            >
              Create task
            </Button>
          </div>
        </div>
      </div>

      {/* Centered Container for Content */}
      <div className="flex justify-center w-full bg-white flex-1">
        <div className="w-full max-w-7xl mx-auto bg-white">
          {/* Calendar Sync Banner */}
          <div className="mx-4 mt-2 p-2 bg-[#E6F7FF] border border-[#91D5FF] rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-primary">
                  Want to see your tasks on your Google or Outlook calendar?
                </span>
                <span className="text-sm text-gray-600">
                  Connect a new calendar to sync tasks created in HubSpot.
                </span>
                <Button variant="link" className="p-0 h-auto text-teal-500 text-sm">
                  Go to settings
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="p-1">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between px-4 py-1.5 border-b border-gray-200">
            <div className="flex items-center gap-6">
              <button
                className={`px-3 py-2 text-sm font-medium border-b-2 ${
                  activeTab === "all"
                    ? "border-teal-500 text-teal-500"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All
                <X className="w-4 h-4 ml-2 inline" />
              </button>
              <button
                className={`px-3 py-2 text-sm font-medium border-b-2 ${
                  activeTab === "due-today"
                    ? "border-teal-500 text-teal-500"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("due-today")}
              >
                Due today
              </button>
              <button
                className={`px-3 py-2 text-sm font-medium border-b-2 ${
                  activeTab === "overdue"
                    ? "border-teal-500 text-teal-500"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("overdue")}
              >
                Overdue
              </button>
              <button
                className={`px-3 py-2 text-sm font-medium border-b-2 ${
                  activeTab === "upcoming"
                    ? "border-teal-500 text-teal-500"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2 text-teal-500 hover:text-teal-600">
                <Plus className="w-4 h-4" />
                Add view (4/5)
              </Button>
              <Button variant="ghost" size="sm" className="text-teal-500 hover:text-teal-600">
                All Views
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 px-4 py-1.5 border-b border-gray-200">
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="(1) Assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All assignees</SelectItem>
            <SelectItem value="me">Assigned to me</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Task type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="todo">To-do</SelectItem>
            <SelectItem value="call">Call</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="meeting">Meeting</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Due date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All dates</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Queue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All queues</SelectItem>
            <SelectItem value="none">No queue</SelectItem>
          </SelectContent>
        </Select>
            <Button variant="ghost" size="sm" className="gap-2 text-teal-500 hover:text-teal-600">
              <Plus className="w-4 h-4" />
              More filters
            </Button>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center justify-between px-4 py-1.5 border-b border-gray-200">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search task title and notes"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2 text-teal-500 hover:text-teal-600">
                Save view
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-orange-500 hover:text-orange-600">
                Start 1 task
                <Calendar className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                Edit columns
              </Button>
            </div>
          </div>

          {/* Selection Actions Bar */}
          {selectedTasks.length > 0 && (
            <div className="flex items-center justify-between px-4 py-1.5 bg-[#E6F7FF] border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm text-primary font-medium">
                  {selectedTasks.length} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleMarkAsCompleted}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Mark as completed
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleEditSelected}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleDeleteSelected}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Delete
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleChangeQueue}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Change queue
                </Button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto border-l border-r border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 text-xs">
              <TableHead className="w-12 px-2">
                <Checkbox
                  checked={selectedTasks.length === displayTasks.length && displayTasks.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="font-medium text-gray-900">STATUS</TableHead>
              <TableHead className="font-medium text-gray-900">
                <div className="flex items-center gap-1">
                  TITLE
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead className="font-medium text-gray-900">ASSOCIATED CONTACT</TableHead>
              <TableHead className="font-medium text-gray-900">ASSOCIATED COMPANY</TableHead>
              <TableHead className="font-medium text-gray-900">
                <div className="flex items-center gap-1">
                  LAST CONTACTED
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead className="font-medium text-gray-900">
                <div className="flex items-center gap-1">
                  LAST ENGAGEMENT
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead className="font-medium text-gray-900">
                <div className="flex items-center gap-1">
                  TASK TYPE
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead className="font-medium text-gray-900">
                <div className="flex items-center gap-1">
                  DUE DATE
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayTasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-gray-50">
                <TableCell className="px-2">
                  <Checkbox
                    checked={selectedTasks.includes(task.id)}
                    onCheckedChange={(checked) => handleSelectTask(task.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </TableCell>
                <TableCell>
                  <button className="font-medium text-left text-teal-500 hover:text-teal-600">
                    {task.title}
                  </button>
                </TableCell>
                <TableCell className="text-gray-600">--</TableCell>
                <TableCell className="text-gray-600">--</TableCell>
                <TableCell className="text-gray-600">--</TableCell>
                <TableCell className="text-gray-600">--</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {task.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-900">{task.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-1.5 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" disabled>
                Prev
              </Button>
              <span className="text-sm text-gray-600">1</span>
              <Button variant="ghost" size="sm" disabled>
                Next
              </Button>
            </div>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="25 per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
                <SelectItem value="100">100 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Create Task Sidebar */}
      {showCreateTask && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowCreateTask(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-50 flex flex-col">
            {/* Sidebar Header */}
            <div className="bg-[#00BDA5] text-white p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create task</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateTask(false)}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <Input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full"
                />
                <div className="flex items-center justify-end mt-1">
                  <span className="text-xs text-gray-500">0 / 64</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Task Type <span className="text-red-500">*</span>
                  </label>
                  <Select value={taskType} onValueChange={setTaskType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To-do">To-do</SelectItem>
                      <SelectItem value="Call">Call</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Meeting">Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <Select value={taskPriority} onValueChange={setTaskPriority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Associate with records
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Associated with 0 records" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Associated with 0 records</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Assigned to
                </label>
                <Select value={taskAssignee} onValueChange={setTaskAssignee}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rituparn Gehlot">Rituparn Gehlot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Queue
                </label>
                <Select value={taskQueue} onValueChange={setTaskQueue}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Due date
                </label>
                <div className="flex gap-2">
                  <Select value={taskDueDate} onValueChange={setTaskDueDate}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In 3 business days (Friday)">In 3 business days (Friday)</SelectItem>
                      <SelectItem value="Today">Today</SelectItem>
                      <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <Input 
                      value={taskDueTime}
                      onChange={(e) => setTaskDueTime(e.target.value)}
                      className="w-20"
                    />
                  </div>
                </div>
                <Button variant="link" className="p-0 h-auto text-[#00BDA5] text-sm mt-1">
                  Set to repeat
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Reminder
                </label>
                <Select value={taskReminder} onValueChange={setTaskReminder}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No reminder">No reminder</SelectItem>
                    <SelectItem value="15 minutes before">15 minutes before</SelectItem>
                    <SelectItem value="30 minutes before">30 minutes before</SelectItem>
                    <SelectItem value="1 hour before">1 hour before</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  You can customize your default settings. <Button variant="link" className="p-0 h-auto text-[#00BDA5] text-xs">Go to settings</Button>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Notes
                </label>
                <Textarea
                  value={taskNotes}
                  onChange={(e) => setTaskNotes(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex items-center gap-1 mt-2 p-2 border-t">
                  <Button variant="ghost" size="sm" className="p-1">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1">
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1">
                    <Underline className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1">
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span className="text-[#00BDA5]">More</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1">
                    <List className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1">
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="border-t border-gray-200 p-6 space-y-3">
              <div className="flex gap-3">
                <Button 
                  onClick={handleCreateTask}
                  className="flex-1 bg-[#00BDA5] hover:bg-[#00BDA5]/90 text-white"
                  disabled={!taskTitle.trim()}
                >
                  Create
                </Button>
                <Button 
                  variant="outline"
                  className="text-[#00BDA5] border-[#00BDA5]"
                  disabled={!taskTitle.trim()}
                >
                  Create and add another
                </Button>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setShowCreateTask(false)}
                className="w-full text-orange-500 hover:text-orange-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}