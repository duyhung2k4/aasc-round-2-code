export type LoginResponse = {
    access_token: string
}

export type RegisterRepsone = {
    id_accept_code: number
    expires: Date
    expires_repeat_code: Date
}

export type UpdateTokenResponse = {
    access_token: string;
}