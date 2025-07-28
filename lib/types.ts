export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  jobTitle: string
  leadStatus: string
  favoriteContent: string
  contactOwner: string
  createDate: string
  lastActivityDate: string
}

export interface Company {
  id: string
  name: string
  domain: string
  owner: string
  phone: string
  createDate: string
  lastActivityDate: string
  industry: string
  city: string
  state: string
}

export interface Deal {
  id: string
  name: string
  stage: string
  amount: number
  closeDate: string
  owner: string
  createDate: string
  priority: string
  type: string
}

export interface Ticket {
  id: string
  name: string
  description: string
  pipeline: string
  status: string
  source: string
  owner: string
  priority: "Low" | "Medium" | "High" | "Urgent"
  createDate: string
  lastActivityDate: string
  associatedContact?: string
  associatedCompany?: string
}

export type FilterType = "all" | "my" | "unassigned"
