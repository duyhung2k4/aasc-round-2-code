import React, { useEffect } from "react";
import Cookies from "js-cookie";

import { useUpdateTokenMutation } from "@/redux/api/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { TOKEN_TYPE } from "@/models/variable";
import { Spinner } from "react-bootstrap";
import { ROUTER_APP } from "@/constants/router";



const TokenCode: React.FC = () => {

    const navigation = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const params = {
        code: queryParams.get('code'),
        domain: queryParams.get('domain'),
        memberId: queryParams.get('member_id'),
        scope: queryParams.get('scope'),
        serverDomain: queryParams.get('server_domain'),
    };

    const [post] = useUpdateTokenMutation();

    const handleUpdateToken = async () => {
        const oldToken = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
        if (!params.code || !oldToken) {
            console.log("not code or old token");
            return;
        }
        const result = await post({
            code: params.code,
            oldToken,
        });

        if ("error" in result) {
            console.log("error: ", result);
            navigation(ROUTER_APP.LOGIN.href);
            return;
        }

        const newToken = result.data.data?.access_token;
        if (!newToken) {
            Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
            Cookies.remove(TOKEN_TYPE.APP_ID);
            navigation(ROUTER_APP.LOGIN.href);
            return;
        }

        Cookies.set(TOKEN_TYPE.ACCESS_TOKEN, newToken);
        navigation(Cookies.get(TOKEN_TYPE.CURRENT_URL) || ROUTER_APP.CONTACT.href);

        Cookies.remove(TOKEN_TYPE.RETURN_CODE_URL);
        Cookies.remove(TOKEN_TYPE.CURRENT_URL);
    }

    useEffect(() => {
        handleUpdateToken();
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

export default TokenCode;