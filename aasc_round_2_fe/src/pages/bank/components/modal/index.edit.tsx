import React, { useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import SelectInput from "@/components/Select";

import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { BankContext, TYPE_MODAL_BANK, TypeBankContext } from "../..";
import { TOKEN_TYPE } from "@/models/variable";
import { useAddBankMutation, useUpdateBankMutation } from "@/redux/api/bank";
import { useAppSelector } from "@/redux/hook";

import classes from "./styles.module.css";
import { ProtectedContext, TypeProtectedContext } from "@/layout/protected";



const formBankDefault: FormEditBank = {
    NAME: "",
    ENTITY_ID: "",
    RQ_BANK_NAME: "",
    RQ_ACC_NUM: "",
}

const ModalEditBank: React.FC = () => {
    const {
        modal,
        bankSelect,
        setModal,
        setBankSelect,
        refetchBank,
    } = useContext<TypeBankContext>(BankContext);
    const { setModalError } = useContext<TypeProtectedContext>(ProtectedContext);

    const { 
        requisites,
    } = useAppSelector(state => state.contactSlice)

    const [post, { isLoading: loadingAdd }] = useAddBankMutation();
    const [put, { isLoading: loadingUpdate }] = useUpdateBankMutation();

    const loading = useMemo(() => {
        return loadingAdd || loadingUpdate;
    }, [loadingAdd, loadingUpdate]);


    const [bank, setBank] = useState<FormEditBank>(formBankDefault);

    useEffect(() => {
        if (modal.type !== "bank_add") {
            setBank({
                NAME: bankSelect?.NAME || "",
                ENTITY_ID: bankSelect?.ENTITY_ID || "",
                RQ_BANK_NAME: bankSelect?.RQ_BANK_NAME || "",
                RQ_ACC_NUM: bankSelect?.RQ_ACC_NUM || "",
            });
        }
    }, [modal]);

    const handleChange = (field: keyof FormEditBank, value: string) => {
        setBank({ ...bank, [field]: value });
    };

    const handleAdd = async () => {
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
        if (!token) return;

        const result = await post({ bank, token });
        if("error" in result) {
            setModalError({
                show: true,
                mess: "Thêm ngân hàng thất bại"
            })
        }
    };

    const handleUpdate = async () => {
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
        if (!token || !bankSelect) return;

        const result = await put({ bank: { id: bankSelect.ID, fields: bank }, token });
        if("error" in result) {
            setModalError({
                show: true,
                mess: "Sửa ngân hàng thất bại"
            })
        }
    };

    const handle = async (event: React.FormEvent) => {
        event.preventDefault();
        switch (modal.type) {
            case "bank_add":
                await handleAdd();
                break;
            case "bank_edit":
                await handleUpdate();
                break;
            default:
                break;
        }

        setBank(formBankDefault);
        setModal({ ...modal, status: false });
        setBankSelect(null);

        refetchBank();
    }


    
    return (
        <>
            <Modal
                show={modal.status && modal.type !== "bank_delete"}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>{TextTitle[modal.type]}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form id="edit_bank" className={classes.form} onSubmit={handle}>
                        <Form.Group controlId="formRqName">
                            <Form.Label>Tên tài khoản</Form.Label>
                            <Form.Control
                                type="text"
                                value={bank.NAME}
                                readOnly={modal.type === "bank_detail" ? true : false}
                                onChange={(e) => handleChange("NAME", e.target.value)}
                            />
                        </Form.Group>

                        <SelectInput
                            data={requisites.map(c => ({
                                value: c.ID,
                                label: c.NAME
                            }))}
                            label="Chủ tài khoản"
                            readOnly={modal.type === "bank_add" ? false : true }
                            value={bank.ENTITY_ID}
                            onChange={(value) => handleChange("ENTITY_ID", value)}
                        />

                        <Form.Group controlId="formRqBankName">
                            <Form.Label>Tên ngân hàng</Form.Label>
                            <Form.Control
                                type="text"
                                value={bank.RQ_BANK_NAME}
                                readOnly={modal.type === "bank_detail" ? true : false}
                                onChange={(e) => handleChange("RQ_BANK_NAME", e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRqAccNum">
                            <Form.Label>Số tài khoản</Form.Label>
                            <Form.Control
                                type="text"
                                value={bank.RQ_ACC_NUM}
                                readOnly={modal.type === "bank_detail" ? true : false}
                                onChange={(e) => handleChange("RQ_ACC_NUM", e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="danger"
                        disabled={loading}
                        onClick={() => setModal({ ...modal, status: false })}
                    >Đóng</Button>
                    {modal.type !== "bank_detail" && <Button
                        type="submit"
                        form="edit_bank"
                        variant="primary"
                        disabled={loading}
                    >
                        {
                            loading ?
                                <Spinner size="sm" style={{ fontSize: 12 }} animation="border" /> :
                                "Xác nhận"
                        }
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

const TextTitle: Record<TYPE_MODAL_BANK, string> = {
    bank_add: "Thêm mới",
    bank_delete: "Xóa",
    bank_detail: "Chi tiết",
    bank_edit: "Chỉnh sửa"
}

type FormEditBank = {
    NAME: string
    ENTITY_ID: string
    RQ_BANK_NAME: string
    RQ_ACC_NUM: string
}

export default ModalEditBank;