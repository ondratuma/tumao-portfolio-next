import styles from "../styles/components/Block.module.scss";
import React, {EventHandler} from "react";

export const Block = ({children, className = '', header = undefined, id, onmousemove = () => {}}) => {
    return(
        <div className={[styles.block, className].join(' ')} id={id} onMouseMove={onmousemove} >
            {header ? <h1>{header}</h1> : ''}
            <div  className={[styles.inner].join(' ')} >
                  {children}
            </div>
        </div>

    );
}