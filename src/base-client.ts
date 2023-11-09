import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DiveraResponse } from './endpoints/divera-response.model';
import { LoginApiData } from './endpoints/auth/models/login-api-data.model';

const DIVERA_API_BASE_URL = 'https://app.divera247.com/api/';

export abstract class BaseClient {
  protected readonly axiosConfig = {} as AxiosRequestConfig;

  constructor(accessKey: string) {
    this.axiosConfig.params = {
      accesskey: accessKey,
    };
  }

  static async getAccessToken(
    username: string,
    password: string,
  ): Promise<string> {
    const response = await axios.post<DiveraResponse<LoginApiData>>(
      DIVERA_API_BASE_URL + 'v2/auth/login',
      {
        Login: {
          username,
          password,
          jwt: false,
        },
      },
    );

    if (!response.data.success) {
      throw new Error(
        `Fehler ${response.data.error}. ${(
          response.data.errors as string[]
        ).join(', ')}.`,
      );
    }

    return response.data.data.user.access_token;
  }

  protected async post<TResponseData = unknown>(
    resourcePath: string,
    payload: unknown = {},
  ): Promise<DiveraResponse<TResponseData>> {
    return this.getResponseInErrorBoundary(
      axios.post<DiveraResponse<TResponseData>>(
        DIVERA_API_BASE_URL + resourcePath,
        payload,
        this.axiosConfig,
      ),
    );
  }

  protected get<TResponseData = unknown>(
    resourcePath: string,
  ): Promise<DiveraResponse<TResponseData>> {
    return this.getResponseInErrorBoundary(
      axios.get<DiveraResponse<TResponseData>>(
        DIVERA_API_BASE_URL + resourcePath,
        {
          ...this.axiosConfig,
        },
      ),
    );
  }

  protected delete<TResponseData = unknown>(
    resourcePath: string,
  ): Promise<DiveraResponse<TResponseData>> {
    return this.getResponseInErrorBoundary(
      axios.delete<DiveraResponse<TResponseData>>(
        DIVERA_API_BASE_URL + resourcePath,
        this.axiosConfig,
      ),
    );
  }

  protected patch<TResponseData>(
    resourcePath: string,
    payload: unknown,
  ): Promise<DiveraResponse<TResponseData>> {
    return this.getResponseInErrorBoundary(
      axios.patch<DiveraResponse<TResponseData>>(
        DIVERA_API_BASE_URL + resourcePath,
        payload,
        this.axiosConfig,
      ),
    );
  }

  protected put<TResponseData>(
    resourcePath: string,
    payload: unknown,
  ): Promise<DiveraResponse<TResponseData>> {
    return this.getResponseInErrorBoundary(
      axios.put<DiveraResponse<TResponseData>>(
        DIVERA_API_BASE_URL + resourcePath,
        payload,
        this.axiosConfig,
      ),
    );
  }

  private async getResponseInErrorBoundary<TResponseData>(
    request: Promise<AxiosResponse<DiveraResponse<TResponseData>>>,
  ): Promise<DiveraResponse<TResponseData>> {
    try {
      const response = await request;
      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response) {
        return e.response.data;
      } else if (e instanceof Error) {
        return {
          success: false,
          error: e.message,
        };
      }

      return {
        success: false,
        error: 'Unknown Error',
      };
    }
  }
}
