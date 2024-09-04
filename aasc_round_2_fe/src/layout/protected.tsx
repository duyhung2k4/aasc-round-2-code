import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import ModalError from "./components/modal_error";

import { ROUTER_APP } from "@/constants/router";
import { TOKEN_TYPE } from "@/models/variable";
import { useNavigate, useOutlet } from "react-router-dom";



const ProtectedLayout: React.FC = () => {
    const [modalError, setModalError] = useState<{ show: boolean, mess: string }>({ show: false, mess: "" });
    const outlet = useOutlet();

    const navigation = useNavigate();

    useEffect(() => {  
        handleReload();
    }, []);
    
    const handleReload = async () => {
        const app_id = Cookies.get(TOKEN_TYPE.APP_ID);
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
    
        if(!app_id || !token) {
            navigation(ROUTER_APP.LOGIN.href);
            return;
        }
    }

    return (
        <ProtectedContext.Provider
            value={{
                modalError,
                setModalError,
            }}
        >
            {outlet}
            <ModalError/>
        </ProtectedContext.Provider>
    )
}

export type TypeProtectedContext = {
    modalError: { show: boolean, mess: string }
    setModalError: (agrs: { show: boolean, mess: string }) => void
}

export const ProtectedContext = createContext<TypeProtectedContext>({
    modalError: { show: false, mess: "" },
    setModalError: (_) => {}
})

export default ProtectedLayout;