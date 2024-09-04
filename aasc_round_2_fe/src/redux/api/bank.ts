import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, QueryReturnType } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { AddBankRequest, DeleteBankRequest, UpdateBankRequest } from "@/dto/request/bank";
import { BankModel } from "@/models/bank";
import { AddBankResult, DeleteBankResult, UpdateBankResult } from "@/dto/response/bank";



export const bankApi = createApi({
    reducerPath: "bankApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        listBank: builder.query<QueryReturnType<BankModel[]>, string>({
            query: (payload) => ({
                ...endPoint.bank.getAll(),
                params: {
                    auth: payload
                }
            })
        }),
        addBank: builder.mutation<QueryReturnType<AddBankResult>, { bank: AddBankRequest, token: string }>({
            query: (payload) => ({
                ...endPoint.bank.add(),
                params: { auth: payload.token },
                data: payload.bank,
            })
        }),
        updateBank: builder.mutation<QueryReturnType<UpdateBankResult>, { bank: UpdateBankRequest, token: string }>({
            query: (payload) => ({
                ...endPoint.bank.update(),
                params: { auth: payload.token },
                data: payload.bank,
            })
        }),
        deleteBank: builder.mutation<QueryReturnType<DeleteBankResult>, { bank: DeleteBankRequest, token: string }>({
            query: (payload) => ({
                ...endPoint.bank.delete(),
                params: { auth: payload.token },
                data: payload.bank,
            })
        }),
    })
})

export const {
    useListBankQuery,
    useAddBankMutation,
    useUpdateBankMutation,
    useDeleteBankMutation,
} = bankApi;