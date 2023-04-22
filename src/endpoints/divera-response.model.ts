export type DiveraResponse<T = unknown> =
  | {
      success: true;
      data: T;
      ucr?: number;
    }
  | {
      success: false;
      error: string;
      errors?: Record<string, string[]>;
    };
