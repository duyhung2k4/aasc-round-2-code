export enum TOKEN_TYPE {
  ACCESS_TOKEN = "access_token",
  APP_ID = "app_id",
  ID_ACCEPT_CODE = "id_accept_code",
  RETURN_CODE_URL = "pending_token",
  CURRENT_URL = "current_url",
}

export const DEPARTMENT: Record<number, string> = {
    1: "Chủ tịch",
    3: "Phòng bán hàng",
    5: "Phòng kế toán",
    7: "Phòng tiếp thị",
}