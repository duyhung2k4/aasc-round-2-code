export type LoginRequest = {
    client_id: string
    password: string
}

export type RegisterRequest = {
    email: string
    client_id: string
    client_secret: string
    password: string
}

export type AcceptCodeRequest = {
    accept_code_id: number
    code: string
}
