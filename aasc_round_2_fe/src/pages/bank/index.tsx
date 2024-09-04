import React, { createContext, useEffect, useMemo, useRef, useState } from "react";
import ModalEditBank from "./components/modal/index.edit";
import ModalDeleteBank from "./components/modal/index.delete";
import Cookies from "js-cookie";
import CardBank from "./components/card";

import { TOKEN_TYPE } from "@/models/variable";
import { Button, Spinner } from "react-bootstrap";
import { BankModel } from "@/models/bank";
import { useListBankQuery } from "@/redux/api/bank";

import classes from "./styles.module.css";



const Bank: React.FC = () => {
    const optionRef = useRef<HTMLDivElement>(null);

    const [modal, setModal] = useState<StatusModalBank>({
        type: "bank_add",
        status: false,
    });

    const [bankSelect, setBankSelect] = useState<BankModel | null>(null);

    const {
        data,
        refetch,
        isLoading,
    } = useListBankQuery(Cookies.get(TOKEN_TYPE.ACCESS_TOKEN) || "");

    useEffect(() => {
        refetch();
    }, []);

    const openModal = (type: TYPE_MODAL_BANK) => {
        setModal({
            status: true,
            type,
        });
    }

    const banks = useMemo(() => {
        return data?.data || [];
    }, [data?.data]);

    

    return (
        <BankContext.Provider
            value={{
                modal,
                bankSelect,
                setModal,
                setBankSelect,
                refetchBank: refetch,
            }}
        >
            <div className={classes.root}>
                <div ref={optionRef}>
                    <div className={classes.list_btn}>
                        <Button
                            disabled={!bankSelect}
                            onClick={() => openModal("bank_detail")}
                            variant={bankSelect ? "primary" : "secondary"}
                            style={{
                                cursor: bankSelect ? "pointer" : "not-allowed"
                            }}
                        >Chi tiết</Button>
                        <Button
                            onClick={() => openModal("bank_add")}
                            variant={"success"}
                        >Thêm mới</Button>
                        <Button
                            disabled={!bankSelect}
                            onClick={() => openModal("bank_edit")}
                            variant={bankSelect ? "warning" : "secondary"}
                            style={{
                                cursor: bankSelect ? "pointer" : "not-allowed"
                            }}
                        >Chỉnh sửa</Button>
                        <Button
                            disabled={!bankSelect}
                            onClick={() => openModal("bank_delete")}
                            variant={bankSelect ? "danger" : "secondary"}
                            style={{
                                cursor: bankSelect ? "pointer" : "not-allowed"
                            }}
                        >Xóa</Button>
                    </div>
                </div>

                <div
                    style={{
                        height: `calc(100vh - ${optionRef.current?.offsetHeight}px - 8px)`,
                        marginTop: 8,
                        overflow: "scroll",
                    }}
                >
                    {
                        isLoading ?
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "100%"
                                }}
                            >
                                <Spinner />
                            </div>
                            :
                            banks.map(item => <CardBank key={item.ID} {...item} />)
                    }
                </div>
            </div>


            <ModalEditBank />
            <ModalDeleteBank/>
        </BankContext.Provider>
    )
}

export type StatusModalBank = {
    type: TYPE_MODAL_BANK
    status: boolean
}

export type TYPE_MODAL_BANK =
    | "bank_detail"
    | "bank_add"
    | "bank_edit"
    | "bank_delete"

export type TypeBankContext = {
    modal: StatusModalBank
    bankSelect: BankModel | null
    setModal: (value: StatusModalBank) => void
    setBankSelect: (value: BankModel | null) => void
    refetchBank: () => void
}
export const BankContext = createContext<TypeBankContext>({
    modal: { type: "bank_add", status: false },
    bankSelect: null,
    setModal: (_) => { },
    setBankSelect: (_) => { },
    refetchBank: () => {},
});

export default Bank;