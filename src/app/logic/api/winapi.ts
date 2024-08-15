import axios, { AxiosInstance } from 'axios';
import { IWinApiDll } from "@/app/interfaces/winapi-dll";

class WinAPI {
  private _instance: AxiosInstance;

  constructor() {
    this._instance = axios.create({
      baseURL: '/api/proxy',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  }

  getInstance = (): AxiosInstance => {
    return this._instance;
  }
}

const API = new WinAPI();

export const Dlls = {
  get: async (): Promise<IWinApiDll[]> => { 
    try {
      const { data } = await API.getInstance().get('/');
      return data as IWinApiDll[];
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error}`);
    }
  }
}
