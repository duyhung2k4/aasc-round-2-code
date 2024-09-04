import React, { useContext } from "react";
import { ProtectedContext, TypeProtectedContext } from "@/layout/protected";
import { Button, Modal } from "react-bootstrap";



const ModalError: React.FC = () => {
    const { modalError, setModalError } = useContext<TypeProtectedContext>(ProtectedContext);

    const handleClose = () => setModalError({ ...modalError, show: false });

    console.log(modalError);

    return (
        <Modal show={modalError.show} onHide={handleClose}>
            <Modal.Header closeButton={false}>
                <Modal.Title>Lỗi</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalError.mess}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalError;