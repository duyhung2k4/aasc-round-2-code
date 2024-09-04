import React, { useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";

import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { ContactContext, TYPE_MODAL_CONTACT, TypeContactContext } from "../..";
import { useAddContactMutation, useUpdateContactMutation } from "@/redux/api/contact";
import { AddContactRequest } from "@/dto/request/contact";
import { TOKEN_TYPE } from "@/models/variable";

import classes from "./styles.module.css";
import { AppLayoutContext, TypeAppLayoutContext } from "@/layout/app";
import { ProtectedContext, TypeProtectedContext } from "@/layout/protected";

const formContactDefault: FormEditContact = {
    NAME: "",
    LAST_NAME: "",
    ADDRESS_REGION: "",
    ADDRESS_PROVINCE: "",
    ADDRESS_CITY: "",
    PHONE: "",
    EMAIL: "",
    WEB: "",
}

const ModalEditContact: React.FC = () => {

    const {
        modal,
        contactSelect,
        setModal,
        setContactSelect,
    } = useContext<TypeContactContext>(ContactContext);

    const { refetchContact, refetchRequisite } = useContext<TypeAppLayoutContext>(AppLayoutContext);
    const { setModalError } = useContext<TypeProtectedContext>(ProtectedContext);

    const [post, { isLoading: loadingAdd }] = useAddContactMutation();
    const [put, { isLoading: loadingUpdate }] = useUpdateContactMutation();

    const loading = useMemo(() => {
        return loadingAdd || loadingUpdate;
    }, [loadingAdd, loadingUpdate]);


    const [contact, setContact] = useState<FormEditContact>(formContactDefault);

    useEffect(() => {
        if (modal.type !== "contact_add") {
            setContact({
                NAME: contactSelect?.NAME || "",
                LAST_NAME: contactSelect?.LAST_NAME || "",
                ADDRESS_REGION: contactSelect?.ADDRESS_REGION || "",
                ADDRESS_PROVINCE: contactSelect?.ADDRESS_PROVINCE || "",
                ADDRESS_CITY: contactSelect?.ADDRESS_CITY || "",
                PHONE: contactSelect?.PHONE?.[0].VALUE || "",
                EMAIL: contactSelect?.EMAIL?.[0].VALUE || "",
                WEB: contactSelect?.WEB?.[0].VALUE || "",
            })
        }
    }, [modal]);

    const handleChange = (field: keyof FormEditContact, value: string) => {
        setContact({ ...contact, [field]: value });
    };

    const handleAdd = async () => {
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
        if (!token) return;

        const data: AddContactRequest = {
            NAME: contact.NAME,
            LAST_NAME: contact.LAST_NAME,
            ADDRESS_REGION: contact.ADDRESS_REGION,
            ADDRESS_PROVINCE: contact.ADDRESS_PROVINCE,
            ADDRESS_CITY: contact.ADDRESS_CITY,
            PHONE: [{ VALUE: contact.PHONE, VALUE_TYPE: "WORK" }],
            EMAIL: [{ VALUE: contact.EMAIL, VALUE_TYPE: "WORK" }],
            WEB: [{ VALUE: contact.WEB, VALUE_TYPE: "WORK" }],
        }

        const result = await post({ contact: data, token });
        if("error" in result) {
            setModalError({
                show: true,
                mess: "Thêm liên hệ thất bại",
            })
        }
    };

    const handleUpdate = async () => {
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
        if (!token || !contactSelect) return;

        const data: AddContactRequest = {
            NAME: contact.NAME,
            LAST_NAME: contact.LAST_NAME,
            ADDRESS_REGION: contact.ADDRESS_REGION,
            ADDRESS_PROVINCE: contact.ADDRESS_PROVINCE,
            ADDRESS_CITY: contact.ADDRESS_CITY,
            PHONE: [{ VALUE: contact.PHONE, ID: contactSelect?.PHONE?.[0]?.ID, VALUE_TYPE: "WORK" }],
            EMAIL: [{ VALUE: contact.EMAIL, ID: contactSelect?.EMAIL?.[0]?.ID, VALUE_TYPE: "WORK" }],
            WEB: [{ VALUE: contact.WEB, ID: contactSelect?.WEB?.[0]?.ID, VALUE_TYPE: "WORK" }],
        }

        const result = await put({ contact: { id: contactSelect.ID, fields: data }, token });
        if("error" in result) {
            setModalError({
                show: true,
                mess: "Sửa liên hệ thất bại",
            })
        }
    };

    const handle = async (event: React.FormEvent) => {
        event.preventDefault();
        switch (modal.type) {
            case "contact_add":
                await handleAdd();
                break;
            case "contact_edit":
                await handleUpdate();
                break;
            default:
                break;
        }

        setContact(formContactDefault);
        setModal({ ...modal, status: false });
        setContactSelect(null);

        refetchContact();
        refetchRequisite();
    }

    return (
        <>
            <Modal
                show={modal.status && modal.type !== "contact_delete"}
            // onHide={loading ? () => { } : () => setModal({ ...modal, status: false })}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>{TextTitle[modal.type]}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form id="edit_contact" className={classes.form} onSubmit={handle}>
                        <Form.Group controlId="formName">
                            <Form.Label>Tên</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.NAME}
                                readOnly={modal.type === "contact_detail" ? true : false}
                                onChange={(e) => handleChange('NAME', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRegion">
                            <Form.Label>Xã, phường</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.ADDRESS_REGION}
                                readOnly={modal.type === "contact_detail" ? true : false}
                                onChange={(e) => handleChange('ADDRESS_REGION', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formProvince">
                            <Form.Label>Quận, huyện</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.ADDRESS_PROVINCE}
                                readOnly={modal.type === "contact_detail" ? true : false}
                                onChange={(e) => handleChange('ADDRESS_PROVINCE', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCity">
                            <Form.Label>Tỉnh, thành phố</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.ADDRESS_CITY}
                                readOnly={modal.type === "contact_detail" ? true : false}
                                onChange={(e) => handleChange('ADDRESS_CITY', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label>Điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.PHONE}
                                readOnly={modal.type === "contact_detail" ? true : false}
                                onChange={(e) => handleChange('PHONE', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.EMAIL}
                                readOnly={modal.type === "contact_detail" ? true : false}
                                onChange={(e) => handleChange('EMAIL', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formWeb">
                            <Form.Label>Web</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.WEB}
                                readOnly={modal.type === "contact_detail" ? true : false}
                                onChange={(e) => handleChange('WEB', e.target.value)}
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
                    {modal.type !== "contact_detail" && <Button
                        type="submit"
                        form="edit_contact"
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

const TextTitle: Record<TYPE_MODAL_CONTACT, string> = {
    "contact_add": "Thêm mới",
    "contact_delete": "Xóa",
    "contact_detail": "Chi tiết",
    "contact_edit": "Chỉnh sửa"
}

type FormEditContact = {
    "NAME": string
    "LAST_NAME": string
    "ADDRESS_REGION": string
    "ADDRESS_PROVINCE": string
    "ADDRESS_CITY": string
    "PHONE": string
    "EMAIL": string
    "WEB": string
}

export default ModalEditContact;