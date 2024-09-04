import React, { useContext } from "react";
import Cookies from "js-cookie";

import { BankContext, TypeBankContext } from "../..";
import { Button, Modal, Spinner } from "react-bootstrap";
import { TOKEN_TYPE } from "@/models/variable";
import { useDeleteBankMutation } from "@/redux/api/bank";
import { ProtectedContext, TypeProtectedContext } from "@/layout/protected";


const ModalDeleteBank: React.FC = () => {

    const {
        modal,
        bankSelect,
        setModal,
        refetchBank,
        setBankSelect,
    } = useContext<TypeBankContext>(BankContext);
    const { setModalError } = useContext<TypeProtectedContext>(ProtectedContext);

    const [ post, { isLoading } ] = useDeleteBankMutation();

    const handleDelete = async () => {
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
        if(!bankSelect || !token) return;

        const result = await post({
            bank: { 
                id: bankSelect.ID,
            },
            token
        });
        if("error" in result) {
            setModalError({
                show: true,
                mess: "Xóa ngân hàng thất bại"
            })
        }

        refetchBank();
        setModal({
            ...modal,
            status: false,
        });
        setBankSelect(null);
    }

    return (
        <>
            <Modal
                show={modal.status && modal.type === "bank_delete"}
                // onHide={isLoading ? () => { } : () => setModal({ ...modal, status: false })}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>Xóa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Bạn có chắc chắn muốn xóa tài khoản ngân hàng này</p>                    
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="danger"
                        disabled={isLoading}
                        onClick={() => setModal({ ...modal, status: false })}
                    >Đóng</Button>
                    {modal.type !== "bank_detail" && 
                    <Button
                        variant="primary"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {
                            isLoading ?
                                <Spinner size="sm" style={{ fontSize: 12 }} animation="border" /> :
                                "Xác nhận"
                        }
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteBank;