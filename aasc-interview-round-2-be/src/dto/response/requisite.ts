import { BankModel } from "../../models/bank"
import { RequisiteModel } from "../../models/requisite"
import { TimeModel } from "../../models/time"

export type  AddRequisiteResult = {
    result: number
    time: TimeModel
}

export type  UpdateRequisiteResult = {
    result: boolean
    time: TimeModel
}

export type  DeleteRequisiteResult = {
    result: boolean
    time: TimeModel
}

export type ListRequisiteResult = {
    result: RequisiteModel[]
    time: TimeModel
    total: number
}