import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Asset {
  id: string
  name: string
  type: string
  status: string
  updatedAt: string
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
  removeCampaign, 
  removeCampaigns, 
  setLoading, 
  setError 
} = campaignsSlice.actions

export default campaignsSlice.reducer