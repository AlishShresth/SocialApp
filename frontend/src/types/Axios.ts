import { AxiosRequestConfig } from "axios";

export interface AxiosRequestConfigWithAuth extends AxiosRequestConfig {
  headers: {
    Authorization: string;
  }
}