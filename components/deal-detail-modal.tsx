"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  X,
  ChevronDown,
  Plus,
  Search,
  MoreHorizontal,
  Settings,
  Edit,
  Mail,
  Phone,
  Calendar,
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import type { Deal } from "@/lib/store/slices/dealsSlice"

interface DealDetailModalProps {
  deal: Deal | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DealDetailModal({ deal, open, onOpenChange }: DealDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!deal) return null

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getStageColor = (stage: string) => {
    const colors = {
      "Appointment Scheduled": "bg-blue-100 text-blue-800",
      "Qualified To Buy": "bg-green-100 text-green-800",
      "Presentation Scheduled": "bg-yellow-100 text-yellow-800",
      "Decision Maker Bought-In": "bg-purple-100 text-purple-800",
      "Contract Sent": "bg-orange-100 text-orange-800",
      "Closed Won": "bg-green-100 text-green-800",
      "Closed Lost": "bg-red-100 text-red-800",
    }
    return colors[stage as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      High: "bg-red-500",
      Medium: "bg-yellow-500",
      Low: "bg-green-500",
    }
    return colors[priority as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 gap-0">
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="sm" className="text-[#00BDA5] p-0">
                  <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                  Deals
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <h1 className="text-2xl font-semibold text-gray-900 mb-2">{deal.name}</h1>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Amount:</span>
                  <span className="font-semibold text-lg">{formatCurrency(deal.amount)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Close Date:</span>
                  <span className="text-sm">{deal.closeDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Stage:</span>
                  <Badge className={getStageColor(deal.stage)}>
                    {deal.stage}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Note
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Task
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  Meeting
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* About this deal */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">About this deal</h3>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="text-[#00BDA5] p-0">
                      Actions
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Deal owner</label>
                    <p className="text-sm text-gray-900 mt-1">{deal.owner}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Last contacted</label>
                    <p className="text-sm text-gray-900 mt-1">--</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Deal type</label>
                    <p className="text-sm text-gray-900 mt-1">{deal.type || "New Business"}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Priority</label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(deal.priority || "Low")}`}></div>
                      <span className="text-sm text-gray-900">{deal.priority || "Low"}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Record source</label>
                    <p className="text-sm text-gray-900 mt-1">CRM UI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="h-12 bg-transparent border-0 rounded-none w-full justify-start px-6">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#00BDA5] data-[state=active]:bg-transparent rounded-none"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="activities"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#00BDA5] data-[state=active]:bg-transparent rounded-none"
                  >
                    Activities
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <Tabs value={activeTab} className="w-full">
                <TabsContent value="overview" className="mt-0 space-y-6">
                  {/* Contacts Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Contacts</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Button variant="outline" size="sm" className="text-[#00BDA5] border-[#00BDA5] bg-transparent">
                          Contact owner
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-[#00BDA5] border-[#00BDA5] bg-transparent">
                          Create date
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-[#00BDA5] border-[#00BDA5] bg-transparent">
                          More
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search" className="pl-10" />
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-gray-600 font-medium">
                              <div className="flex items-center gap-1">
                                NAME
                                <MoreHorizontal className="h-4 w-4" />
                              </div>
                            </TableHead>
                            <TableHead className="text-gray-600 font-medium">
                              <div className="flex items-center gap-1">
                                EMAIL
                                <MoreHorizontal className="h-4 w-4" />
                              </div>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                  B
                                </div>
                                <span className="text-[#00BDA5] hover:underline cursor-pointer font-medium">
                                  Brian Halligan (Sample Contact)
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-[#00BDA5] hover:underline cursor-pointer">bh@hubspot.com</span>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Companies Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Companies</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Button variant="outline" size="sm" className="text-[#00BDA5] border-[#00BDA5] bg-transparent">
                          Company owner
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-[#00BDA5] border-[#00BDA5] bg-transparent">
                          Lead status
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-[#00BDA5] border-[#00BDA5] bg-transparent">
                          More
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search" className="pl-10" />
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-gray-600 font-medium">
                              <div className="flex items-center gap-1">
                                COMPANY NAME
                                <MoreHorizontal className="h-4 w-4" />
                              </div>
                            </TableHead>
                            <TableHead className="text-gray-600 font-medium">
                              <div className="flex items-center gap-1">
                                COMPANY DOMAIN NAME
                                <MoreHorizontal className="h-4 w-4" />
                              </div>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                  H
                                </div>
                                <span className="text-[#00BDA5] hover:underline cursor-pointer font-medium">
                                  HubSpot
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  Primary
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span className="text-[#00BDA5] hover:underline cursor-pointer">hubspot.com</span>
                                <ExternalLink className="h-3 w-3 text-gray-400" />
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Deals Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Deals</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-center py-8 text-gray-500">
                      No associated objects of this type exist or you don't have permission to view them.
                    </div>
                  </div>

                  {/* Tickets Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Tickets</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-center py-8 text-gray-500">
                      No associated objects of this type exist or you don't have permission to view them.
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="activities" className="mt-0">
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No activities yet</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-white">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Breeze record summary */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Breeze record summary</CardTitle>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </CardHeader>
              </Card>

              {/* Deal summary */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      Deal summary
                      <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    </CardTitle>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500">Generated Jul 23, 2025</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-700 mb-4">
                    There are no associated activities and further details are needed to provide a comprehensive
                    summary.
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="p-1">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 text-pink-600 border-pink-600 bg-transparent"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask a question
                  </Button>
                </CardContent>
              </Card>

              {/* Contacts */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      Contacts (1)
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-[#00BDA5] p-0">
                      + Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      B
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#00BDA5] hover:underline cursor-pointer">
                        Brian Halligan (Sample Contact)
                      </p>
                      <p className="text-xs text-gray-500">Executive Chairperson at HubSpot</p>
                      <p className="text-xs text-[#00BDA5] hover:underline cursor-pointer">bh@hubspot.com</p>
                      <p className="text-xs text-gray-500">Phone: --</p>
                    </div>
                  </div>
                  <Button variant="link" className="text-[#00BDA5] p-0 mt-2 text-sm">
                    View associated Contact
                  </Button>
                </CardContent>
              </Card>

              {/* Companies */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      Companies (1)
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-[#00BDA5] p-0">
                      + Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      Primary
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      H
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#00BDA5] hover:underline cursor-pointer">HubSpot</p>
                      <div className="flex items-center gap-1">
                        <p className="text-xs text-[#00BDA5] hover:underline cursor-pointer">hubspot.com</p>
                        <ExternalLink className="h-3 w-3 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500">Phone: --</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
