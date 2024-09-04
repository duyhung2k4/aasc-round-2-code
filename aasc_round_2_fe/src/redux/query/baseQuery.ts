import axios from "axios"
import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import type { AxiosRequestConfig, AxiosError } from "axios"
import Cookies from "js-cookie"
import { TOKEN_TYPE } from "@/models/variable"
import { ROUTER_APP } from "@/constants/router"


export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: import.meta.env.VITE_SERVER_URL }
    ): BaseQueryFn<
        {
            url: string
            method?: AxiosRequestConfig["method"]
            data?: AxiosRequestConfig["data"]
            params?: AxiosRequestConfig["params"]
            headers?: AxiosRequestConfig["headers"]
        },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, headers }) => {
            try {
                const result = await axios({
                    url: `${baseUrl}/${url}`,
                    method,
                    data,
                    params,
                    headers,
                });

                if(result.data.newToken) {
                    Cookies.set(TOKEN_TYPE.ACCESS_TOKEN, result.data.newToken);
                }
                if(result.data.urlGetToken) {
                    Cookies.set(TOKEN_TYPE.CURRENT_URL, window.location.pathname);
                    Cookies.set(TOKEN_TYPE.RETURN_CODE_URL, `https://${result.data.urlGetToken}`);
                    window.location.href = ROUTER_APP.TOKEN_CODE_PENDING.href;
                }

                return { data: result.data }
            } catch (axiosError) {
                const err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }

export type MetaData = {
    page: number
    pageSize: number
    total: number
}

export type QueryReturnType<T = unknown, E = unknown> = {
    data?: undefined;
    error: E;
    success: boolean
    metaData: MetaData;
    newToken: string;
} | {
    data: T;
    error?: undefined;
    success: boolean
    metaData: MetaData;
    newToken: string;
};