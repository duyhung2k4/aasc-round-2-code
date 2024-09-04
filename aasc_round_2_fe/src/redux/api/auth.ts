import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, QueryReturnType } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { LoginResponse, RegisterRepsone, UpdateTokenResponse } from "@/dto/response/auth";
import { AcceptCodeRequest, LoginRequest, RegisterRequest } from "@/dto/request/auth";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation<QueryReturnType<LoginResponse>, LoginRequest>({
            query: (payload) => ({
                ...endPoint.auth.login(),
                data: payload
            })
        }),
        register: builder.mutation<QueryReturnType<RegisterRepsone>, RegisterRequest>({
            query: (payload) => ({
                ...endPoint.auth.register(),
                data: payload
            })
        }),
        acceptCode: builder.mutation<QueryReturnType<boolean>, AcceptCodeRequest>({
            query: (payload) => ({
                ...endPoint.auth.acceptCode(),
                data: payload
            })
        }),
        updateToken: builder.mutation<QueryReturnType<UpdateTokenResponse>, { code: string, oldToken: string }>({
            query: (payload) => ({
                ...endPoint.auth.updateToken(),
                params: {
                    auth: payload.oldToken,
                },
                data: {
                    code: payload.code,
                }
            })
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useAcceptCodeMutation,
    useUpdateTokenMutation,
} = authApi;