import axios, {AxiosRequestConfig} from 'axios';

const DIVERA_API_BASE_URL = "https://www.divera247.com/api/"

export abstract class DiveraEndpoint {
  apiUrl: string;
  axiosConfig = {} as AxiosRequestConfig;

  protected constructor(endpointPath: string,
                        accessKey?: string) {
    this.apiUrl = DIVERA_API_BASE_URL + endpointPath;

    if (accessKey) {
      this.axiosConfig.params = {accessKey};
    }
  }

  post<ResponseType>(payload: any, resourcePath: string = ""): Promise<ResponseType> {
    return axios.post<ResponseType>(this.apiUrl + resourcePath, payload, this.axiosConfig)
      .then(((response: { data: ResponseType; }) => response.data))
  }

  get<ResponseType>(resourcePath: string = "", data?: {}): Promise<ResponseType> {
    // Divera has GET endpoints that expect a body
    return axios.get<ResponseType>(this.apiUrl + resourcePath, {...this.axiosConfig, data})
      .then(((response: { data: ResponseType; }) => response.data))
  }

  delete<ResponseType>(resourcePath: string = ""): Promise<ResponseType> {
    return axios.delete<ResponseType>(this.apiUrl + resourcePath, this.axiosConfig)
  }

  patch<ResponseType>(payload: any, resourcePath: string = ""): Promise<ResponseType> {
    return axios.patch<ResponseType>(this.apiUrl + resourcePath, payload, this.axiosConfig)
  }

  put<ResponseType>(payload: any, resourcePath: string = ""): Promise<ResponseType> {
    return axios.put<ResponseType>(this.apiUrl + resourcePath, payload, this.axiosConfig)
  }
}
