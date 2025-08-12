"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar } from "lucide-react"
import { Activity } from "@/lib/store/slices/campaignsSlice"

interface CampaignActivityFeedProps {
  activities: Activity[]
  campaignId: string
}

export function CampaignActivityFeed({ activities, campaignId }: CampaignActivityFeedProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // Filter activities based on search and filters
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = searchTerm === "" || 
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.entityName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesUser = selectedUser === "all" || activity.userId === selectedUser

    return matchesSearch && matchesUser
  })

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups: { [key: string]: Activity[] }, activity) => {
    const date = new Date(activity.timestamp).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {})

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffMinutes < 1) return "a few seconds ago"
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    
    return date.toLocaleString()
  }

  const getActivityIcon = (activity: Activity) => {
    switch (activity.action) {
      case 'added':
        return '+'
      case 'removed':
        return '−'
      case 'updated':
        return '↻'
      default:
        return '•'
    }
  }

  const getActivityIconColor = (activity: Activity) => {
    switch (activity.action) {
      case 'added':
        return 'bg-green-500'
      case 'removed':
        return 'bg-red-500'
      case 'updated':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getUserAvatar = (userName: string) => {
    // Generate initials from user name
    const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase()
    return initials
  }

  // Get unique users for filter
  const uniqueUsers = Array.from(new Set(activities.map(a => ({ id: a.userId, name: a.userName }))))

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Campaign activity</h2>
        
        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                placeholder="MM/DD/YYYY"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="pl-10 w-40"
              />
            </div>
            <span className="text-gray-500">to</span>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                placeholder="MM/DD/YYYY"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="pl-10 w-40"
              />
            </div>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-4 mb-6">
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All activities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All activities</SelectItem>
              {/* Add more activity type filters if needed */}
            </SelectContent>
          </Select>

          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All users</SelectItem>
              {uniqueUsers.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-6">
        {Object.keys(groupedActivities).length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-2">No activities found</div>
            <div className="text-sm text-gray-400">Try adjusting your search or filters</div>
          </div>
        ) : (
          Object.entries(groupedActivities).map(([date, dayActivities]) => (
            <div key={date}>
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {date === new Date().toDateString() ? "Today" : date}
                </h3>
              </div>

              <div className="space-y-4">
                {dayActivities.map((activity, index) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      {/* User Avatar */}
                      <div className="flex-shrink-0 w-8 h-8 bg-hubspot-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                        {activity.userName === 'HubSpot' ? (
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">HS</span>
                          </div>
                        ) : (
                          getUserAvatar(activity.userName)
                        )}
                      </div>
                      
                      {/* Timeline line */}
                      {index < dayActivities.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                      )}
                    </div>

                    {/* Activity Content */}
                    <div className="flex-1 pb-4">
                      <div className="flex items-start gap-3">
                        {/* Activity Icon */}
                        <div className={`flex-shrink-0 w-6 h-6 ${getActivityIconColor(activity)} text-white rounded-full flex items-center justify-center text-xs font-bold`}>
                          {getActivityIcon(activity)}
                        </div>

                        {/* Activity Details */}
                        <div className="flex-1">
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">{activity.userName}</span>
                            <span className="text-gray-600 ml-1">{activity.description}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatTime(activity.timestamp)}
                          </div>
                          
                          {/* Activity Details */}
                          {activity.details && (
                            <div className="mt-2 p-3 bg-gray-50 rounded text-sm text-gray-600">
                              {typeof activity.details === 'string' ? activity.details : (
                                <div className="space-y-1">
                                  {Object.entries(activity.details).map(([key, value]) => (
                                    <div key={key}>
                                      <span className="font-medium">Updated the {key}</span> field from{' '}
                                      <span className="font-medium">${value}</span> to --
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}