export interface CampaignDTO {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  sectorId?: number;
  businessId?: number;
}
