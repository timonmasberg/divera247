export interface DiveraResponse<T=Record<string, any>> extends SimpleDiveraResponse{
  data: T;
  ucr: number;
}

export interface SimpleDiveraResponse{
  success: boolean;
}
