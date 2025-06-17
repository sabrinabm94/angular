export interface UsageLog {
  id?: string;
  userId: string;
  action: string;
  timestamp: string;
  details?: any;
}
