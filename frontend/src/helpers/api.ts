import axiosService from './axios';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Helper function for making GET requests
export const get = async <T>(
  url: string,
  config?: InternalAxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosService.get<T>(url, config);
};

// Helper function for making POST requests
export const post = async <T>(
  url: string,
  data?: any,
  config?: InternalAxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosService.post<T>(url, data, config);
};

// Helper function for making PUT requests
export const put = async <T>(
  url: string,
  data?: any,
  config?: InternalAxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosService.put<T>(url, data, config);
};

// Helper function for making PATCH requests
export const patch = async <T>(
  url: string,
  data?: any,
  config?: InternalAxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosService.patch<T>(url, data, config);
};

// Helper function for making DELETE requests
export const del = async <T>(
  url: string,
  config?: InternalAxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosService.delete<T>(url, config);
};
