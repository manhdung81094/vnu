import jwt_decode from "jwt-decode";
import { axiosClient } from "./axiosClient";
import { IBaseRespone } from "../model/respone/IBaseRespone";
import { appConst } from "../AppConst";
export const objectToQueryString = (obj: any, parentKey: any): string => {
  return Object.keys(obj)
    .map((key) => {
      const value = obj[key];
      const encodedKey = parentKey
        ? `${parentKey}.${encodeURIComponent(key)}`
        : encodeURIComponent(key);

      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        value !== null
      ) {
        return objectToQueryString(value, encodedKey);
      }

      return `${encodedKey}=${encodeURIComponent(value)}`;
    })
    .join("&");
};
export const formatQueryString = (obj: any): string => {
  if (obj) {
    return objectToQueryString(obj, null);
  }
  return "";
};
type jwt_decodeResult = {
  exp: any;
};

export const clearAccessToken = () => {
  localStorage.removeItem("access_token");
};

export const clearRefreshToken = () => {
  localStorage.removeItem("refresh_token");
};
export const saveAccessToken = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};

export const saveRefreshToken = (refresh_token: string) => {
  localStorage.setItem("refresh_token", refresh_token);
};

let refreshTokenRequest: Promise<any> | null;
const checkIsTokenExpired = (): boolean => {
  // return true;
  try {
    const data: jwt_decodeResult = jwt_decode(localStorage.access_token);
    if (localStorage.access_token && data) {
      const exp = data.exp;
      if (parseInt(exp) > Math.floor(Date.now() / 1000)) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

const refreshToken = () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        // debugger
        const res: IBaseRespone = await axiosClient.post(
          `${appConst.baseApiURL}/account/token/refresh`,
          {
            access_token: localStorage.access_token,
            refresh_token: localStorage.refresh_token,
          }
        );

        if (res.is_success) {
          resolve(res.data);
        } else {
          resolve(undefined);
        }
      } catch (error) {
        localStorage.removeItem("access_token");
        window.location.reload();
      }
    }, 1000);
  });
};

const configIfTokenExpired = async () => {
  const isTokenExpired = checkIsTokenExpired();
  if (isTokenExpired) {
    refreshTokenRequest = refreshTokenRequest
      ? refreshTokenRequest
      : refreshToken();

    const newTokens = await refreshTokenRequest;
    refreshTokenRequest = null;
    if (!newTokens) {
      return {
        is_success: false,
        message: "Token expired.",
      };
    }
    //debugger
    const new_access_token = newTokens.access_token;
    const new_refresh_token = newTokens.refresh_token;
    saveAccessToken(new_access_token);
    saveRefreshToken(new_refresh_token);
  }
};
const apiClient = {
  get: async (path: string): Promise<IBaseRespone> => {
    const url = `${appConst.baseApiURL}/${path}`;
    try {
      await configIfTokenExpired();
      const config = {
        headers: {
          language: localStorage.getItem("language"),
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      };
      const res = await axiosClient.get<any, IBaseRespone>(url, config);
      return res;
    } catch (error: any) {
      if (error.response.status === 401) {
        return {
          status_code: parseInt(error.response.status),
          is_success: false,
          message:
            "Bạn không được phân quyền để thực hiện thao tác này. Vui lòng liên hệ Quản trị viên để được hỗ trợ.",
        };
      } else {
        return {
          status_code: error.response.data.status_code,
          is_success: false,
          message: error.response.data.message || "Có lỗi",
        };
      }
    }
  },
  post: async (
    path: string,
    data?: any,
    domain?: string
  ): Promise<IBaseRespone> => {
    const url = `${domain ? domain : appConst.baseApiURL}/${path}`;

    try {
      await configIfTokenExpired();
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          language: localStorage.getItem("language"),
        },
      };
      const res = await axiosClient.post<any, IBaseRespone>(url, data, config);
      return res;
    } catch (error: any) {
      //console.log('object', error);
      if (error.response.status === 401) {
        return {
          status_code: parseInt(error.response.status),
          is_success: false,
          message:
            "Bạn không được phân quyền để thực hiện thao tác này. Vui lòng liên hệ Quản trị viên để được hỗ trợ.",
        };
      } else {
        return {
          status_code: error.response.data.status_code,
          is_success: false,
          message: error.response.data.message || "Có lỗi",
        };
      }
    }
  },
  put: async (path: string, data?: any): Promise<IBaseRespone> => {
    const url = `${appConst.baseApiURL}/${path}`;
    try {
      await configIfTokenExpired();
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          language: localStorage.getItem("language"),
        },
      };
      const res = await axiosClient.put<any, IBaseRespone>(url, data, config);
      return res;
    } catch (error: any) {
      if (error.response.status === 401) {
        return {
          status_code: parseInt(error.response.status),
          is_success: false,
          message:
            "Bạn không được phân quyền để thực hiện thao tác này. Vui lòng liên hệ Quản trị viên để được hỗ trợ.",
        };
      } else {
        return {
          status_code: error.response.data.status_code,
          is_success: false,
          message: error.response.data.message || "Có lỗi",
        };
      }
    }
  },
  delete: async (path: string): Promise<IBaseRespone> => {
    const url = `${appConst.baseApiURL}/${path}`;
    try {
      await configIfTokenExpired();
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          language: localStorage.getItem("language"),
        },
      };
      const res = await axiosClient.delete<any, IBaseRespone>(url, config);
      return res;
    } catch (error: any) {
      if (error.response.status === 401) {
        return {
          status_code: parseInt(error.response.status),
          is_success: false,
          message:
            "Bạn không được phân quyền để thực hiện thao tác này. Vui lòng liên hệ Quản trị viên để được hỗ trợ.",
        };
      } else {
        return {
          status_code: error.response.data.status_code,
          is_success: false,
          message: error.response.data.message || "Có lỗi",
        };
      }
    }
  },
  upload: async (path: string, data?: any): Promise<IBaseRespone> => {
    const url = `${appConst.baseApiURL}/${path}`;
    try {
      await configIfTokenExpired();
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "multipart/form-data",
          language: localStorage.getItem("language"),
        },
      };
      const res = await axiosClient.post<any, IBaseRespone>(url, data, config);
      return res;
    } catch (error: any) {
      if (error.response.status === 401) {
        return {
          status_code: parseInt(error.response.status),
          is_success: false,
          message:
            "Bạn không được phân quyền để thực hiện thao tác này. Vui lòng liên hệ Quản trị viên để được hỗ trợ.",
        };
      } else {
        return {
          status_code: error.response.data.status_code,
          is_success: false,
          message: error.response.data.message || "Có lỗi",
        };
      }
    }
  },
};
export { apiClient };
