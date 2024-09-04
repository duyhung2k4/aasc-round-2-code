import React, { useContext, useState } from "react";
import Cookies from "js-cookie";

import { Button, Form, Spinner } from "react-bootstrap";
import { useLoginMutation } from "@/redux/api/auth";
import { useNavigate } from "react-router-dom";
import { ROUTER_APP } from "@/constants/router";
import { TOKEN_TYPE } from "@/models/variable";

import classes from "./styles.module.css";
import { ProtectedContext, TypeProtectedContext } from "@/layout/protected";



const Login: React.FC = () => {
    const [clientId, setClientId] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { setModalError } = useContext<TypeProtectedContext>(ProtectedContext);

    const navigation = useNavigate();

    const [post, { isLoading }] = useLoginMutation();

    const handleLogin = async () => {
        if (clientId.length === 0) return;
        const result = await post({
            client_id: clientId,
            password: password,
        });

        if ("error" in result) {
            setModalError({
                show: true,
                mess: "Đăng nhập thất bại",
            });
            return;
        }

        Cookies.set(TOKEN_TYPE.APP_ID, clientId);
        navigation(ROUTER_APP.CONTACT.href);
    }

    return (
        <>
            <div className={classes.root}>
                <div className={classes.box}>
                    <p className={classes.title__login}>Đăng nhập</p>
                    <p className={classes.title__welcome}>Chào mừng bạn quay lại</p>
                    <p>
                        Bạn chưa có tài khoản?&nbsp;
                        <span 
                            className={classes.high__light} 
                            onClick={() => navigation(ROUTER_APP.REGISTER.href)}
                        >Đăng kí</span>
                    </p>

                    <Form.Label htmlFor="form_client_id">Client ID</Form.Label>
                    <Form.Control
                        type="text"
                        id="form_client_id"
                        value={clientId}
                        onChange={e => setClientId(e.target.value)}
                    />

                    <Form.Label htmlFor="form_password">Mật khẩu</Form.Label>
                    <Form.Control
                        type="password"
                        id="form_password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Button
                        className={classes.btn__login}
                        style={{
                            cursor: isLoading ? "not-allowed" : "pointer"
                        }}
                        onClick={handleLogin}
                    >
                        {isLoading ? <Spinner size="sm" style={{ fontSize: 12 }} animation="border" /> : "Đăng nhập"}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Login;