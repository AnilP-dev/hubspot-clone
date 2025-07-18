export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  leadStatus: string
  favoriteContent: string
  avatar: string
}

export interface Company {
  id: string
  name: string
  owner: string
  createDate: string
  phoneNumber: string
  lastActivityDate: string
  avatar: string
}

export interface Deal {
  id: string
  name: string
  amount: number
  stage: string
  closeDate: string
  owner: string
}
