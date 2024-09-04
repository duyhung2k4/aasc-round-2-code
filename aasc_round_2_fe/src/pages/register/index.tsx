import React, { useContext, useState } from "react";
import Cookies from "js-cookie";

import { Button, Form, Spinner } from "react-bootstrap";
import { useRegisterMutation } from "@/redux/api/auth";
import { useNavigate } from "react-router-dom";
import { ROUTER_APP } from "@/constants/router";
import { TOKEN_TYPE } from "@/models/variable";

import classes from "./styles.module.css";
import { ProtectedContext, TypeProtectedContext } from "@/layout/protected";



const Register: React.FC = () => {
    const [clientId, setClientId] = useState<string>("");
    const [clientSecret, setClientSecret] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setModalError } = useContext<TypeProtectedContext>(ProtectedContext);

    const navigation = useNavigate();

    const [post, { isLoading }] = useRegisterMutation();

    const handleLogin = async () => {
        if (clientId.length === 0) return;
        const result = await post({
            client_id: clientId,
            client_secret: clientSecret,
            email: email,
            password: password,
        });

        if ("error" in result) {
            setModalError({
                show: true,
                mess: "Đăng kí thất bại",
            })
            return;
        }

        if(!result.data.data) {
            return;
        }

        Cookies.set(TOKEN_TYPE.APP_ID, clientId);
        Cookies.set(TOKEN_TYPE.ID_ACCEPT_CODE, `${result.data.data.id_accept_code}`);
        navigation(ROUTER_APP.ACCEPT_CODE.href);
    }

    return (
        <>
            <div className={classes.root}>
                <div className={classes.box}>
                    <p className={classes.title__login}>Đăng kí</p>
                    <p className={classes.title__welcome}>Chào mừng tới AASC Round 2</p>
                    <p>
                        Bạn đã có tài khoản?&nbsp;
                        <span 
                            className={classes.high__light} 
                            onClick={() => navigation(ROUTER_APP.LOGIN.href)}
                        >Đăng nhập</span>
                    </p>

                    <Form.Label htmlFor="form_client_id">Client ID</Form.Label>
                    <Form.Control
                        type="text"
                        id="form_client_id"
                        value={clientId}
                        onChange={e => setClientId(e.target.value)}
                    />

                    <Form.Label style={{ marginTop: 16 }} htmlFor="client_secret">Client secret</Form.Label>
                    <Form.Control
                        type="text"
                        id="client_secret"
                        value={clientSecret}
                        onChange={e => setClientSecret(e.target.value)}
                    />

                    <Form.Label style={{ marginTop: 16 }} htmlFor="email">Email</Form.Label>
                    <Form.Control
                        type="text"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <Form.Label style={{ marginTop: 16 }} htmlFor="form_password">Mật khẩu</Form.Label>
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
                        {isLoading ? <Spinner size="sm" style={{ fontSize: 12 }} animation="border" /> : "Đăng kí"}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Register;