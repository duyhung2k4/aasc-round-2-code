import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, QueryReturnType } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { RequisiteModel } from "@/models/requisite";
import { AddRequisiteRequest, DeleteRequisiteRequest, UpdateRequisiteRequest } from "@/dto/request/requisite";



export const requisitetApi = createApi({
    reducerPath: "requisitetApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        listRequisite: builder.query<QueryReturnType<RequisiteModel[]>, string>({
            query: (payload) => ({
                ...endPoint.requisite.getAll(),
                params: {
                    auth: payload
                }
            })
        }),
        addRequisite: builder.mutation<QueryReturnType<RequisiteModel[]>, { requisite: AddRequisiteRequest, token: string }>({
            query: (payload) => ({
                ...endPoint.requisite.add(),
                params: { auth: payload.token },
                data: payload.requisite,
            })
        }),
        updateRequisite: builder.mutation<QueryReturnType<RequisiteModel[]>, { requisite: UpdateRequisiteRequest, token: string }>({
            query: (payload) => ({
                ...endPoint.requisite.update(),
                params: { auth: payload.token },
                data: payload.requisite,
            })
        }),
        deleteRequisite: builder.mutation<QueryReturnType<RequisiteModel[]>, { requisite: DeleteRequisiteRequest, token: string }>({
            query: (payload) => ({
                ...endPoint.requisite.delete(),
                params: { auth: payload.token },
                data: payload.requisite,
            })
        }),
    })
})

export const {
    useListRequisiteQuery,
    useAddRequisiteMutation,
    useUpdateRequisiteMutation,
    useDeleteRequisiteMutation,
} = requisitetApi;