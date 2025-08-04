"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Edit,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link as LinkIcon,
  Plus,
  ChevronDown,
  MoreHorizontal,
  Check,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { addPlaybook, updatePlaybook, type Playbook } from "@/lib/store/slices/playbooksSlice"
import { toast } from "sonner"

interface QuestionBlock {
  id: string
  question: string
  answer: string
  type: "question"
}

interface TextBlock {
  id: string
  content: string
  type: "text"
}

type ContentBlock = QuestionBlock | TextBlock

function PlaybookEditorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const { playbooks } = useAppSelector((state) => state.playbooks)
  
  const [playbookTitle, setPlaybookTitle] = useState("Playbook internal -1")
  const [isDraftSaved, setIsDraftSaved] = useState(true)
  const [currentPlaybookId, setCurrentPlaybookId] = useState<string | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    {
      id: "q1",
      question: "This is question 2?",
      answer: "Notes",
      type: "question"
    },
    {
      id: "text1",
      content: "Introduce the purpose of your playbook here. Include any relevant instructions for your reps.",
      type: "text"
    },
    {
      id: "q2", 
      question: "What are your company's goals ?",
      answer: "Notes",
      type: "question"
    }
  ])

  // Load existing playbook if ID is provided in URL
  useEffect(() => {
    const playbookId = searchParams.get('id')
    if (playbookId) {
      const existingPlaybook = playbooks.find(p => p.id === playbookId)
      if (existingPlaybook) {
        setCurrentPlaybookId(playbookId)
        setIsEditMode(true)
        setPlaybookTitle(existingPlaybook.name)
        
        // Convert playbook steps back to content blocks
        const convertedBlocks: ContentBlock[] = []
        
        // Add description as first text block if available
        if (existingPlaybook.description) {
          convertedBlocks.push({
            id: "text_desc",
            content: existingPlaybook.description,
            type: "text"
          })
        }
        
        // Convert steps to question blocks
        if (existingPlaybook.steps) {
          existingPlaybook.steps.forEach((step, index) => {
            const questionText = step.replace(/^\d+\.\s*/, '') // Remove numbering
            convertedBlocks.push({
              id: `q_${index}`,
              question: questionText,
              answer: "Notes",
              type: "question"
            })
          })
        }
        
        if (convertedBlocks.length > 0) {
          setContentBlocks(convertedBlocks)
        }
      }
    }
  }, [searchParams, playbooks])

  const handleBackToPlaybooks = () => {
    router.push("/crm/playbooks")
  }

  const updateQuestionBlock = (id: string, field: 'question' | 'answer', value: string) => {
    setContentBlocks(blocks => 
      blocks.map(block => 
        block.id === id && block.type === 'question' 
          ? { ...block, [field]: value }
          : block
      )
    )
    setIsDraftSaved(false)
  }

  const updateTextBlock = (id: string, content: string) => {
    setContentBlocks(blocks =>
      blocks.map(block =>
        block.id === id && block.type === 'text'
          ? { ...block, content }
          : block
      )
    )
    setIsDraftSaved(false)
  }

  const addQuestionBlock = () => {
    const newQuestion: QuestionBlock = {
      id: `q${Date.now()}`,
      question: "New question?",
      answer: "Notes",
      type: "question"
    }
    setContentBlocks([...contentBlocks, newQuestion])
  }

  const addTextBlock = () => {
    const newText: TextBlock = {
      id: `text${Date.now()}`,
      content: "Enter your text here...",
      type: "text"
    }
    setContentBlocks([...contentBlocks, newText])
  }

  const handlePublish = () => {
    try {
      if (isEditMode && currentPlaybookId) {
        // Update existing playbook
        const existingPlaybook = playbooks.find(p => p.id === currentPlaybookId)
        if (existingPlaybook) {
          const updatedPlaybook: Playbook = {
            ...existingPlaybook,
            name: playbookTitle,
            modifiedAt: "just now",
            description: generatePlaybookDescription(contentBlocks),
            steps: generatePlaybookSteps(contentBlocks)
          }
          
          dispatch(updatePlaybook(updatedPlaybook))
          toast.success("Playbook updated successfully!")
        }
      } else {
        // Create a new playbook
        const newPlaybook: Playbook = {
          id: `playbook_${Date.now()}`,
          name: playbookTitle,
          status: "Published",
          totalViews: 0,
          lastViewed: undefined,
          createdBy: "You",
          modifiedAt: "just now",
          createdDate: new Date().toISOString(),
          description: generatePlaybookDescription(contentBlocks),
          steps: generatePlaybookSteps(contentBlocks)
        }

        dispatch(addPlaybook(newPlaybook))
        toast.success("Playbook published successfully!")
      }
      
      // Navigate back to playbooks list
      router.push("/crm/playbooks")
    } catch (error) {
      console.error("Error publishing playbook:", error)
      toast.error("Failed to publish playbook. Please try again.")
    }
  }

  const generatePlaybookDescription = (blocks: ContentBlock[]): string => {
    const textBlocks = blocks.filter(block => block.type === 'text') as TextBlock[]
    if (textBlocks.length > 0) {
      return textBlocks[0].content.substring(0, 100) + (textBlocks[0].content.length > 100 ? '...' : '')
    }
    return "A custom playbook created with interactive questions and content."
  }

  const generatePlaybookSteps = (blocks: ContentBlock[]): string[] => {
    const questionBlocks = blocks.filter(block => block.type === 'question') as QuestionBlock[]
    return questionBlocks.map((block, index) => `${index + 1}. ${block.question}`)
  }

  return (
    <div className="h-screen bg-gray-100" style={{ fontFamily: '"Lexend Deca",Helvetica,Arial,sans-serif' }}>
      <style jsx>{`
        * {
          font-family: "Lexend Deca", Helvetica, Arial, sans-serif;
        }
        .text-primary { color: #33475b; }
        .text-teal { color: #00BDA5; }
        .bg-teal { background-color: #00BDA5; }
        .border-teal { border-color: #00BDA5; }
        .text-orange { color: #FF7A00; }
        .bg-orange { background-color: #FF7A00; }
      `}</style>

      {/* Header */}
      <div className="bg-gray-700 text-white px-6 py-3 border-b border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToPlaybooks}
              className="text-white hover:text-white hover:bg-gray-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to playbooks
            </Button>
            <div className="flex items-center gap-2">
              <Input
                value={playbookTitle}
                onChange={(e) => setPlaybookTitle(e.target.value)}
                className="bg-transparent border-none text-white text-lg font-medium focus:ring-0 p-0 h-auto min-w-[200px]"
              />
              <Edit className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isDraftSaved && (
              <span className="text-sm text-gray-300">Unsaved changes</span>
            )}
            {isDraftSaved && (
              <div className="flex items-center gap-1 text-sm text-green-400">
                <Check className="w-4 h-4" />
                Draft saved
              </div>
            )}
            <Button 
              className="bg-orange-500 hover:bg-orange/90 text-white rounded-sm shadow-md"
              onClick={handlePublish}
            >
              {isEditMode ? "Update" : "Publish"}
            </Button>
          </div>
        </div>
      </div>

      {/* Sub Header */}
      <div className="bg-white border-b border-gray-300 px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
              Published. Republish to see new changes.
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" className="text-gray-600">
              Write
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[rgb(234, 240, 246)]  px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 grow justify-center">
            {/* Text Style Dropdown */}
            <select className="text-sm border border-gray-300 rounded px-3 py-1 bg-white text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-w-[100px]">
              <option>Paragraph</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
              <option>Heading 3</option>
            </select>
            
            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            
            {/* Basic Formatting */}
            <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 text-gray-600">
              <Bold className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 text-gray-600">
              <Italic className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 text-gray-600">
              <Underline className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 text-gray-600">
              <span className="text-sm font-bold text-gray-600">S</span>
            </Button>
            
            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            
            {/* Text Color and Highlight */}
            <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 text-gray-600">
              <span className="text-lg font-bold">A</span>
            </Button>
            <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100">
              <div className="w-4 h-2 bg-yellow-300 border border-gray-300 rounded-sm"></div>
            </Button>
            
            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            
            {/* Alignment */}
            <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 text-gray-600">
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 text-gray-600">
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 text-gray-600">
              <AlignRight className="w-4 h-4" />
            </Button>
            
            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            
            {/* Lists */}
            <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 text-gray-600">
              <List className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 text-gray-600">
              <ListOrdered className="w-4 h-4" />
            </Button>
            
            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            
            {/* Link and More */}
            <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 text-gray-600">
              <LinkIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 text-gray-600">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
            
            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            
            {/* HubSpot Specific Features */}
            <Button size="sm" variant={'ghost'} className=" text-teal-500 hover:bg-teal/90 px-3 py-1.5 text-sm font-semibold">
              Personalization
            </Button>
            <Button size="sm" className="bg-teal-500 text-white hover:bg-teal/90 px-2 py-1.5 text-xs font-medium relative ml-1">
              NEW
              <span className="absolute -top-1 -right-1 bg-orange text-white text-[10px] rounded-full w-3 h-3 flex items-center justify-center font-bold">
                !
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="text-teal hover:bg-teal/10 px-3 py-1.5 text-xs font-medium ml-1">
              Insert
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </div>
          
          {/* Right Side - Version History */}
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-100 px-3 py-1.5 text-xs">
              Version History
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-gray-300 p-4 bg-[rgb(234, 240, 246)]">
          <div className="mb-4">
            <h3 className="font-medium text-primary mb-3">Playbook contents</h3>
            <div className="space-y-2">
              {contentBlocks.map((block, index) => (
                <div key={block.id} className="flex items-center gap-2 text-sm">
                  {block.type === 'question' ? (
                    <>
                      <div className="w-4 h-4 rounded-full bg-teal flex items-center justify-center text-white text-xs">
                        Q
                      </div>
                      <span className="text-teal truncate">
                        {(block as QuestionBlock).question}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 rounded bg-gray-400"></div>
                      <span className="text-gray-600 truncate">
                        {(block as TextBlock).content.substring(0, 30)}...
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 bg-white p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={addQuestionBlock}
                className="text-teal border-teal"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Question
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={addTextBlock}
                className="text-gray-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Text
              </Button>
            </div>

            <div className="space-y-6">
              {contentBlocks.map((block, index) => (
                <div key={block.id} className="group relative">
                  {block.type === 'question' ? (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white text-sm font-medium mt-1 flex-shrink-0">
                          Q
                        </div>
                        <div className="flex-1 space-y-3">
                          <Input
                            value={(block as QuestionBlock).question}
                            onChange={(e) => updateQuestionBlock(block.id, 'question', e.target.value)}
                            className="font-medium text-primary bg-transparent border-none p-0 focus:ring-0"
                            placeholder="Enter your question..."
                          />
                          <Textarea
                            value={(block as QuestionBlock).answer}
                            onChange={(e) => updateQuestionBlock(block.id, 'answer', e.target.value)}
                            className="bg-white border-gray-200 resize-none min-h-[80px]"
                            placeholder="Notes"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="group">
                      <Textarea
                        value={(block as TextBlock).content}
                        onChange={(e) => updateTextBlock(block.id, e.target.value)}
                        className="w-full border-none bg-transparent resize-none p-2 focus:ring-0 text-gray-700 min-h-[60px]"
                        placeholder="Enter your text..."
                      />
                    </div>
                  )}
                  
                  {/* Block actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PlaybookEditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlaybookEditorContent />
    </Suspense>
  )
}