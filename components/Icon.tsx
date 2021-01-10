import styles from "../styles/components/Arrow.module.scss";
import React from "react";

export const Icon = ({style, className, onClick}) => {
    return(
        <div onClick={onClick} className={[styles.icon,styles[style], className].join(' ')}/>
    );
}