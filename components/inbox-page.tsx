"use client"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { 
  setSelectedConversation, 
  addMessage, 
  closeConversation,
  markAsRead,
  type Message 
} from "@/lib/store/slices/conversationsSlice"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  MoreHorizontal,
  ArrowLeft,
  Send,
  Paperclip,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  Smile,
  X,
  CheckCheck,
  Eye,
  ExternalLink,
  Building2,
  User,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react"

export function InboxPage() {
  const dispatch = useAppDispatch()
  const { conversations, selectedConversationId } = useAppSelector((state) => state.conversations)
  const [replyMessage, setReplyMessage] = useState("")
  const [activeTab, setActiveTab] = useState<"open" | "closed">("open")
  const [showContactDetails, setShowContactDetails] = useState(false)

  const selectedConversation = conversations.find(conv => conv.id === selectedConversationId)
  
  // Filter conversations based on active tab
  const filteredConversations = conversations.filter(conv => 
    activeTab === "open" ? conv.status === "open" : conv.status === "closed"
  )
  
  const handleSelectConversation = (conversationId: string) => {
    dispatch(setSelectedConversation(conversationId))
    dispatch(markAsRead(conversationId))
  }

  const handleSendMessage = () => {
    if (!replyMessage.trim() || !selectedConversationId) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: replyMessage.trim(),
      timestamp: new Date().toISOString(),
      sender: "agent",
      type: "email",
    }

    dispatch(addMessage({ conversationId: selectedConversationId, message: newMessage }))
    setReplyMessage("")
    toast.success("Email sent successfully")
  }

  const handleCloseConversation = () => {
    if (selectedConversationId) {
      dispatch(closeConversation(selectedConversationId))
      // If we're on the open tab, clear the selection since the conversation moved to closed
      if (activeTab === "open") {
        dispatch(setSelectedConversation(null))
      }
      toast.success("Conversation closed")
    }
  }

  return (
    <div className="flex h-full bg-white overflow-hidden" style={{ fontFamily: '"Lexend Deca",Helvetica,Arial,sans-serif' }}>
      <style jsx>{`
        * {
          font-family: "Lexend Deca", Helvetica, Arial, sans-serif;
        }
        .text-primary { color: #33475b; }
        .text-teal { color: #00BDA5; }
        .bg-teal { background-color: #00BDA5; }
        .border-teal { border-color: #00BDA5; }
        .text-orange { color: #FF7A00; }
      `}</style>

      {/* Left Sidebar - Navigation */}
      <div className="hidden md:flex w-52 lg:w-60 min-w-[200px] border-r border-gray-200 flex-col bg-white">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-gray-600" />
              <h1 className="text-lg font-medium text-primary">Inbox</h1>
            </div>
            <Search className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        {/* Status */}
        <div className="px-4 py-2 border-b border-gray-200">
          <Button variant="ghost" size="sm" className="text-teal hover:text-teal w-full justify-start">
            <div className="w-2 h-2 rounded-full bg-teal mr-2"></div>
            You're away
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>
        </div>

        {/* Filters */}
        <div className="flex-1">
          <div className="py-2">
            <div className="px-4 py-1">
              <button className="flex items-center justify-between w-full text-sm text-primary hover:bg-gray-50 py-1">
                Unassigned
                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">1</span>
              </button>
            </div>
            <div className="px-4 py-1">
              <button className="flex items-center justify-between w-full text-sm text-gray-600 hover:bg-gray-50 py-1">
                Assigned to me
                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">0</span>
              </button>
            </div>
            <div className="px-4 py-1">
              <button className="flex items-center justify-between w-full text-sm text-gray-600 hover:bg-gray-50 py-1">
                All open
                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">1</span>
              </button>
            </div>
          </div>

          {/* Less/More Toggle */}
          <div className="px-4 py-1">
            <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-teal">
              <ChevronDown className="w-3 h-3" />
              Less
            </button>
          </div>

          {/* Channel Filters */}
          <div className="py-2">
            <div className="px-4 py-1">
              <button className="flex items-center justify-between w-full text-sm text-primary hover:bg-gray-50 py-1 bg-gray-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </div>
                <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">1</span>
              </button>
            </div>
            <div className="px-4 py-1">
              <button className="flex items-center justify-between w-full text-sm text-gray-600 hover:bg-gray-50 py-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Calls
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">0</span>
              </button>
            </div>
          </div>

          <div className="py-2">
            <div className="px-4 py-1">
              <button className="text-sm text-gray-600 hover:bg-gray-50 py-1 w-full text-left">
                All closed
              </button>
            </div>
            <div className="px-4 py-1">
              <button className="text-sm text-gray-600 hover:bg-gray-50 py-1 w-full text-left">
                Sent
              </button>
            </div>
            <div className="px-4 py-1">
              <button className="flex items-center justify-between w-full text-sm text-gray-600 hover:bg-gray-50 py-1">
                Spam
                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">0</span>
              </button>
            </div>
            <div className="px-4 py-1">
              <button className="text-sm text-gray-600 hover:bg-gray-50 py-1 w-full text-left">
                Trash
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-gray-200 p-3">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 flex-1">
              Actions
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
            <Button size="sm" className="bg-gray-600 hover:bg-gray-700 text-white">
              Compose
            </Button>
          </div>
          <div className="mt-3">
            <Button variant="ghost" size="sm" className="text-gray-600 w-full justify-start">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
              </svg>
              Inbox Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Middle Column - Email List */}
      <div className="w-full sm:w-80 lg:w-72 xl:w-96 sm:min-w-[280px] border-r border-gray-200 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant={activeTab === "open" ? "outline" : "ghost"} 
                size="sm" 
                className={`${activeTab === "open" ? "text-gray-900 border-gray-400" : "text-gray-600"}`}
                onClick={() => setActiveTab("open")}
              >
                Open
              </Button>
              <Button 
                variant={activeTab === "closed" ? "outline" : "ghost"} 
                size="sm" 
                className={`${activeTab === "closed" ? "text-gray-900 border-gray-400" : "text-gray-600"}`}
                onClick={() => setActiveTab("closed")}
              >
                Closed
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-teal">
              Newest
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-white ${
                  selectedConversationId === conversation.id ? "bg-blue-50 border-l-4 border-l-teal" : "bg-white"
                }`}
                onClick={() => handleSelectConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-500 text-white text-sm">
                      <Mail className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm text-primary truncate">
                        {conversation.contactName}
                      </h3>
                      <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-gray-900 mb-1 font-medium">{conversation.subject}</p>
                    <p className="text-sm text-gray-600 truncate">{conversation.preview}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <p className="text-sm">No {activeTab} conversations</p>
                <p className="text-xs mt-1">
                  {activeTab === "closed" 
                    ? "Closed conversations will appear here" 
                    : "Open conversations will appear here"
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Conversation View */}
        <div className="flex-1 flex flex-col">
          {/* Conversation Header */}
          <div className="px-4 py-2 border-b border-gray-200">
            <div id="top_navbar" className="flex items-center justify-between">
              <div>
                  <div className="flex items-center justify-start gap-2 mb-1">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-orange-500 text-white text-xs">
                        {selectedConversation?.contactAvatar || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg font-medium text-primary">
                      {selectedConversation?.contactName || "Select a conversation"}
                    </h2>
                  </div>
                  
                  
                  {selectedConversation && (
                    <>
                      <Badge variant="outline" className="text-xs">
                        Salesperson at {selectedConversation.company || "Company"}
                      </Badge>
                      <span className="text-sm text-gray-500">• Created 2 minutes ago</span>
                    </>
                  )}
              </div>
              <div className="flex items-center gap-2">
                  {/* Contact Details Toggle - Only visible on smaller screens */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="xl:hidden"
                    onClick={() => setShowContactDetails(!showContactDetails)}
                  >
                    <User className="w-4 h-4" />
                    {showContactDetails ? "Hide" : "Contact"}
                  </Button>
                  
                  <Button variant="outline" size="sm" onClick={handleCloseConversation}>
                    <CheckCheck className="w-4 h-4" />
                    Close conversation
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
              </div>
            </div>
          </div>
          
          <div className="flex relative">
            <div className={`flex flex-col ${showContactDetails ? 'hidden xl:block xl:flex-grow' : 'grow'}`}>
  {/* Owner Section */}
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-primary font-medium">Owner</span>
                    <Button variant="ghost" size="sm" className="text-teal">
                      No owner
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">New email channel connected to HubSpot</div>
                </div>
              </div>

              {/* Conversation Thread */}
              <div className="flex-1  overflow-y-auto p-6">
                {selectedConversation ? (
                  <div className="max-w-4xl">
                    {/* Date Separator */}
                    <div className="text-center mb-6">
                      <span className="text-sm text-gray-500 bg-white px-3">July 29</span>
                    </div>

                    {/* Messages */}
                    {selectedConversation.messages.map((message) => (
                      <div key={message.id} className="mb-6 relative">
                        <div style={{
                          position: "absolute",
                          top: "0px",
                          bottom: "0px",
                          left: "0px",
                          width: "4px",
                          backgroundColor: "rgb(124, 152, 182)",
                        }}></div>
                        <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
                          {/* Message Header */}
                          <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className={`text-white text-xs ${
                                  message.sender === "agent" ? "bg-blue-500" : "bg-orange-500"
                                }`}>
                                  {message.sender === "agent" ? "RG" : selectedConversation.contactAvatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-primary">
                                  {message.sender === "contact" ? selectedConversation.contactName : "Rituparn Gehlot"}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {new Date(message.timestamp).toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })} PM
                                </span>
                                <Badge variant="outline" className="text-xs capitalize text-teal border-teal">
                                  {message.type}
                                </Badge>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Message Content */}
                          <div className="p-4">
                            {message.sender === "contact" && (
                              <div className="text-sm text-gray-600 mb-3">
                                To: rituparn.g@turing.com
                              </div>
                            )}
                            {message.sender === "agent" && (
                              <div className="text-sm text-gray-600 mb-3">
                                To: {selectedConversation.contactEmail}
                              </div>
                            )}
                            
                            {message.sender === "contact" ? (
                              <div className="text-sm text-primary space-y-4">
                                <p>
                                  You connected <span className="text-teal font-medium">rituparn.g@turing.com</span> 🎉
                                </p>
                                <p>
                                  Any new emails sent to this address will also appear here. Choose what you'd like to do next:
                                </p>
                                
                                <div className="space-y-3">
                                  <div>
                                    <p className="font-semibold text-primary mb-1">Try it out</p>
                                    <p>
                                      Send yourself an email at <span className="text-teal font-medium">rituparn.g@turing.com</span>
                                    </p>
                                  </div>
                                  
                                  <div>
                                    <p className="font-semibold text-primary mb-1">Manage email channel settings</p>
                                    <p>
                                      Personalize your emails with a team signature. <Button variant="link" className="p-0 text-teal font-medium">Go to email channel settings</Button>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-sm text-primary whitespace-pre-wrap">
                                {message.content}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Select a conversation to view messages
                  </div>
                )}
              </div>

              {/* Reply Section */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Button variant="outline" size="sm" className="bg-teal border-teal hover:bg-teal/90">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    Comment
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Textarea
                    placeholder="Write a message. Press '/' or highlight text to access AI commands"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="min-h-[120px] resize-none pr-12"
                  />
                  <div className="absolute bottom-3 right-3">
                    <Button variant="ghost" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-teal">
                      Insert
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant={"ghost"}>
                      <CheckCheck className="w-4 h-4 mr-2" />
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button 
                    variant={"default"}
                      className="bg-teal-500 hover:bg-teal/90 text-white"
                      onClick={handleSendMessage}
                      disabled={!replyMessage.trim()}
                    >
                      Send
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${showContactDetails ? 'block w-full' : 'hidden'} xl:block xl:w-80 xl:min-w-[300px] border-l border-gray-200 bg-gray-50`}>
                <div className="p-4">
                <div className="flex items-center justify-between mb-4 ">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-orange-500 text-white text-xs">
                        {selectedConversation?.contactAvatar || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-primary">
                        {selectedConversation?.contactName.split('(')[0].trim() || "No contact"}...
                      </h3>
                      <Button variant="link" className="p-0 h-auto text-teal text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* About this Contact */}
                <div className="mb-6 ">
                  <div className="flex items-center gap-2 mb-3">
                    <ChevronDown className="w-4 h-4" />
                    <h4 className="font-medium text-primary">About this Contact</h4>
                    <Button variant="ghost" size="sm">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                      </svg>
                    </Button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="inbox-field-name">Email</span>
                      <div className="text-primary">
                        {selectedConversation?.contactEmail || "No email"}
                      </div>
                    </div>
                    <div>
                      <span className="inbox-field-name">Phone number</span>
                      <div className="text-gray-500">--</div>
                    </div>
                    <div>
                      <span className="inbox-field-name">Contact owner</span>
                      <div className="text-primary">No owner</div>
                    </div>
                    <div>
                      <span className="inbox-field-name">Last contacted</span>
                      <div className="text-primary">07/25/2025 11:51 PM GMT+5:30</div>
                    </div>
                    <div>
                      <span className="inbox-field-name">Lifecycle stage</span>
                      <div className="text-primary">Lead</div>
                    </div>
                    <div>
                      <span className="inbox-field-name">Lead status</span>
                      <div className="text-gray-500">--</div>
                    </div>
                    <div>
                      <span className="inbox-field-name">Legal basis for processing contact's data</span>
                      <div className="text-gray-500">--</div>
                    </div>
                    <div>
                      <span className="inbox-field-name">Record source</span>
                      <div className="text-primary">HubSpot Processing</div>
                    </div>
                  </div>
                </div>

                {/* Companies */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <ChevronDown className="w-4 h-4" />
                    <h4 className="font-medium text-primary">Companies (1)</h4>
                  </div>
                  <div className="bg-white rounded p-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-teal text-white text-xs">Primary</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-orange-500 text-white text-xs">H</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="link" className="p-0 h-auto text-teal font-medium">
                          {selectedConversation?.company || "HubSpot"}
                        </Button>
                        <div className="text-xs text-gray-600">
                          {selectedConversation?.company?.toLowerCase() || "hubspot"}.com
                        </div>
                        <div className="text-xs text-gray-600">Phone: --</div>
                      </div>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-teal text-xs mt-2">
                      View associated companies
                    </Button>
                  </div>
                </div>

                {/* Other conversations */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <ChevronDown className="w-4 h-4" />
                    <h4 className="font-medium text-primary">Other conversations (0)</h4>
                  </div>
                  <div className="text-sm text-gray-600">
                    Past conversations will live here.
                  </div>
                </div>

                {/* Ticket */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ChevronDown className="w-4 h-4" />
                      <h4 className="font-medium text-primary">Ticket</h4>
                    </div>
                    <div className="text-sm text-gray-600">
                      Create a ticket from this conversation.
                    </div>
                  </div>
                </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar - Contact Info */}
       
      </div>
    </div>
  )
}
