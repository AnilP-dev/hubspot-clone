import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Asset {
  id: string
  name: string
  type: string
  status: string
  updatedAt: string
}

export interface BudgetItem {
  id: string
  name: string
  description: string
  unitPrice: number
  currency: string
  campaignId: string
  createdDate: string
  modifiedDate: string
}

export interface SpendItem {
  id: string
  name: string
  description: string
  unitPrice: number
  currency: string
  campaignId: string
  createdDate: string
  modifiedDate: string
}

export interface Activity {
  id: string
  campaignId: string
  userId: string
  userName: string
  userAvatar?: string
  action: 'added' | 'removed' | 'updated'
  entityType: 'marketing_email' | 'form' | 'landing_page' | 'budget_item' | 'spend_item' | 'campaign' | 'asset'
  entityName: string
  entityId?: string
  description: string
  timestamp: string
  details?: any
}

export interface Campaign {
  id: string
  name: string
  utm: string
  owner: string
  startDate: string
  endDate: string
  status: string
  color: string
  audience: string
  budget: number
  spend: number
  notes: string
  assets: Asset[]
  budgetItems: BudgetItem[]
  spendItems: SpendItem[]
  activities: Activity[]
  createdAt: string
  updatedAt: string
}

interface CampaignState {
  campaigns: Campaign[]
  loading: boolean
  error: string | null
}

const initialState: CampaignState = {
  campaigns: [],
  loading: false,
  error: null
}

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    addCampaign: (state, action: PayloadAction<Campaign>) => {
      state.campaigns.push(action.payload)
    },
    updateCampaign: (state, action: PayloadAction<{ id: string; campaign: Partial<Campaign> }>) => {
      const { id, campaign } = action.payload
      const existingCampaign = state.campaigns.find(c => c.id === id)
      if (existingCampaign) {
        Object.assign(existingCampaign, campaign, { updatedAt: new Date().toISOString() })
      }
    },
    addAssetsToCampaign: (state, action: PayloadAction<{ campaignId: string; assets: Asset[] }>) => {
      const { campaignId, assets } = action.payload
      const campaign = state.campaigns.find(c => c.id === campaignId)
      if (campaign) {
        // Add only new assets (avoid duplicates)
        const newAssets = assets.filter(newAsset => 
          !campaign.assets.some(existingAsset => existingAsset.id === newAsset.id)
        )
        campaign.assets.push(...newAssets)
        campaign.updatedAt = new Date().toISOString()
      }
    },
    addBudgetItemToCampaign: (state, action: PayloadAction<{ campaignId: string; budgetItem: BudgetItem }>) => {
      const { campaignId, budgetItem } = action.payload
      const campaign = state.campaigns.find(c => c.id === campaignId)
      if (campaign) {
        if (!campaign.budgetItems) {
          campaign.budgetItems = []
        }
        campaign.budgetItems.push(budgetItem)
        campaign.updatedAt = new Date().toISOString()
      }
    },
    updateBudgetItem: (state, action: PayloadAction<{ campaignId: string; budgetItemId: string; budgetItem: Partial<BudgetItem> }>) => {
      const { campaignId, budgetItemId, budgetItem } = action.payload
      const campaign = state.campaigns.find(c => c.id === campaignId)
      if (campaign && campaign.budgetItems) {
        const existingBudgetItem = campaign.budgetItems.find(item => item.id === budgetItemId)
        if (existingBudgetItem) {
          Object.assign(existingBudgetItem, budgetItem, { modifiedDate: new Date().toISOString() })
          campaign.updatedAt = new Date().toISOString()
        }
      }
    },
    removeBudgetItem: (state, action: PayloadAction<{ campaignId: string; budgetItemId: string }>) => {
      const { campaignId, budgetItemId } = action.payload
      const campaign = state.campaigns.find(c => c.id === campaignId)
      if (campaign && campaign.budgetItems) {
        campaign.budgetItems = campaign.budgetItems.filter(item => item.id !== budgetItemId)
        campaign.updatedAt = new Date().toISOString()
      }
    },
    addSpendItemToCampaign: (state, action: PayloadAction<{ campaignId: string; spendItem: SpendItem }>) => {
      const { campaignId, spendItem } = action.payload
      const campaign = state.campaigns.find(c => c.id === campaignId)
      if (campaign) {
        if (!campaign.spendItems) {
          campaign.spendItems = []
        }
        campaign.spendItems.push(spendItem)
        campaign.updatedAt = new Date().toISOString()
      }
    },
    updateSpendItem: (state, action: PayloadAction<{ campaignId: string; spendItemId: string; spendItem: Partial<SpendItem> }>) => {
      const { campaignId, spendItemId, spendItem } = action.payload
      const campaign = state.campaigns.find(c => c.id === campaignId)
      if (campaign && campaign.spendItems) {
        const existingSpendItem = campaign.spendItems.find(item => item.id === spendItemId)
        if (existingSpendItem) {
          Object.assign(existingSpendItem, spendItem, { modifiedDate: new Date().toISOString() })
          campaign.updatedAt = new Date().toISOString()
        }
      }
    },
    removeSpendItem: (state, action: PayloadAction<{ campaignId: string; spendItemId: string }>) => {
      const { campaignId, spendItemId } = action.payload
      const campaign = state.campaigns.find(c => c.id === campaignId)
      if (campaign && campaign.spendItems) {
        campaign.spendItems = campaign.spendItems.filter(item => item.id !== spendItemId)
        campaign.updatedAt = new Date().toISOString()
      }
    },
    addActivity: (state, action: PayloadAction<{ campaignId: string; activity: Activity }>) => {
      const { campaignId, activity } = action.payload
      const campaign = state.campaigns.find(c => c.id === campaignId)
      if (campaign) {
        if (!campaign.activities) {
          campaign.activities = []
        }
        campaign.activities.unshift(activity) // Add to beginning for chronological order
        campaign.updatedAt = new Date().toISOString()
      }
    },
    removeCampaign: (state, action: PayloadAction<string>) => {
      state.campaigns = state.campaigns.filter(campaign => campaign.id !== action.payload)
    },
    removeCampaigns: (state, action: PayloadAction<string[]>) => {
      state.campaigns = state.campaigns.filter(campaign => !action.payload.includes(campaign.id))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})

export const { 
  addCampaign, 
  updateCampaign, 
  addAssetsToCampaign, 
  addBudgetItemToCampaign,
  updateBudgetItem,
  removeBudgetItem,
  addSpendItemToCampaign,
  updateSpendItem,
  removeSpendItem,
  addActivity,
  removeCampaign, 
  removeCampaigns, 
  setLoading, 
  setError 
} = campaignsSlice.actions

export default campaignsSlice.reducer