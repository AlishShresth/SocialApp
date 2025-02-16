import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { AuthTokens } from '../types/Auth';
import { AxiosRequestConfigWithAuth } from '../types/Axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const axiosService: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosService.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  //  Retrieving the access token from the localStorage and adding it to the headers of the request
  const authTokens: AuthTokens = JSON.parse(
    localStorage.getItem('auth') || '{}'
  );
  if (authTokens.access) {
    (
      config as AxiosRequestConfigWithAuth
    ).headers.Authorization = `Bearer ${authTokens.access}`;
  }

  return config;
});

axiosService.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAuthLogic = async (failedRequest: any) => {
  const authTokens: AuthTokens = JSON.parse(localStorage.getItem('auth') || '{}');
  if (!authTokens.refresh) {
    // Handle logout or redirect to login
    return Promise.reject("No refresh token available");
  }
  try {
    const response = await axios.post("/refresh", {
      refresh: authTokens.refresh,
    });
    const newAccessToken = response.data.access;
    localStorage.setItem('auth', JSON.stringify({ ...authTokens, access: newAccessToken }));
    
    failedRequest.response.config.headers.Authorization = `Bearer ${newAccessToken}`;

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export default axiosService;