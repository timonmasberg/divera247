import axios, {AxiosRequestConfig} from "axios";

const DIVERA_API_BASE_URL = "https://divera247.com/api/"

export abstract class DiveraEndpoint {
  apiUrl: string;
  axiosConfig = {} as AxiosRequestConfig;

  protected constructor(endpointPath: string,
                        accessKey?: string) {
    this.apiUrl = DIVERA_API_BASE_URL + endpointPath;

    if (accessKey) {
      this.axiosConfig.params = {
        accesskey: accessKey
      };
    }
  }

  post<ResponseType = void>(payload: any, resourcePath = ""): Promise<ResponseType> {
    return axios.post<ResponseType>(this.apiUrl + resourcePath, payload, this.axiosConfig)
      .then(((response) => response.data))
  }

  get<ResponseType>(resourcePath = "", data?: {}): Promise<ResponseType> {
    // Divera has GET endpoints that expect a body
    return axios.get<ResponseType>(this.apiUrl + resourcePath, {...this.axiosConfig, data})
      .then(((response) => {
        console.log('RES: ', response)
        return response.data
      }))
  }

  delete<ResponseType = void>(resourcePath = ""): Promise<ResponseType> {
    return axios.delete<ResponseType>(this.apiUrl + resourcePath, this.axiosConfig)
      .then(((response) => response.data))
  }

  patch<ResponseType>(payload: any, resourcePath = ""): Promise<ResponseType> {
    return axios.patch<ResponseType>(this.apiUrl + resourcePath, payload, this.axiosConfig)
      .then(((response) => response.data))
  }

  put<ResponseType>(payload: any, resourcePath = ""): Promise<ResponseType> {
    return axios.put<ResponseType>(this.apiUrl + resourcePath, payload, this.axiosConfig)
      .then(((response) => response.data))
  }
}
