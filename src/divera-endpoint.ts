import axios, {AxiosRequestConfig} from 'axios';

const DIVERA_API_BASE_URL = "https://www.divera247.com/api/"

export abstract class DiveraEndpoint {
  apiUrl: string;
  axiosConfig = {} as AxiosRequestConfig;

  protected constructor(accessKey: string,
                        endpointPath: string) {
    this.apiUrl = DIVERA_API_BASE_URL + endpointPath;
    this.axiosConfig.params = {accessKey};
  }

  post<ResponseType>(payload: any, resourcePath: string = ""): Promise<ResponseType> {
    return axios.post<ResponseType>(this.apiUrl + resourcePath, payload, this.axiosConfig)
      .then(((response: { data: ResponseType; }) => response.data))
  }

  get<ResponseType>(resourcePath: string = ""): Promise<ResponseType> {
    return axios.get<ResponseType>(this.apiUrl + resourcePath, this.axiosConfig)
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
