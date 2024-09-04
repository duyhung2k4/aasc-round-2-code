export type AddRequisiteRequest = {
    "RQ_NAME": string
    "RQ_BANK_NAME": string
    "RQ_ACC_NUM": string
}

export type UpdateRequisiteRequest = {
    id: string
    fields: {
        "RQ_NAME"?: string
        "RQ_BANK_NAME"?: string
        "RQ_ACC_NUM"?: string
    }
}

export type DeleteRequisiteRequest = {
    id: string
}