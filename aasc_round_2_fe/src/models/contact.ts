import { CRM_Multifield } from "./crm_multifield"

export type ContactModel = {
    ID: string
    NAME: string
    LAST_NAME: string
    ADDRESS_REGION: string
    ADDRESS_PROVINCE: string
    ADDRESS_CITY: string
    PHONE: CRM_Multifield[]
    EMAIL: CRM_Multifield[]
    WEB: CRM_Multifield[]
}