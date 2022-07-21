import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axiosConstants from "./axiosConstants";

/**
 * code from this page was lifted from TVP project
 */
// TODO: sort out headers later

// console.log("user-header", userHeader)
const settings = {
  headers: {
    // "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    // Accept: "*/*"
    "Content-Type": "application/json;charset",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "X-XSRF-TOKEN": axiosConstants.XSRF
  }
};

const baseURLCert =
  process.env.NODE_ENV === "development"
    ? "**"
    : "https://isw-demo-wallet.co/api/cert";

const baseURLITG =
  process.env.NODE_ENV === "test"
    ? "**"
    : "https://isw-demo-wallet.co/api/itg";
const baseURLCTS =
  process.env.NODE_ENV === "test"
    ? "**"
    : `https://isw-demo-wallet.co/api/cts`;

const instanceITG = axios.create({ ...settings, baseURL: baseURLITG });
const instanceCTS = axios.create({ ...settings, baseURL: baseURLCTS });
const instanceCert = axios.create({ ...settings, baseURL: baseURLCert });

// Reference: https://github.com/axios/axios
// const AUTH_TOKEN = 'random string from cookie';

// const token = getSession();
// AUTH_TOKEN can be gotten from cookie. Check other project for how?
// Alter defaults after instance has been created

interface AxiosInstanceType {
  get: (url: string, request?: AxiosRequestConfig) => Promise<AxiosResponse>;
  post: (url: string, data: any) => Promise<AxiosResponse>;
  put: (url: string, data: any) => Promise<AxiosResponse>;
  patch: (url: string, data: any) => Promise<AxiosResponse>;
  delete: (url: string, request?: AxiosRequestConfig) => Promise<AxiosResponse>;
}

const getAxiosInstance = (_instance: AxiosInstance) => {
  return {
    async get(url: string, request: AxiosRequestConfig | undefined) {
      try {
        const response = await _instance.get(url, request);
        return await Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async post(url: string, data: any) {
      try {
        const response = await _instance.post(url, data);
        return await Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async put(url: string, data: any) {
      try {
        const response = await _instance.put(url, data);
        return await Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async patch(url: string, data: any) {
      try {
        const response = await _instance.patch(url, data);
        return await Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async delete(url: string, request: AxiosRequestConfig | undefined) {
      try {
        const response = await _instance.delete(url, request);
        return await Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};

export const axiosInstanceITG: AxiosInstanceType =
  getAxiosInstance(instanceITG);

export const axiosInstanceCTS: AxiosInstanceType =
  getAxiosInstance(instanceCTS);

export const axiosInstanceCert: AxiosInstanceType =
  getAxiosInstance(instanceCert);
