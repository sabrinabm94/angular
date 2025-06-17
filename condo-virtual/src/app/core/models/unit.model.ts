export interface Unit {
  id?: string;
  condominiumId: string;
  unitNumber: string;
  ownerName: string;
  tenantName?: string;
  rateAmount: number;
}
