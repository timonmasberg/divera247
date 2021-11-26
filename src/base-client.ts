import axios, {AxiosRequestConfig} from "axios";

const DIVERA_API_BASE_URL = "https://divera247.com/api/"

export abstract class BaseClient {
  private axiosConfig = {} as AxiosRequestConfig;

  constructor(accessKey: string) {
    if (accessKey) {
      this.axiosConfig.params = {
        accessKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
    }
  }

  protected post<ResponseType = void>(payload: any, resourcePath = ""): Promise<ResponseType> {
    return axios.post<ResponseType>(DIVERA_API_BASE_URL + resourcePath, payload, this.axiosConfig)
      .then(((response) => response.data));
  }

  protected get<ResponseType>(resourcePath = "", data?: {}): Promise<ResponseType> {
    // Divera has GET endpoints that expect a body :)
    return axios.get<ResponseType>(DIVERA_API_BASE_URL + resourcePath, {...this.axiosConfig, data})
      .then(((response) => response.data));
  }

  protected delete<ResponseType = void>(resourcePath = ""): Promise<ResponseType> {
    return axios.delete<ResponseType>(DIVERA_API_BASE_URL + resourcePath, this.axiosConfig)
      .then(((response) => response.data));
  }

  protected patch<ResponseType>(payload: any, resourcePath = ""): Promise<ResponseType> {
    return axios.patch<ResponseType>(DIVERA_API_BASE_URL + resourcePath, payload, this.axiosConfig)
      .then(((response) => response.data));
  }

  protected put<ResponseType>(payload: any, resourcePath = ""): Promise<ResponseType> {
    return axios.put<ResponseType>(DIVERA_API_BASE_URL + resourcePath, payload, this.axiosConfig)
      .then(((response) => response.data));
  }
}
