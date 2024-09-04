export const ROUTER_APP = {
    LOGIN: {
        href: "/login",
        type: "public",
        name: "Đăng nhập",
    },
    REGISTER: {
        href: "/register",
        type: "public",
        name: "Đăng nhập",
    },
    ACCEPT_CODE: {
        href: "/accept-code",
        type: "public",
        name: "Đăng nhập",
    },
    HOME: {
        href: "/",
        type: "protected",
        name: "Trang chủ",
    },
    CONTACT: {
        href: "/contact",
        type: "protected",
        name: "Liên hệ",
    },
    BANK: {
        href: "/bank",
        type: "protected",
        name: "Tài khoản ngân hàng",
    },
    TOKEN_CODE: {
        href: "/token-code",
        type: "protected",
        name: "",
    },
    TOKEN_CODE_PENDING: {
        href: "/token-code-pending",
        type: "protected",
        name: "",
    }
}