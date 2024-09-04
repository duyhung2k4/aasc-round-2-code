import React, { useState, useRef, useEffect } from "react";

import { Form } from "react-bootstrap";

import classes from "./styles.module.css";



const SelectInput: React.FC<SelectProps> = (props) => {
    let mapData: Record<string, { label: string, value: string }> = {};
    props.data.forEach((item) => {
        mapData[item.value] = item;
    });
    
    const [value, setValue] = useState<{ label: string, value: string } | null>(null);
    const [focus, setFocus] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
            setFocus(false);
        }
    };
    
    useEffect(() => {
        if(!props.value) return;
        setValue(mapData[props.value]);
    }, [props.value]);



    return (
        <div
            style={{ position: "relative" }}
            onFocus={!props.readOnly ? () => setFocus(true) : undefined}
            onBlur={handleBlur}
            ref={containerRef}
            tabIndex={-1}
        >
            <Form.Group>
                <Form.Label>{props.label}</Form.Label>
                <Form.Control
                    placeholder={props.placeholder}
                    type="text"
                    value={value?.label}
                    readOnly={props.readOnly}
                />
                <div
                    className={classes.box_select}
                    style={{
                        display: focus ? "block" : "none"
                    }}
                    tabIndex={0}
                >
                    {props.data.map((item, i) => (
                        <div
                            key={i}
                            className={classes.item_select}
                            onClick={() => {
                                setValue(item);
                                setFocus(false);
                                if (props.onChange) props.onChange(item.value);
                            }}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </Form.Group>
        </div>
    );
}

export type SelectProps = {
    data: { value: string, label: string }[];
    value?: string;
    label?: string;
    readOnly?: boolean;
    placeholder?: string;
    onChange?: (value: string) => void;
};

export default SelectInput;
