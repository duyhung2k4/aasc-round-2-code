import React, { useContext, useState } from "react";
import Cookies from "js-cookie";

import { Button, Form, Spinner } from "react-bootstrap";
import { useAcceptCodeMutation } from "@/redux/api/auth";
import { useNavigate } from "react-router-dom";
import { ROUTER_APP } from "@/constants/router";
import { TOKEN_TYPE } from "@/models/variable";
import { ProtectedContext, TypeProtectedContext } from "@/layout/protected";

import classes from "./styles.module.css";



const Login: React.FC = () => {
    const [acceptCode, setAcceptCode] = useState<string>("");
    const { setModalError } = useContext<TypeProtectedContext>(ProtectedContext);

    const navigation = useNavigate();

    const [post, { isLoading }] = useAcceptCodeMutation();

    const handle = async () => {
        const id_accept_code = Cookies.get(TOKEN_TYPE.ID_ACCEPT_CODE);
        if (acceptCode.length !== 6 || !id_accept_code) return;
        const result = await post({
            accept_code_id: Number(id_accept_code),
            code: acceptCode,
        });

        if ("error" in result) {
            setModalError({
                show: true,
                mess: "Xác nhận thất bại"
            })
            return;
        }

        navigation(ROUTER_APP.LOGIN.href);
    }

    return (
        <>
            <div className={classes.root}>
                <div className={classes.box}>
                    <p className={classes.title__login}>Xác nhận</p>
                    <p className={classes.title__welcome}>Mã xác nhận đã được gửi đến Email của bạn.</p>

                    <Form.Label htmlFor="form_accept_code">Mã xác nhận</Form.Label>
                    <Form.Control
                        type="text"
                        id="form_accept_code"
                        value={acceptCode}
                        onChange={e => setAcceptCode(e.target.value)}
                    />

                    <Button
                        className={classes.btn__login}
                        style={{
                            cursor: isLoading ? "not-allowed" : "pointer"
                        }}
                        onClick={handle}
                    >
                        {isLoading ? <Spinner size="sm" style={{ fontSize: 12 }} animation="border" /> : "Xác nhận"}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Login;