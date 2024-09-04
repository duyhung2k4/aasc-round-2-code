export const HEADER = {
    defaultHeader: () => ({
        "Content-Type": "application/json",
    }),
}

export const endPoint = {
    auth: {
        login: () => ({
            url: "api/auth/login",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        register: () => ({
            url: "api/auth/register",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        acceptCode: () => ({
            url: "api/auth/accept-code",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        updateToken: () => ({
            url: "api/auth/update-token",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
    },

    users: {
        getAll: () => ({
            url: "api/user/all-employee",
            method: "GET",
            headers: HEADER.defaultHeader(),
        }),
    },

    contact: {
        getAll: () => ({
            url: "api/contact/list",
            method: "GET",
            headers: HEADER.defaultHeader(),
        }),
        add: () => ({
            url: "api/contact/add",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        update: () => ({
            url: "api/contact/update",
            method: "PUT",
            headers: HEADER.defaultHeader(),
        }),
        delete: () => ({
            url: "api/contact/delete",
            method: "DELETE",
            headers: HEADER.defaultHeader(),
        })
    },

    requisite: {
        getAll: () => ({
            url: "api/requisite/list",
            method: "GET",
            headers: HEADER.defaultHeader(),
        }),
        add: () => ({
            url: "api/requisite/add",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        update: () => ({
            url: "api/requisite/update",
            method: "PUT",
            headers: HEADER.defaultHeader(),
        }),
        delete: () => ({
            url: "api/requisite/delete",
            method: "DELETE",
            headers: HEADER.defaultHeader(),
        })
    },

    bank: {
        getAll: () => ({
            url: "api/bank/list",
            method: "GET",
            headers: HEADER.defaultHeader(),
        }),
        add: () => ({
            url: "api/bank/add",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        update: () => ({
            url: "api/bank/update",
            method: "PUT",
            headers: HEADER.defaultHeader(),
        }),
        delete: () => ({
            url: "api/bank/delete",
            method: "DELETE",
            headers: HEADER.defaultHeader(),
        })
    }
}