import React, { useContext } from "react";

import { ContactModel } from "@/models/contact";
import { ContactContext, TypeContactContext } from "../..";

import classes from "./styles.module.css";



const CardContact: React.FC<ContactModel> = (props) => {
    const { contactSelect, setContactSelect } = useContext<TypeContactContext>(ContactContext);

    return (
        <div
            className={`${classes.root} ${contactSelect?.ID === props.ID && classes.active}`}
            onClick={() => setContactSelect(props)}
        >
            <div className={classes.info}>
                <p className={classes.name}>{props.NAME}</p>
            </div>
        </div>
    )
}

export default CardContact;