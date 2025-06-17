export interface UnitReport {
  unitId: string;
  month: string;
  gasUsage: number;
  waterUsage: number;
  rateValue: number;
  totalExpenses: number;
  totalToPay: number;
  pixKey: string;
  pixQrCodeUrl: string;
}
