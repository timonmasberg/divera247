export interface DiveraResponse<T=Record<string, any>> {
  success: boolean;
  data: T;
  ucr: number;
}
