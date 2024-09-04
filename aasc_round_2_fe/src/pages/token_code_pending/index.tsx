import Cookies from "js-cookie";
import React, { useEffect } from "react";

import { ROUTER_APP } from "@/constants/router";
import { TOKEN_TYPE } from "@/models/variable";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const TokenCodePending: React.FC = () => {

    const navigation = useNavigate();

    useEffect(() => {
        const urlToken = Cookies.get(TOKEN_TYPE.RETURN_CODE_URL);
        
        if(!urlToken) {
            navigation(ROUTER_APP.LOGIN.href);
            return;
        }
        window.location.href = urlToken;
    }, []);

    return (
        <div
            style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 16
            }}>
                <Spinner/> Đang lấy lại token
            </div>
        </div>
    )
}

export default TokenCodePending;