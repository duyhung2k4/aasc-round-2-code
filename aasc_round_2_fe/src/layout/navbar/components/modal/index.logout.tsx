import { ROUTER_APP } from "@/constants/router";
import { TOKEN_TYPE } from "@/models/variable";
import Cookies from "js-cookie";
import React from "react";

import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const ModalLogout: React.FC<TypeModalLogout> = (props) => {
    const navigation = useNavigate();

    const handleLogout = async () => {
        Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
        Cookies.remove(TOKEN_TYPE.APP_ID);

        navigation(ROUTER_APP.LOGIN.href);
    }

    return (
        <>
            <Modal
                show={props.status}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>Đăng xuất</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Bạn có chắc chắn muốn đăng xuất</p>                    
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={() => props.setStatus(false)}
                    >Đóng</Button>
                    <Button
                        variant="primary"
                        onClick={handleLogout}
                    >Xác nhận</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export type TypeModalLogout = {
    status: boolean
    setStatus: (value: boolean) => void
}

export default ModalLogout;