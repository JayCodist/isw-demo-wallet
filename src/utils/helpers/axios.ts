import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axiosConstants from "./axiosConstants";

/**
 * code from this page was lifted from TVP project
 */
// TODO: sort out headers later

// console.log("user-header", userHeader)
const settings = {
  // process.env.NODE_ENV !== "production"
  //   ? `https://interswitch-tokenization-gateway.k9.isw.la/itg/config/api/v1`
  //   : "itg-portlet/api/v1",
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
  process.env.NODE_ENV === "test"
    ? "itg-portlet-cert"
    : "https://interswitch-tokenization-gateway.k9.isw.la/itg/config-certs";

const baseURLITG =
  process.env.NODE_ENV === "test"
    ? "itg-portlet-base"
    : "https://interswitch-tokenization-gateway.k9.isw.la/itg/config/api/v1";
const baseURLCTS =
  process.env.NODE_ENV === "test"
    ? "itg-portlet-cts"
    : `https://card-tokenization-service.k8.isw.la/card-tokenization/api`;

const instanceITG = axios.create({ ...settings, baseURL: baseURLITG });
const instanceCTS = axios.create({ ...settings, baseURL: baseURLCTS });
const instanceCert = axios.create({ ...settings, baseURL: baseURLCert });

// Reference: https://github.com/axios/axios
// const AUTH_TOKEN = 'random string from cookie';

// const token = getSession();
// AUTH_TOKEN can be gotten from cookie. Check other project for how?
// Alter defaults after instance has been created
console.log("env: ", process.env.NODE_ENV);
if (process.env.NODE_ENV !== "test") {
  instanceITG.defaults.headers.common.Authorization =
    "Bearer eyJhbGciOiJSUzI1NiJ9.eyJsYXN0TmFtZSI6IkthbHUiLCJmaXJzdExvZ2luIjpmYWxzZSwidXNlcl9uYW1lIjoiQmxlc3NpbmcuS2FsdSIsIm1vYmlsZU5vIjpudWxsLCJjbGllbnRfZGVzY3JpcHRpb24iOm51bGwsImNsaWVudF9pZCI6Imlzdy1wb3J0YWwiLCJmaXJzdE5hbWUiOiJCbGVzc2luZyIsImVtYWlsVmVyaWZpZWQiOnRydWUsImF1ZCI6WyJhbWwtc2VydmljZSIsImFwaS1nYXRld2F5IiwiYXJiaXRlciIsImNhYy12ZXJpZmljYXRpb24tc2VydmljZSIsImNhZXNhciIsImVzY3Jvdy1zZXJ2aWNlIiwiaGltcy1wb3J0bGV0IiwiaXBnLXNldHRsZW1lbnQiLCJpc3ctY29sbGVjdGlvbnMiLCJpc3ctY29yZSIsImlzdy1pbnN0aXR1dGlvbiIsImlzdy1wYXltZW50Z2F0ZXdheSIsImt5Yy1zZXJ2aWNlIiwicGFzc3BvcnQiLCJwcm9qZWN0LXgtY29uc3VtZXIiLCJwcm9qZWN0LXgtbWVyY2hhbnQiLCJyZWZlcnJhbC1zZXJ2aWNlLWFwaSIsInRyYW5zZmVyLXNlcnZpY2UtY29yZSIsInRyYW5zZmVyLXNlcnZpY2UtY29yZS1hZG1pbiIsInRyYW5zZmVyLXNlcnZpY2UtcG9ydGxldCIsInZvdWNoZXItYXBpIiwid2FsbGV0Iiwid2VicGF5LXBvcnRsZXQiXSwiY2xpZW50X2F1dGhvcml6YXRpb25fZG9tYWluIjoiSVNXIiwic2NvcGUiOlsiY2xpZW50cyIsImt5YzphdWRpdHMiLCJreWM6Y2FsbGJhY2tzIiwia3ljOmVudGl0aWVzIiwia3ljOnJlcG9ydHMiLCJreWM6c2VydmljZXMiLCJreWM6dmVyaWZpY2F0aW9ucyIsImt5Yzp2ZXJpZmljYXRpb25zOmNyZWF0ZSIsInByb2ZpbGUiXSwiYW1sX2RvbWFpbiI6IioiLCJleHAiOjE2NDAyMTc2NjUsIm1vYmlsZU5vVmVyaWZpZWQiOnRydWUsImNsaWVudF9uYW1lIjoiSVNXIEJ1c2luZXNzIFBvcnRhbCIsImNsaWVudF9sb2dvIjpudWxsLCJqdGkiOiI1ZGNiYWE1NC04ZTBhLTRhYTktYWIzNC1mMjYxZGZhODcyYWMiLCJlbWFpbCI6ImJsZXNzaW5nLmthbHVAaW50ZXJzd2l0Y2hncm91cC5jb20iLCJwYXNzcG9ydElkIjoiRUQ2RjI2M0YtMkFERS0zMkE0LTlGRjItMzFBQjI4MkFFOUFGIn0.OUpJGBDsHNoqEmKMiDY8kURWIms03a9Ub2xeg3nBjRANNAY2uyai-fZpk5r9NcijcVl5RXzaPTvOWOvijBfCakWkcJTS8RAL6-Po3CRlQ-zPUHAPQqPnryN5tzik-czZOjcSbnQDJtcbq2WzwzxNTjQbbenQapCdcOw1ZM7oZRSBtRx25zmsM730--AwBUylKCAtn3MUGWqIPER68goOMRj5qk9lK7loZMLtsTcGygQqjtCzcdOZIqq7rPXwNY8vtqBuySYi22KYapPHIodIGwlBU4T5ekfwxaCvOBRsauOcrzLvUhe08jURAOw0ibryyr0AaS4vYlI9qQ2Hl7ENdw";
  instanceCTS.defaults.headers.common.Authorization =
    "Bearer eyJhbGciOiJSUzI1NiJ9.eyJsYXN0TmFtZSI6IkthbHUiLCJmaXJzdExvZ2luIjpmYWxzZSwidXNlcl9uYW1lIjoiQmxlc3NpbmcuS2FsdSIsIm1vYmlsZU5vIjpudWxsLCJjbGllbnRfZGVzY3JpcHRpb24iOm51bGwsImNsaWVudF9pZCI6Imlzdy1wb3J0YWwiLCJmaXJzdE5hbWUiOiJCbGVzc2luZyIsImVtYWlsVmVyaWZpZWQiOnRydWUsImF1ZCI6WyJhbWwtc2VydmljZSIsImFwaS1nYXRld2F5IiwiYXJiaXRlciIsImNhYy12ZXJpZmljYXRpb24tc2VydmljZSIsImNhZXNhciIsImVzY3Jvdy1zZXJ2aWNlIiwiaGltcy1wb3J0bGV0IiwiaXBnLXNldHRsZW1lbnQiLCJpc3ctY29sbGVjdGlvbnMiLCJpc3ctY29yZSIsImlzdy1pbnN0aXR1dGlvbiIsImlzdy1wYXltZW50Z2F0ZXdheSIsImt5Yy1zZXJ2aWNlIiwicGFzc3BvcnQiLCJwcm9qZWN0LXgtY29uc3VtZXIiLCJwcm9qZWN0LXgtbWVyY2hhbnQiLCJyZWZlcnJhbC1zZXJ2aWNlLWFwaSIsInRyYW5zZmVyLXNlcnZpY2UtY29yZSIsInRyYW5zZmVyLXNlcnZpY2UtY29yZS1hZG1pbiIsInRyYW5zZmVyLXNlcnZpY2UtcG9ydGxldCIsInZvdWNoZXItYXBpIiwid2FsbGV0Iiwid2VicGF5LXBvcnRsZXQiXSwiY2xpZW50X2F1dGhvcml6YXRpb25fZG9tYWluIjoiSVNXIiwic2NvcGUiOlsiY2xpZW50cyIsImt5YzphdWRpdHMiLCJreWM6Y2FsbGJhY2tzIiwia3ljOmVudGl0aWVzIiwia3ljOnJlcG9ydHMiLCJreWM6c2VydmljZXMiLCJreWM6dmVyaWZpY2F0aW9ucyIsImt5Yzp2ZXJpZmljYXRpb25zOmNyZWF0ZSIsInByb2ZpbGUiXSwiYW1sX2RvbWFpbiI6IioiLCJleHAiOjE2NDAyMTc2NjUsIm1vYmlsZU5vVmVyaWZpZWQiOnRydWUsImNsaWVudF9uYW1lIjoiSVNXIEJ1c2luZXNzIFBvcnRhbCIsImNsaWVudF9sb2dvIjpudWxsLCJqdGkiOiI1ZGNiYWE1NC04ZTBhLTRhYTktYWIzNC1mMjYxZGZhODcyYWMiLCJlbWFpbCI6ImJsZXNzaW5nLmthbHVAaW50ZXJzd2l0Y2hncm91cC5jb20iLCJwYXNzcG9ydElkIjoiRUQ2RjI2M0YtMkFERS0zMkE0LTlGRjItMzFBQjI4MkFFOUFGIn0.OUpJGBDsHNoqEmKMiDY8kURWIms03a9Ub2xeg3nBjRANNAY2uyai-fZpk5r9NcijcVl5RXzaPTvOWOvijBfCakWkcJTS8RAL6-Po3CRlQ-zPUHAPQqPnryN5tzik-czZOjcSbnQDJtcbq2WzwzxNTjQbbenQapCdcOw1ZM7oZRSBtRx25zmsM730--AwBUylKCAtn3MUGWqIPER68goOMRj5qk9lK7loZMLtsTcGygQqjtCzcdOZIqq7rPXwNY8vtqBuySYi22KYapPHIodIGwlBU4T5ekfwxaCvOBRsauOcrzLvUhe08jURAOw0ibryyr0AaS4vYlI9qQ2Hl7ENdw";
  instanceCert.defaults.headers.common.Authorization =
    "Bearer eyJhbGciOiJSUzI1NiJ9.eyJsYXN0TmFtZSI6IkthbHUiLCJmaXJzdExvZ2luIjpmYWxzZSwidXNlcl9uYW1lIjoiQmxlc3NpbmcuS2FsdSIsIm1vYmlsZU5vIjpudWxsLCJjbGllbnRfZGVzY3JpcHRpb24iOm51bGwsImNsaWVudF9pZCI6Imlzdy1wb3J0YWwiLCJmaXJzdE5hbWUiOiJCbGVzc2luZyIsImVtYWlsVmVyaWZpZWQiOnRydWUsImF1ZCI6WyJhbWwtc2VydmljZSIsImFwaS1nYXRld2F5IiwiYXJiaXRlciIsImNhYy12ZXJpZmljYXRpb24tc2VydmljZSIsImNhZXNhciIsImVzY3Jvdy1zZXJ2aWNlIiwiaGltcy1wb3J0bGV0IiwiaXBnLXNldHRsZW1lbnQiLCJpc3ctY29sbGVjdGlvbnMiLCJpc3ctY29yZSIsImlzdy1pbnN0aXR1dGlvbiIsImlzdy1wYXltZW50Z2F0ZXdheSIsImt5Yy1zZXJ2aWNlIiwicGFzc3BvcnQiLCJwcm9qZWN0LXgtY29uc3VtZXIiLCJwcm9qZWN0LXgtbWVyY2hhbnQiLCJyZWZlcnJhbC1zZXJ2aWNlLWFwaSIsInRyYW5zZmVyLXNlcnZpY2UtY29yZSIsInRyYW5zZmVyLXNlcnZpY2UtY29yZS1hZG1pbiIsInRyYW5zZmVyLXNlcnZpY2UtcG9ydGxldCIsInZvdWNoZXItYXBpIiwid2FsbGV0Iiwid2VicGF5LXBvcnRsZXQiXSwiY2xpZW50X2F1dGhvcml6YXRpb25fZG9tYWluIjoiSVNXIiwic2NvcGUiOlsiY2xpZW50cyIsImt5YzphdWRpdHMiLCJreWM6Y2FsbGJhY2tzIiwia3ljOmVudGl0aWVzIiwia3ljOnJlcG9ydHMiLCJreWM6c2VydmljZXMiLCJreWM6dmVyaWZpY2F0aW9ucyIsImt5Yzp2ZXJpZmljYXRpb25zOmNyZWF0ZSIsInByb2ZpbGUiXSwiYW1sX2RvbWFpbiI6IioiLCJleHAiOjE2NDAyMTc2NjUsIm1vYmlsZU5vVmVyaWZpZWQiOnRydWUsImNsaWVudF9uYW1lIjoiSVNXIEJ1c2luZXNzIFBvcnRhbCIsImNsaWVudF9sb2dvIjpudWxsLCJqdGkiOiI1ZGNiYWE1NC04ZTBhLTRhYTktYWIzNC1mMjYxZGZhODcyYWMiLCJlbWFpbCI6ImJsZXNzaW5nLmthbHVAaW50ZXJzd2l0Y2hncm91cC5jb20iLCJwYXNzcG9ydElkIjoiRUQ2RjI2M0YtMkFERS0zMkE0LTlGRjItMzFBQjI4MkFFOUFGIn0.OUpJGBDsHNoqEmKMiDY8kURWIms03a9Ub2xeg3nBjRANNAY2uyai-fZpk5r9NcijcVl5RXzaPTvOWOvijBfCakWkcJTS8RAL6-Po3CRlQ-zPUHAPQqPnryN5tzik-czZOjcSbnQDJtcbq2WzwzxNTjQbbenQapCdcOw1ZM7oZRSBtRx25zmsM730--AwBUylKCAtn3MUGWqIPER68goOMRj5qk9lK7loZMLtsTcGygQqjtCzcdOZIqq7rPXwNY8vtqBuySYi22KYapPHIodIGwlBU4T5ekfwxaCvOBRsauOcrzLvUhe08jURAOw0ibryyr0AaS4vYlI9qQ2Hl7ENdw";
}
// process.env.NODE_ENV !== "production"
//   ? "Bearer eyJhbGciOiJSUzI1NiJ9.eyJsYXN0TmFtZSI6IkthbHUiLCJmaXJzdExvZ2luIjpmYWxzZSwidXNlcl9uYW1lIjoiQmxlc3NpbmcuS2FsdSIsIm1vYmlsZU5vIjpudWxsLCJjbGllbnRfZGVzY3JpcHRpb24iOm51bGwsImNsaWVudF9pZCI6Imlzdy1wb3J0YWwiLCJmaXJzdE5hbWUiOiJCbGVzc2luZyIsImVtYWlsVmVyaWZpZWQiOnRydWUsImF1ZCI6WyJhbWwtc2VydmljZSIsImFwaS1nYXRld2F5IiwiYXJiaXRlciIsImNhYy12ZXJpZmljYXRpb24tc2VydmljZSIsImNhZXNhciIsImVzY3Jvdy1zZXJ2aWNlIiwiaGltcy1wb3J0bGV0IiwiaXBnLXNldHRsZW1lbnQiLCJpc3ctY29sbGVjdGlvbnMiLCJpc3ctY29yZSIsImlzdy1pbnN0aXR1dGlvbiIsImlzdy1wYXltZW50Z2F0ZXdheSIsImt5Yy1zZXJ2aWNlIiwicGFzc3BvcnQiLCJwcm9qZWN0LXgtY29uc3VtZXIiLCJwcm9qZWN0LXgtbWVyY2hhbnQiLCJyZWZlcnJhbC1zZXJ2aWNlLWFwaSIsInRyYW5zZmVyLXNlcnZpY2UtY29yZSIsInRyYW5zZmVyLXNlcnZpY2UtY29yZS1hZG1pbiIsInRyYW5zZmVyLXNlcnZpY2UtcG9ydGxldCIsInZvdWNoZXItYXBpIiwid2FsbGV0Iiwid2VicGF5LXBvcnRsZXQiXSwiY2xpZW50X2F1dGhvcml6YXRpb25fZG9tYWluIjoiSVNXIiwic2NvcGUiOlsiY2xpZW50cyIsImt5YzphdWRpdHMiLCJreWM6Y2FsbGJhY2tzIiwia3ljOmVudGl0aWVzIiwia3ljOnJlcG9ydHMiLCJreWM6c2VydmljZXMiLCJreWM6dmVyaWZpY2F0aW9ucyIsImt5Yzp2ZXJpZmljYXRpb25zOmNyZWF0ZSIsInByb2ZpbGUiXSwiYW1sX2RvbWFpbiI6IioiLCJleHAiOjE2NDAyMTc2NjUsIm1vYmlsZU5vVmVyaWZpZWQiOnRydWUsImNsaWVudF9uYW1lIjoiSVNXIEJ1c2luZXNzIFBvcnRhbCIsImNsaWVudF9sb2dvIjpudWxsLCJqdGkiOiI1ZGNiYWE1NC04ZTBhLTRhYTktYWIzNC1mMjYxZGZhODcyYWMiLCJlbWFpbCI6ImJsZXNzaW5nLmthbHVAaW50ZXJzd2l0Y2hncm91cC5jb20iLCJwYXNzcG9ydElkIjoiRUQ2RjI2M0YtMkFERS0zMkE0LTlGRjItMzFBQjI4MkFFOUFGIn0.OUpJGBDsHNoqEmKMiDY8kURWIms03a9Ub2xeg3nBjRANNAY2uyai-fZpk5r9NcijcVl5RXzaPTvOWOvijBfCakWkcJTS8RAL6-Po3CRlQ-zPUHAPQqPnryN5tzik-czZOjcSbnQDJtcbq2WzwzxNTjQbbenQapCdcOw1ZM7oZRSBtRx25zmsM730--AwBUylKCAtn3MUGWqIPER68goOMRj5qk9lK7loZMLtsTcGygQqjtCzcdOZIqq7rPXwNY8vtqBuySYi22KYapPHIodIGwlBU4T5ekfwxaCvOBRsauOcrzLvUhe08jURAOw0ibryyr0AaS4vYlI9qQ2Hl7ENdw"
//   : "";
// if (process.env.NODE_ENV !== "production") {
//   instance.defaults.headers.common["X-Interswitch-Authorization-Domain"] =
//     "ISW";
// }

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
