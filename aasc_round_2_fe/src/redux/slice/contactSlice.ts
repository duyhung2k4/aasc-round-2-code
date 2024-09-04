import { contactApi } from "../api/contact";
import { createSlice } from "@reduxjs/toolkit";
import { ContactModel } from "@/models/contact";
import { RequisiteModel } from "@/models/requisite";
import { requisitetApi } from "../api/requisite";



interface ContactState {
    contacts: ContactModel[]
    requisites: RequisiteModel[]
    requisiteMap: Record<string, RequisiteModel>
    contactMap: Record<string, ContactModel>
    requisiteContactMap: Record<string, RequisiteModel>
}

const initialState: ContactState = {
    contacts: [],
    requisites: [],
    contactMap: {},
    requisiteMap: {},
    requisiteContactMap: {},
}

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(contactApi.endpoints.listContact.matchFulfilled, (state, { payload }) => {
            const data = payload.data;
            if(!data) return;
            state.contacts = payload.data || [];
            data.forEach(c => {
                state.contactMap[c.ID] = c;
            })
        })
        builder.addMatcher(contactApi.endpoints.listContact.matchRejected, (state, _) => {
            state.contacts = [];
        })

        builder.addMatcher(requisitetApi.endpoints.listRequisite.matchFulfilled, (state, { payload }) => {
            if(!payload.data) {
                state.requisiteMap = {};
                return;
            }
            state.requisites = payload.data;
            payload.data.forEach(r => {
                state.requisiteMap[r.ID] = r;
                state.requisiteContactMap[r.ENTITY_ID] = r;
            });
        })
        builder.addMatcher(requisitetApi.endpoints.listRequisite.matchRejected, (state, _) => {
            state.requisiteMap = {};
        })
    }
})

export default contactSlice;