import React, { useContext } from "react";

import { BankContext, TypeBankContext } from "../..";
import { BankModel } from "@/models/bank";

import classes from "./styles.module.css";
import { useAppSelector } from "@/redux/hook";



const CardBank: React.FC<BankModel> = (props) => {
    const { requisiteMap } = useAppSelector(state => state.contactSlice);
    const { bankSelect, setBankSelect } = useContext<TypeBankContext>(BankContext);

    return (
        <div
            className={`${classes.root} ${bankSelect?.ID === props.ID && classes.active}`}
            onClick={() => setBankSelect(props)}
        >
            <div className={classes.info}>
                <p className={classes.name}>{props.NAME}</p>
                <p>Chủ tài khoản: {requisiteMap[props.ENTITY_ID]?.NAME} - ID: {props.ID}</p>
            </div>
        </div>
    )
}

export default CardBank;