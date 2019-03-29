export class DashboardService_deleteDashboardResponse {
  success: boolean;
  errorDescription: string;

  constructor(success: boolean, errorDescription: string = '') {
    this.success = success;
    this.errorDescription = errorDescription;

  }
}
